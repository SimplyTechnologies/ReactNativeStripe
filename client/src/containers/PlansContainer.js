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
    this.initializeGetSubscriptionsCallbacks();
    this.initializeAddSubscriptionCallbacks();
    this.initializeDeleteSubscriptionCallbacks();
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
    const handleOk = (subscription: any) => this.addSubscription(subscription);
    const callbackMap = { [STATUS_OK]: handleOk };
    this.callbacks.addSubscription = callbackMap;
  };

  initializeDeleteSubscriptionCallbacks = () => {
    const handleOk = ({ id }: any) => this.removeSubscription(id);
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
    subscriptions.forEach((subscription, iteration) => {
      if (id === subscription.id) {
        index = iteration;
      }
    });
    return index;
  };

  addSubscription = (subscription: any) => {
    const subscriptions = [...this.state.subscriptions];
    subscriptions.push(subscription);
    this.setState({ subscriptions });
  };

  removeSubscription = (id: string) => {
    const subscriptions = [...this.state.subscriptions];
    const index = this.getSubscriptionIndexById(id);
    subscriptions.splice(index, 1);
    this.setState({ subscriptions });
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
    const { deleteSubscription } = this.props;
    const { subscriptions } = this.state;
    const callbacks = this.callbacks;
    return subscriptions ? (
      <SubscriptionsList
        subscriptions={subscriptions}
        deleteSubscription={deleteSubscription}
        deleteSubscriptionCallbacks={callbacks.deleteSubscription}
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
