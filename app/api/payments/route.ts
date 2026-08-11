import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import { handleCheckoutSessionCompleted } from "@/lib/payment-helpers";
import { handleSubscriptionDeleted } from "@/lib/payment-helpers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const payload = await request.text();

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 },
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    console.log("✅ verified event:", event.type);

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("Payment successful:", paymentIntent);
        break;

      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("Payment method attached");
        break;

      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,

          {
            expand: ["line_items"],
          },
        );
        console.log({ session });

        console.log("line_items:", session.line_items?.data);
        console.log("priceId:", session.line_items?.data[0]?.price?.id);
        // Connect to the database
        await handleCheckoutSessionCompleted({ session, stripe });

        break;
      }

      case "customer.subscription.deleted": {
        const subscriptionId = event.data.object.id;
        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);
        await handleSubscriptionDeleted({ subscriptionId, stripe });
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error("❌ Webhook handler error:", err);
    return NextResponse.json(
      { status: "Failed", error: (err as Error).message },
      { status: 400 },
    );
  }

  return NextResponse.json({ status: "success" });
}
