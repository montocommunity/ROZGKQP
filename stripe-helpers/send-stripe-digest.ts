import { classifyAndGroupEvents } from "./classify-and-group-events";
import { fetchStripeEvents } from "./fetch-stripe-events";
import { formatEmail } from "./format-email";

export async function sendStripeDigest() {
  const { events, from, to } = await fetchStripeEvents({ days: 1 });
  const classifiedEvents = classifyAndGroupEvents(events);
  const digest = formatEmail({ classifiedEvents, from, to });
  console.log(digest);
}
