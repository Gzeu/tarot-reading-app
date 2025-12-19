/**
 * Stripe Product and Price Configuration
 * 
 * This file defines all products and pricing for the Tarot Reading App.
 * Products are created in the Stripe Dashboard and referenced here by their IDs.
 * 
 * Environment Variables Required:
 * - STRIPE_SECRET_KEY: Stripe secret API key
 * - STRIPE_PUBLISHABLE_KEY: Stripe publishable key (frontend)
 * - STRIPE_WEBHOOK_SECRET: Webhook signing secret
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  priceId: string;
  amount: number; // in cents
  currency: string;
  type: "one_time" | "recurring";
  interval?: "month" | "year";
  features: string[];
}

/**
 * One-time purchase products
 * These are individual reading purchases
 */
export const ONE_TIME_PRODUCTS: Product[] = [
  {
    id: "prod_premium_reading",
    name: "Premium Reading",
    description: "Get a detailed AI-powered tarot reading with extended interpretation",
    priceId: "price_premium_reading",
    amount: 999, // $9.99
    currency: "usd",
    type: "one_time",
    features: [
      "Extended AI interpretation",
      "Save to favorites",
      "Add journal entries",
      "Email reading summary",
    ],
  },
  {
    id: "prod_celtic_cross",
    name: "Celtic Cross Reading",
    description: "Comprehensive 10-card Celtic Cross spread with detailed analysis",
    priceId: "price_celtic_cross",
    amount: 1999, // $19.99
    currency: "usd",
    type: "one_time",
    features: [
      "10-card comprehensive spread",
      "Detailed position analysis",
      "AI interpretation",
      "PDF export",
      "Lifetime access",
    ],
  },
  {
    id: "prod_love_reading",
    name: "Love Reading",
    description: "5-card relationship and love guidance spread",
    priceId: "price_love_reading",
    amount: 1499, // $14.99
    currency: "usd",
    type: "one_time",
    features: [
      "5-card love spread",
      "Relationship insights",
      "AI interpretation",
      "Save to favorites",
      "Journal entry",
    ],
  },
  {
    id: "prod_career_reading",
    name: "Career Reading",
    description: "4-card professional guidance and career path spread",
    priceId: "price_career_reading",
    amount: 1499, // $14.99
    currency: "usd",
    type: "one_time",
    features: [
      "4-card career spread",
      "Professional guidance",
      "AI interpretation",
      "Save to favorites",
      "Journal entry",
    ],
  },
];

/**
 * Subscription products
 * These are recurring subscription plans
 */
export const SUBSCRIPTION_PRODUCTS: Product[] = [
  {
    id: "prod_starter_plan",
    name: "Starter Plan",
    description: "Perfect for casual tarot enthusiasts",
    priceId: "price_starter_monthly",
    amount: 999, // $9.99/month
    currency: "usd",
    type: "recurring",
    interval: "month",
    features: [
      "3 readings per month",
      "AI interpretations",
      "Save favorites",
      "Journal entries",
      "Email support",
    ],
  },
  {
    id: "prod_pro_plan",
    name: "Pro Plan",
    description: "For serious tarot practitioners",
    priceId: "price_pro_monthly",
    amount: 1999, // $19.99/month
    currency: "usd",
    type: "recurring",
    interval: "month",
    features: [
      "Unlimited readings",
      "All spread types",
      "Advanced AI interpretations",
      "PDF exports",
      "Reading analytics",
      "Priority support",
    ],
  },
  {
    id: "prod_premium_plan",
    name: "Premium Plan",
    description: "Complete tarot mastery experience",
    priceId: "price_premium_monthly",
    amount: 2999, // $29.99/month
    currency: "usd",
    type: "recurring",
    interval: "month",
    features: [
      "Unlimited readings",
      "All spread types",
      "Advanced AI interpretations",
      "PDF exports",
      "Reading analytics",
      "Custom spreads",
      "Community access",
      "Live consultations (1/month)",
      "Priority support",
    ],
  },
  {
    id: "prod_yearly_plan",
    name: "Premium Yearly",
    description: "Best value - save 20% with annual billing",
    priceId: "price_premium_yearly",
    amount: 28788, // $287.88/year (20% discount)
    currency: "usd",
    type: "recurring",
    interval: "year",
    features: [
      "Unlimited readings",
      "All spread types",
      "Advanced AI interpretations",
      "PDF exports",
      "Reading analytics",
      "Custom spreads",
      "Community access",
      "Live consultations (12/year)",
      "Priority support",
      "20% savings vs monthly",
    ],
  },
];

/**
 * All products combined
 */
export const ALL_PRODUCTS = [...ONE_TIME_PRODUCTS, ...SUBSCRIPTION_PRODUCTS];

/**
 * Get product by ID
 */
export function getProductById(productId: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === productId);
}

/**
 * Get product by price ID
 */
export function getProductByPriceId(priceId: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.priceId === priceId);
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency: string = "usd"): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  });
  return formatter.format(amount / 100);
}

/**
 * Get subscription products only
 */
export function getSubscriptionProducts(): Product[] {
  return SUBSCRIPTION_PRODUCTS;
}

/**
 * Get one-time products only
 */
export function getOneTimeProducts(): Product[] {
  return ONE_TIME_PRODUCTS;
}
