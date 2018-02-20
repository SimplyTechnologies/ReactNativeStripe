// @flow
import type { Plan } from "AppTypes";

export type SubscriptionItem = {
  id: string,
  object: string,
  created: number,
  metadata: Object,
  plan: Plan,
  quantity: number,
  subscription: string
};
