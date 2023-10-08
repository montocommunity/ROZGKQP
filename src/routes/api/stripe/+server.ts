import { classifyAndGroupEvents } from "../../../stripe-helpers/classify-and-group-events";
import { fetchStripeEvents } from "../../../stripe-helpers/fetch-stripe-events"
import { formatEmail } from "../../../stripe-helpers/format-email";


export const POST = async () => {
    const { events, from, to } = await fetchStripeEvents({ days: 1 });
    const classifiedEvents = classifyAndGroupEvents(events);
    const digest = formatEmail({classifiedEvents, from, to});
    console.log(digest);
    return new Response(digest)
}