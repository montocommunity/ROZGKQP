async function sendStripeDigest() {
  const events = await fetchStripeEvents();
  const groupedEvents = classifyAndGroupEvents(events); // use the provided gist for classification
  const emailContent = formatEmail(groupedEvents);
  await sendEmail(emailContent);
}
