// @flow

import React, { Component } from "react";
import { View, Text } from "react-native";
import { PlansContainer } from "AppContainers";
import {
  InitEventHandlers,
  SpinnerProvider,
  RequestProvider,
  ToastProvider
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
  hideSpinner: Function,
  showToast: Function
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
    <ToastProvider>
      {({ showToast }) => (
        <PlansContainer
          getPlans={getPlans}
          getSubscriptions={getSubscriptions}
          addSubscription={addSubscription}
          deleteSubscription={deleteSubscription}
          showSpinner={this.props.showSpinner}
          hideSpinner={this.props.hideSpinner}
          showToast={showToast}
        />
      )}
    </ToastProvider>
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
