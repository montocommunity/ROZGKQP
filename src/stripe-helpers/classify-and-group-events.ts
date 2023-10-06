import {
  type StripeSubscriptionEvent,
  isCheckoutFailureEvent,
  isInvoluntaryChurnEvent,
  isPaymentFailedEvent,
  isPaymentRecoveredEvent,
  isSubscriptionStartEvent,
  isSubscriptionUpgradeEvent,
  isTrialConvertedEvent,
  isUserCanceledEvent,
  isUserUncanceledEvent,
  isVoluntaryChurnEvent,
  isSubscriptionUpdatedEvent,
  isSubscriptionDeletedEvent,
} from "./classification";

interface ClassifiedEvents {
  signups: StripeSubscriptionEvent[];
  trialConversions: StripeSubscriptionEvent[];
  checkoutFailures: StripeSubscriptionEvent[];
  scheduledToCancel: StripeSubscriptionEvent[];
  unscheduledToCancel: StripeSubscriptionEvent[];
  activeToPastDues: StripeSubscriptionEvent[];
  pastDueToActive: StripeSubscriptionEvent[];
  involuntaryChurn: StripeSubscriptionEvent[];
  voluntaryChurn: StripeSubscriptionEvent[];
  subscriptionUpgrades: StripeSubscriptionEvent[];
}

export function classifyAndGroupEvents(
  events: StripeSubscriptionEvent[]
): ClassifiedEvents {
  const classifiedEvents: ClassifiedEvents = {
    signups: [],
    trialConversions: [],
    checkoutFailures: [],
    scheduledToCancel: [],
    unscheduledToCancel: [],
    activeToPastDues: [],
    pastDueToActive: [],
    involuntaryChurn: [],
    voluntaryChurn: [],
    subscriptionUpgrades: [],
  };
  events.forEach((event) => {
    if (isSubscriptionUpdatedEvent(event)) {
      if (isSubscriptionStartEvent(event)) {
        classifiedEvents.signups.push(event);
      } else if (isTrialConvertedEvent(event)) {
        classifiedEvents.trialConversions.push(event);
      } else if (isCheckoutFailureEvent(event)) {
        classifiedEvents.checkoutFailures.push(event);
      } else if (isUserCanceledEvent(event)) {
        classifiedEvents.scheduledToCancel.push(event);
      } else if (isUserUncanceledEvent(event)) {
        classifiedEvents.unscheduledToCancel.push(event);
      } else if (isPaymentFailedEvent(event)) {
        classifiedEvents.activeToPastDues.push(event);
      } else if (isPaymentRecoveredEvent(event)) {
        classifiedEvents.pastDueToActive.push(event);
      } else if (isSubscriptionUpgradeEvent(event)) {
        classifiedEvents.subscriptionUpgrades.push(event);
      }
    } else if (isSubscriptionDeletedEvent(event)) {
      if (isVoluntaryChurnEvent(event)) {
        classifiedEvents.voluntaryChurn.push(event);
      } else if (isInvoluntaryChurnEvent(event)) {
        classifiedEvents.involuntaryChurn.push(event);
      }
    }
  });

  return classifiedEvents;
}
