// @flow

import React, { Component } from "react";
import { View, Text } from "react-native";
import { PlansContainer } from "AppContainers";
import { InitEventHandlers, RequestProvider } from "AppProviders";
import {
  getPlans,
  addSubscription,
  getSubscriptions,
  deleteSubscription
} from "AppProxies";

type Props = {
  navigator: any
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

export const PlansScreen = InitEventHandlers(WrappedPlansScreen);
