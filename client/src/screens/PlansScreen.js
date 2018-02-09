// @flow

import React, { Component } from "react";
import { View, Text } from "react-native";
import { PlansContainer } from "AppContainers";
import { InitEventHandlers, RequestProvider } from "AppProviders";
import { getPlans } from "AppProxies";

type Props = {
  navigator: any
};

type State = {};

class WrappedPlansScreen extends Component<Props, State> {
  planProxies = { getPlans };

  renderRequestProvider = ({ getPlans }: any) => (
    <PlansContainer getPlans={getPlans} />
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
