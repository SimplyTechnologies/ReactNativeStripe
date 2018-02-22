// @flow
import type { Plan, SubscriptionItem } from "AppTypes";

export type Subscription = {
  id: string,
  object: string,
  application_fee_percent: ?Object,
  billing: string,
  billing_cycle_anchor: number,
  cancel_at_period_end: boolean,
  canceled_at: number,
  created: number,
  current_period_end: number,
  current_period_start: number,
  customer: string,
  days_until_due: ?Object,
  discount: ?Object,
  ended_at: number,
  items: {
    object: string,
    data: Array<SubscriptionItem>,
    has_more: boolean,
    total_count: number,
    url: string
  },
  livemode: boolean,
  metadata: Object,
  plan: Plan,
  quantity: number,
  start: number,
  status: string,
  tax_percent: ?Object,
  trial_end: ?Object,
  trial_start: ?Object
};
