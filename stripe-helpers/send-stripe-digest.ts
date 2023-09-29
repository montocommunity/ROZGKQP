import { classifyAndGroupEvents } from "./classify-and-group-events";
import { fetchStripeEvents } from "./fetch-stripe-events";

export async function sendStripeDigest() {
  const events = await fetchStripeEvents();
  const groupedEvents = classifyAndGroupEvents(events);
  console.log(groupedEvents);
  // const emailContent = formatEmail(groupedEvents);
  // await sendEmail(emailContent);
}
