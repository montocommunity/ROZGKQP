import type { Stripe } from "stripe";

export type Replace<T, K extends object> = Omit<T, keyof K> & K;

/** https://stripe.com/docs/expand#with-webhooks */
export interface StripeSubscriptionUnexpanded extends Stripe.Subscription {
  customer: string;
}

export interface StripeSubscriptionEvent extends Stripe.Event {
  type: `customer.subscription.${string}`;
  data: {
    object: StripeSubscriptionUnexpanded;
    previous_attributes?: Partial<StripeSubscriptionUnexpanded>;
  };
}

export interface StripeSubscriptionCreatedEvent
  extends StripeSubscriptionEvent {
  type: "customer.subscription.created";
  data: {
    object: Replace<
      StripeSubscriptionUnexpanded,
      { status: "active" | "incomplete" } // with our settings subscriptions generally start as 'incomplete' and move to 'active' once first payment succeeds. The only exception are subscriptions that we give out for free (e.g. via lifetime voucher codes), which start directly as active
    >;
    previous_attributes: never;
  };
}

export interface StripeSubscriptionUpdatedEvent
  extends StripeSubscriptionEvent {
  type: "customer.subscription.updated";
  data: {
    object: StripeSubscriptionUnexpanded;
    previous_attributes: Partial<StripeSubscriptionUnexpanded>;
  };
}

export interface StripeSubscriptionDeletedEvent
  extends StripeSubscriptionEvent {
  type: "customer.subscription.deleted";
  data: {
    object: Replace<StripeSubscriptionUnexpanded, { status: "canceled" }>;
    previous_attributes: never;
  };
}

/** See https://stripe.com/docs/api/events/types?lang=node */
export const isSubscriptionEvent = (
  e: Stripe.Event
): e is StripeSubscriptionEvent => e.type.startsWith("customer.subscription.");

export const isSubscriptionCreatedEvent = (
  e: StripeSubscriptionEvent
): e is StripeSubscriptionCreatedEvent =>
  e.type === "customer.subscription.created";

export const isSubscriptionUpdatedEvent = (
  e: StripeSubscriptionEvent
): e is StripeSubscriptionUpdatedEvent =>
  e.type === "customer.subscription.updated";

export const isSubscriptionDeletedEvent = (
  e: StripeSubscriptionEvent
): e is StripeSubscriptionDeletedEvent =>
  e.type === "customer.subscription.deleted";

/**
 * With our Stripe config the actual subscription "start" is the update event from status:incomplete to status:active (upon first successful payment)
 * (as opposed to the customer.subscription.created event - which happens with status:incomplete)
 * See also here: https://stripe.com/docs/billing/subscriptions/overview#subscription-lifecycleStripe.Subscription
 */
export const isSubscriptionStartEvent = (
  e: StripeSubscriptionUpdatedEvent
): boolean =>
  e.data.previous_attributes.status === "incomplete" &&
  e.data.object.status === "active";

export const isCheckoutFailureEvent = (
  e: StripeSubscriptionUpdatedEvent
): boolean =>
  e.data.previous_attributes.status === "incomplete" &&
  e.data.object.status === "incomplete_expired";

export const isSubscriptionUpgradeEvent = (
  e: StripeSubscriptionUpdatedEvent
): boolean =>
  e.data.previous_attributes.items?.data[0]?.plan.interval === "month" &&
  e.data.object.items.data[0]?.plan.interval === "year";

export const isSubscriptionDowngradeEvent = (
  e: StripeSubscriptionUpdatedEvent
): boolean =>
  e.data.previous_attributes.items?.data[0]?.plan.interval === "year" &&
  e.data.object.items.data[0]?.plan.interval === "month";

export const isTrialConvertedEvent = (
  e: StripeSubscriptionUpdatedEvent
): boolean =>
  e.data.previous_attributes.status === "trialing" &&
  e.data.object.status === "active";

export const isPaymentFailedEvent = (
  e: StripeSubscriptionUpdatedEvent
): boolean =>
  e.data.previous_attributes.status === "active" &&
  e.data.object.status === "past_due";

export const isPaymentRecoveredEvent = (
  e: StripeSubscriptionUpdatedEvent
): boolean =>
  e.data.previous_attributes.status === "past_due" &&
  e.data.object.status === "active";

export const isUserCanceledEvent = (
  e: StripeSubscriptionUpdatedEvent
): boolean =>
  e.data.previous_attributes.cancel_at_period_end === false &&
  e.data.object.cancel_at_period_end === true;

export const isUserUncanceledEvent = (
  e: StripeSubscriptionUpdatedEvent
): boolean =>
  e.data.previous_attributes.cancel_at_period_end === true &&
  e.data.object.cancel_at_period_end === false;

export const isVoluntaryChurnEvent = (
  e: StripeSubscriptionDeletedEvent
): boolean => e.data.object.cancel_at_period_end === true;

export const isInvoluntaryChurnEvent = (
  e: StripeSubscriptionDeletedEvent
): boolean => e.data.object.cancel_at_period_end === false;
