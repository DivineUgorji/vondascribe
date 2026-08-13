export const pricingPlanMap = [
  {
    id: "starter",
    name: "Starter",
    price: 15,
    tag: "Free",
    description: "Perfect for trying it out.",
    features: [
      "60 minutes / month",
      "Transcript export",
      "3 blog post generations",
    ],
    cta: "Get started — $15/mo",
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_STARTER_PAYMENT_LINK || "",
    priceId: process.env.STRIPE_STARTER_PRICE_ID || "",
  },

  {
    id: "pro",
    name: "Pro",
    price: 25,
    tag: "Most popular",
    description: "For creators and professionals.",
    features: [
      "20 hours / month",
      "Unlimited blog posts",
      "Speaker detection",
      "Smart summaries",
      "Priority processing",
    ],
    cta: "Start Pro — $25/mo",
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_PRO_PAYMENT_LINK || "",
    priceId: process.env.STRIPE_PRO_PRICE_ID || "",
  },

  {
    id: "team",
    name: "Team",
    price: 75,
    tag: "Enterprise",
    description: "For teams and agencies.",
    features: [
      "Unlimited hours",
      "Up to 10 team members",
      "Custom vocabulary",
      "API access",
      "Dedicated support",
    ],
    cta: "Contact sales",
    paymentLink: "/",
  },
];
