export function formatEmail(classifiedEvents) {
  // console.log(
  //   `Here is your Stripe Digest for the period of ${startDate.toISOString()} to ${endDate.toISOString()}:`
  // );

  const categories = Object.keys(classifiedEvents);

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const events = classifiedEvents[category];

    console.log(`## ${events.length} ${category}:`);

    for (const event of events) {
      console.log({ custoer: event.data.object });
      const email = event.data.object.customer; // Assuming customer email is available in the event data
      const subscription = event.data.object.id;
      const metadata = event.data.object.metadata;
      const currency = event.data.object.plan.currency;
      const amount = event.data.object.plan.amount / 100; // Convert amount to dollars or appropriate currency
      const stripeUrl = `https://dashboard.stripe.com/subscriptions/${subscription}`;

      let logString = `[${email}] - `;

      switch (category) {
        case "signups":
          logString += `[substatus] - [${JSON.stringify(
            metadata
          )}] - [${currency} ${amount.toFixed(2)}] - (sub)[${stripeUrl}]`;
          break;
        case "trialConversions":
          logString += `[substatus] - [${JSON.stringify(
            metadata
          )}] - (sub)[${stripeUrl}]`;
          break;
        case "checkoutFailures":
          logString += `[${
            event.data.object.failure_reason ||
            event.data.object.payment_intent.last_payment_error.code
          }] - (sub)[${stripeUrl}]`;
          break;
        case "scheduledToCancel":
          logString += `[${event.data.object.cancellation_details.reason}] - [${event.data.object.cancellation_details.feedback}] - (sub)[${stripeUrl}]`;
          break;
        case "unscheduledToCancel":
          logString += `(sub)[${stripeUrl}]`;
          break;
        case "activeToPastDues":
        case "pastDueToActive":
        case "involuntaryChurn":
        case "voluntaryChurn":
        case "subscriptionUpgrades":
          logString += `(sub)[${stripeUrl}]`;
          break;
      }

      console.log(logString);
    }
  }
}
