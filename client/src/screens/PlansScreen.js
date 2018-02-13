// @flow

import React, { Component } from "react";
import { View, Text } from "react-native";
import { PlansContainer } from "AppContainers";
import {
  InitEventHandlers,
  SpinnerProvider,
  RequestProvider
} from "AppProviders";
import {
  getPlans,
  addSubscription,
  getSubscriptions,
  deleteSubscription
} from "AppProxies";

type Props = {
  navigator: any,
  showSpinner: Function,
  hideSpinner: Function
};

type State = {};

class WrappedPlansScreen extends Component<Props, State> {
  planProxies = {
    getPlans,
    getSubscriptions,
    addSubscription,
    deleteSubscription
  };

  renderRequestProvider = ({
    getPlans,
    getSubscriptions,
    addSubscription,
    deleteSubscription
  }: any) => (
    <PlansContainer
      getPlans={getPlans}
      getSubscriptions={getSubscriptions}
      addSubscription={addSubscription}
      deleteSubscription={deleteSubscription}
      showSpinner={this.props.showSpinner}
      hideSpinner={this.props.hideSpinner}
    />
  );

  render() {
    return (
      <RequestProvider
        render={this.renderRequestProvider}
        requestProxy={this.planProxies}
      />
    );
  }
}

export const PlansScreen = InitEventHandlers(
  SpinnerProvider(WrappedPlansScreen)
);
