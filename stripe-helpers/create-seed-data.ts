import { stripe } from "./stripe";

export async function createSeedData() {
  // Create a customer
  const customer = await stripe.customers.create({
    email: "test3@example.com",
    description: "Test customer for seed data",
  });

  // Create products and plans
  const monthlyProduct = await stripe.products.create({
    name: "Monthly Subscription",
  });
  const monthlyPlan = await stripe.plans.create({
    currency: "usd",
    interval: "month",
    product: monthlyProduct.id,
    amount: 999, // $9.99
  });

  const yearlyProduct = await stripe.products.create({
    name: "Yearly Subscription",
  });
  const yearlyPlan = await stripe.plans.create({
    currency: "usd",
    interval: "year",
    product: yearlyProduct.id,
    amount: 10999, // $109.99
  });

  // Create a subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: monthlyPlan.id }],
    trial_end: "now",
  });

  // Simulate different events
  // Upgrade from monthly to yearly
  // await stripe.subscriptions.update(subscription.id, {
  //   items: [{ plan: yearlyPlan.id }],
  // });

  // // Downgrade from yearly to monthly
  // await stripe.subscriptions.update(subscription.id, {
  //   items: [{ plan: monthlyPlan.id }],
  // });

  // Simulate other events as needed...
  // For example, setting `cancel_at_period_end` to true or false to simulate voluntary churn events, etc.

  console.log("Seed data created successfully.");
}
