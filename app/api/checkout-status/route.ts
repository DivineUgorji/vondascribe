import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import getDbConnection from "@/lib/database";
import { getUserSubscription } from "@/lib/payment-helpers";

export async function GET() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return NextResponse.json({ status: null }, { status: 401 });
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const sql = await getDbConnection();
  const subscription = await getUserSubscription(sql, email);

  return NextResponse.json({ status: subscription?.status ?? null });
}
