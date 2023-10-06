import { classifyAndGroupEvents } from "src/stripe-helpers/classify-and-group-events";
import { fetchStripeEvents } from "src/stripe-helpers/fetch-stripe-events"
import { formatEmail } from "src/stripe-helpers/format-email";


export const POST = async () => {
    const { events, from, to } = await fetchStripeEvents({ days: 1 });
    const classifiedEvents = classifyAndGroupEvents(events);
    const digest = formatEmail({classifiedEvents, from, to});
    console.log(digest);
}