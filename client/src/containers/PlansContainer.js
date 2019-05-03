// @flow
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { PlansList, SubscriptionsList, Filter, Loading } from "AppComponents";
import { ResponseStatuses } from "AppConstants";
import type { Plan, Subscription } from "AppTypes";

type Props = {
  getPlans: Function,
  getSubscriptions: Function,
  addSubscription: Function,
  deleteSubscription: Function,
  showSpinner: Function,
  hideSpinner: Function,
  showToast: Function
};

type State = {
  plans: ?Array<Plan>,
  subscriptions: ?Array<Subscription>,
  selectedFilter: string,
  subscribedPlanIds: Object
};

const { STATUS_OK, STATUS_400 } = ResponseStatuses;

export class PlansContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      plans: null,
      subscriptions: null,
      selectedFilter: "Plans",
      subscribedPlanIds: {}
    };
    this.callbacks = {};
    this.initializeFiltersMap();
    this.initializeGetSubscriptionsCallbacks();
    this.initializeGetPlansCallbacks();
    this.initializeAddSubscriptionCallbacks();
    this.initializeDeleteSubscriptionCallbacks();
  }

  componentDidMount() {
    const { getPlans, getSubscriptions } = this.props;
    const {
      getPlans: getPlansCallbacks,
      getSubscriptions: getSubscriptionsCallbacks
    } = this.callbacks;
    getSubscriptions()(getSubscriptionsCallbacks);
    getPlans()(getPlansCallbacks);
  }

  initializeGetPlansCallbacks = () => {
    const handleOk = (plans: Array<Plan>) => this.setState({ plans });
    const callbackMap = {
      [STATUS_OK]: handleOk
    };
    this.callbacks.getPlans = callbackMap;
  };

  initializeGetSubscriptionsCallbacks = () => {
    const handleOk = ({
      subscriptions,
      subscribedPlanIds
    }: {
      subscriptions: Array<Subscription>,
      subscribedPlanIds: Object
    }) => this.setState({ subscriptions, subscribedPlanIds });
    const callbackMap = {
      [STATUS_OK]: handleOk
    };
    this.callbacks.getSubscriptions = callbackMap;
  };

  initializeAddSubscriptionCallbacks = () => {
    const { showToast, hideSpinner } = this.props;
    const handleOk = (subscription: Subscription) => {
      this.addSubscription(subscription);
      hideSpinner();
    };
    const handle400 = ({ message }: { message: string }) => {
      hideSpinner();
      showToast(message);
    };
    const callbackMap = { [STATUS_OK]: handleOk, [STATUS_400]: handle400 };
    this.callbacks.addSubscription = callbackMap;
  };

  initializeDeleteSubscriptionCallbacks = () => {
    const { hideSpinner } = this.props;
    const handleOk = ({ id, plan }: { id: string, plan: Plan }) => {
      this.removeSubscription(id, plan.id);
      hideSpinner();
    };
    const callbackMap = { [STATUS_OK]: handleOk };
    this.callbacks.deleteSubscription = callbackMap;
  };

  initializeFiltersMap = () => {
    this.filtersMap = {
      Plans: () => this.setState({ selectedFilter: "Plans" }),
      Subscriptions: () => this.setState({ selectedFilter: "Subscriptions" })
    };
  };

  getSubscriptionIndexById = (id: string) => {
    const { subscriptions } = this.state;
    let index = -1;
    if (!subscriptions) {
      return index;
    }
    subscriptions.forEach((subscription, iteration) => {
      if (id === subscription.id) {
        index = iteration;
      }
    });
    return index;
  };

  addSubscription = (subscription: Subscription) => {
    const subscriptions = [...this.state.subscriptions];
    const subscribedPlanIds = { ...this.state.subscribedPlanIds };
    subscriptions.push(subscription);
    subscribedPlanIds[subscription.plan.id] = true;
    this.setState({ subscriptions, subscribedPlanIds });
  };

  removeSubscription = (id: string, planId: string) => {
    const subscriptions = [...this.state.subscriptions];
    const subscribedPlanIds = { ...this.state.subscribedPlanIds };
    const index = this.getSubscriptionIndexById(id);
    subscriptions.splice(index, 1);
    subscribedPlanIds[planId] = false;
    this.setState({ subscriptions, subscribedPlanIds });
  };

  renderList = () => {
    const { selectedFilter } = this.state;
    if (selectedFilter === "Plans") {
      return this.renderPlansList();
    }
    if (selectedFilter === "Subscriptions") {
      return this.renderSubscriptionsList();
    }
    return null;
  };

  renderPlansList = () => {
    const { addSubscription, showSpinner } = this.props;
    const { plans, subscribedPlanIds } = this.state;
    const { callbacks } = this;
    return plans ? (
      <PlansList
        plans={plans}
        subscribedPlanIds={subscribedPlanIds}
        addSubscription={addSubscription}
        addSubscriptionCallbacks={callbacks.addSubscription}
        showSpinner={showSpinner}
      />
    ) : (
      <Loading />
    );
  };

  renderSubscriptionsList = () => {
    const { deleteSubscription, showSpinner } = this.props;
    const { subscriptions } = this.state;
    const { callbacks } = this;
    return subscriptions ? (
      <SubscriptionsList
        subscriptions={subscriptions}
        deleteSubscription={deleteSubscription}
        deleteSubscriptionCallbacks={callbacks.deleteSubscription}
        showSpinner={showSpinner}
      />
    ) : (
      <Loading />
    );
  };

  render() {
    const { selectedFilter } = this.state;
    return (
      <View style={styles.container}>
        <Filter filtersMap={this.filtersMap} selectedFilter={selectedFilter} />
        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  }
});
