import type Stripe from "stripe";
import { stripe } from "./stripe";

export async function fetchStripeEvents({ days }: { days: number }) {
  const events: Stripe.Event[] = [];

  const startDay = new Date();
  startDay.setDate(startDay.getDate() - days);
  startDay.setHours(0, 0, 0, 0);

  const endDay = new Date();
  endDay.setDate(endDay.getDate() - 1);
  endDay.setHours(23, 59, 59, 999);

  const basicParams = {
    delivery_success: true,
    created: {
      gte: Math.floor(startDay.getTime() / 1000),
      lte: Math.floor(endDay.getTime() / 1000),
    },
  };

  let response;
  
  do {
    const lastEvent = events[events.length - 1];
    const extendedParams = lastEvent && events.length
      ? { ...basicParams, starting_after: lastEvent.id }
      : basicParams;
    
    
    response = await stripe.events.list(extendedParams);
    events.push(...response.data);
  } while (response.has_more);

  return { events, from: startDay, to: endDay };
}
