import Stripe from "stripe";
import { stripe } from "./stripe";

export async function fetchStripeEvents() {
  const events: Stripe.Event[] = [];

  const startOfPreviousDay = new Date();
  startOfPreviousDay.setDate(startOfPreviousDay.getDate() - 1);
  startOfPreviousDay.setHours(0, 0, 0, 0);

  const endOfPreviousDay = new Date(startOfPreviousDay);
  endOfPreviousDay.setHours(23, 59, 59, 999);

  const params = {
    delivery_success: true,
    created: {
      gte: Math.floor(startOfPreviousDay.getTime() / 1000),
      lte: Math.floor(endOfPreviousDay.getTime() / 1000),
    },
  };

  let response;
  do {
    response = await stripe.events.list({
      ...params,
      starting_after: events.length ? events[events.length - 1].id : undefined,
    });
    events.push(...response.data);
  } while (response.has_more);

  return events;
}
