import { NeonQueryFunction } from "@neondatabase/serverless";
import { pricingPlanMap } from "./constants";

export async function hasCancelledSubscription(
  sql: NeonQueryFunction<false, false>,
  email: string,
) {
  const query = await sql`SELECT * FROM users where email = 
  ${email} AND status = 'cancelled'`;

  return query && query.length > 0;
}

export function getPlanType(priceId: string | null) {
  const plan = pricingPlanMap.find((plan) => plan.priceId === priceId);
  return plan?.id ?? "free";
}

export async function updateUser(
  sql: NeonQueryFunction<false, false>,
  userId: string,
  email: string,
) {
  return await sql`
    INSERT INTO users (email, user_id, status)
    VALUES (${email}, ${userId}, 'free')
    ON CONFLICT (email)
    DO UPDATE SET user_id = EXCLUDED.user_id
  `;
}

export async function doesUserExist(
  sql: NeonQueryFunction<false, false>,
  email: string,
) {
  const query = await sql`SELECT * FROM users where email = ${email}`;
  if (query && query.length > 0) {
    return query;
  }
  return null;
}
