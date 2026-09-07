export const FREE_UPLOAD_LIMIT = 2;

export const pricingPlanMap = [
  {
    id: "free",
    name: "Free",
    price: 0,
    tag: "Free",
    description: "Try it out, no card required.",
    features: [
      `${FREE_UPLOAD_LIMIT} uploads to try it out`,
      "60 minutes / month",
      "Transcript export",
      "2 blog post generations",
    ],
    cta: "Start for free",
    priceId: "",
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
    // cta: "Start Pro — $25/mo",
    cta: "Get started",
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
    // cta: "Start Team — $75/mo",
    cta: "Get started",
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || "",
  },
];
