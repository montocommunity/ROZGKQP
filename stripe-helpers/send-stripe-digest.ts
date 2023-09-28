import { classifyAndGroupEvents } from "./classify-and-group-events";
import { fetchStripeEvents } from "./fetchStripeEvents";

export async function sendStripeDigest() {
  const events = await fetchStripeEvents();
  const groupedEvents = classifyAndGroupEvents(events); // use the provided gist for classification
  console.log(groupedEvents);
  // const emailContent = formatEmail(groupedEvents);
  // await sendEmail(emailContent);
}
