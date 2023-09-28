import type { NextApiRequest, NextApiResponse } from "next";
import { sendStripeDigest } from "@/stripe-helpers/send-stripe-digest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  await sendStripeDigest();
  res.status(200).json({ message: "Stripe Digest Sent Successfully!" });
}
