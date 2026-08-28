"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import getDbConnection from "@/lib/database";

export async function createCheckoutSession(priceId: string) {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  if (!user || !email) {
    redirect("/sign-up");
  }

  if (!priceId) {
    throw new Error("Missing priceId");
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!baseUrl || !baseUrl.startsWith("http")) {
    throw new Error(
      "NEXT_PUBLIC_APP_URL is missing or invalid. It must start with http:// or https://",
    );
  }

  const sql = await getDbConnection();
  const [existing] =
    await sql`SELECT customer_id FROM users WHERE email = ${email}`;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    client_reference_id: user.id,
    metadata: {
      clerkUserId: user.id,
    },
    ...(existing?.customer_id
      ? { customer: existing.customer_id }
      : { customer_email: email }),
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#pricing`,
    locale: "auto",
    custom_text: {
      submit: { message: "You'll be redirected to your dashboard instantly." },
    },
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  redirect(session.url);
}
