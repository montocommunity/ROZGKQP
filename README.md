## Getting Started

- Put the src/stripe-helpers into your utils folder.
- Add the sendStripeDigest() function into a serverless function.
- Put the stripe-digest-workflow.yml into your GitHub workflows folder, and replace the url inside of the file with the url of your serverless function.
- Replace the console.log(digest); in  src/stripe-helpers/send-stripe-digest.ts with your email sending logic (postmark).

## Other note
- We use the file src/stripe-helpers/stripe.ts for initializing stripe. you likely already have this as part of your codebase -> you should be able to use your logic instead of having this file.


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
