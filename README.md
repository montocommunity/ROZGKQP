the classification.ts is already final and doesn't need to be adjusted, the other files will probably need to be adjusted to make everything work. you can do a new nextjs installation for it and use pages/api for the endpoint:

```
npx create-next-app stripe-digest --typescript
npm install stripe@12.1.1
```
