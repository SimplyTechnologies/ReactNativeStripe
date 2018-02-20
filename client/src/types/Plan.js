// @flow

export type Plan = {
  id: string,
  object: string,
  amount: number,
  created: number,
  currency: string,
  interval: string,
  interval_count: number,
  livemode: boolean,
  metadata: Object,
  nickname: ?Object,
  product: string,
  trial_period_days: number
};
