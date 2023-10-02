## Getting Started

- Put the stripe-helpers into your utils folder.
- Add the sendStripeDigest() function into a serverless function.
- Put the stripe-digest-workflow.yml into your GitHub workflows folder, and replace the url inside of the file with the url of your serverless function.
- Replace the console.log(digest); in  send-stripe-digest.ts with your email sending logic (postmark).

## Other note
- We use the file stripe-helpers/stripe.ts for initializing stripe. you likely already have this as part of your codebase -> you should be able to use your logic instead of having this file.

