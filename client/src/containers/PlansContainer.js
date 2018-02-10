// @flow
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { PlansList, SubscriptionsList, Filter, Loading } from "AppComponents";
import { ResponseStatuses } from "AppConstants";

type Props = {
  getPlans: Function,
  getSubscriptions: Function,
  addSubscription: Function,
  deleteSubscription: Function
};

type State = {
  plans: any,
  subscriptions: any,
  selectedFilter: string,
  filtersMap: Object
};

const { STATUS_OK } = ResponseStatuses;

export class PlansContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      plans: null,
      subscriptions: null,
      selectedFilter: "Plans",
      filtersMap: {}
    };
    this.callbacks = {};
    this.initializeFiltersMap();
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

  initializeFiltersMap = () => {
    this.filtersMap = {
      Plans: () => this.setState({ selectedFilter: "Plans" }),
      Subscriptions: () => this.setState({ selectedFilter: "Subscriptions" })
    };
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
  };

  renderSubscriptionsList = () => {
    const { subscriptions } = this.state;
    return subscriptions ? (
      <SubscriptionsList subscriptions={subscriptions} />
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
