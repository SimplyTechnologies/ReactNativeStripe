// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { PlansList, Loading } from "AppComponents";
import { ResponseStatuses } from "AppConstants";

type Props = {
  getPlans: Function,
  getSubscriptions: Function,
  addSubscription: Function,
  deleteSubscription: Function
};

type State = {
  plans: any,
  subscriptions: any
};

const { STATUS_OK } = ResponseStatuses;

export class PlansContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      plans: null,
      subscriptions: null
    };
    this.callbacks = {};
    this.initializeGetPlansCallbacks();
    this.initializeAddSubscriptionCallbacks();
  }

  componentDidMount() {
    const { getPlans, getSubscriptions } = this.props;
    const {
      getPlans: getPlansCallbacks,
      getSubscriptions: getSubscriptionsCallbacks
    } = this.callbacks;
    getPlans()(getPlansCallbacks);
    getSubscriptions()(getSubscriptionsCallbacks);
  }

  initializeGetPlansCallbacks = () => {
    const handleOk = (plans: any) => this.setState({ plans });
    const callbackMap = {
      [STATUS_OK]: handleOk
    };
    this.callbacks.getPlans = callbackMap;
  };

  initializeGetSubscriptionsCallbacks = () => {
    const handleOk = (subscriptions: any) => this.setState({ subscriptions });
    const callbackMap = {
      [STATUS_OK]: handleOk
    };
    this.callbacks.getSubscriptions = callbackMap;
  };

  initializeAddSubscriptionCallbacks = () => {
    const handleOk = (data: any) => console.log("SUBSCRIPTION ADDED", data);
    const callbackMap = { [STATUS_OK]: handleOk };
    this.callbacks.addSubscription = callbackMap;
  };

  render() {
    const { addSubscription } = this.props;
    const { plans } = this.state;
    const callbacks = this.callbacks;
    return plans ? (
      <PlansList
        plans={plans}
        addSubscription={addSubscription}
        addSubscriptionCallbacks={callbacks.addSubscription}
      />
    ) : (
      <Loading />
    );
  }
}
