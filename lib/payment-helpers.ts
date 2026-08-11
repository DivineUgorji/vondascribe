import Stripe from "stripe";
import getDbConnection, { type Sql } from "./database";

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const sql = await getDbConnection();
    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;
  } catch (error) {
    console.error("Error handling subscription deletion", error);
    throw error;
  }
}

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  const priceId = session.line_items?.data[0]?.price?.id;
  const email = session.customer_details?.email;
  const name = session.customer_details?.name ?? null;

  if (!priceId || !email) {
    console.error("Missing priceId or email on completed session", {
      sessionId: session.id,
      priceId,
      email,
    });
    return;
  }

  const sql = await getDbConnection();

  // The session may not have a Customer attached (e.g. guest checkout via
  // a Payment Link without customer_creation set). Create one if missing so
  // customer_id is always populated in the users table.
  let customerId = session.customer as string | null;
  if (!customerId) {
    const created = await stripe.customers.create({
      email,
      name: name ?? undefined,
    });
    customerId = created.id;
  }

  await createOrUpdateUser(sql, { email, name }, customerId);
  //update user subscription
  await updateUserSubscription(sql, priceId, email);
  //insert the payment
  await insertPayment(sql, session, priceId, email);
}

async function insertPayment(
  sql: Sql,
  session: Stripe.Checkout.Session,
  priceId: string,
  customerEmail: string,
) {
  try {
    await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${session.amount_total}, ${session.status}, ${session.id}, ${priceId}, ${customerEmail})`;
  } catch (err) {
    console.error("Error in inserting payment", err);
    throw err;
  }
}

async function createOrUpdateUser(
  sql: Sql,
  customer: { email: string; name: string | null },
  customerId: string,
) {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${customer.email}`;
    if (user.length === 0) {
      await sql`INSERT INTO users (email, full_name, customer_id) VALUES (${customer.email}, ${customer.name}, ${customerId})`;
    }
  } catch (err) {
    console.error("Error in inserting user", err);
    throw err;
  }
}

async function updateUserSubscription(
  sql: Sql,
  priceId: string,
  email: string,
) {
  try {
    await sql`UPDATE users SET price_id = ${priceId}, status = 'active' where email = ${email}`;
  } catch (err) {
    console.error("Error in updating user", err);
    throw err;
  }
}
