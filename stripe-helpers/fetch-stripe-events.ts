import dayjs from "dayjs";
import { stripe } from "./stripe";
import Stripe from "stripe";

export async function fetchStripeEvents() {
  const events: Stripe.Event[] = [];
  let has_more = true;

  while (has_more) {
    const response = await stripe.events.list({
      delivery_success: true,
      created: {
        gte: parseInt(
          (
            dayjs().subtract(1, "D").startOf("day").toDate().getTime() / 1000
          ).toString()
        ),
        lte: parseInt(
          (
            dayjs().subtract(1, "D").endOf("day").toDate().getTime() / 1000
          ).toString()
        ),
      },
      starting_after:
        events.length !== 0 ? events[events.length - 1].id : undefined,
    });
    events.push(...response.data);
    has_more = response.has_more;
  }

  return events;
}
