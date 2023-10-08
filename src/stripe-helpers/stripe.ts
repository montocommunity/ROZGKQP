import Stripe from "stripe";

export const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY', {
  typescript: true,
  apiVersion: "2022-11-15",
});
