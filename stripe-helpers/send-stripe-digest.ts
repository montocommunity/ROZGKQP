import { classifyAndGroupEvents } from "./classify-and-group-events";
import { fetchStripeEvents } from "./fetch-stripe-events";
import { formatEmail } from "./format-email";

export async function sendStripeDigest() {
  const events = await fetchStripeEvents();
  const groupedEvents = classifyAndGroupEvents(events);
  const emailContent = formatEmail(groupedEvents);
  // await sendEmail(emailContent);
}
