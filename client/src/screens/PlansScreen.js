// @flow

import React, { Component } from "react";
import { View } from "react-native";
import { PlansContainer } from "AppContainers";
import { Header } from "AppComponents";
import { SpinnerProvider, RequestProvider, ToastProvider } from "AppProviders";
import {
  getPlans,
  addSubscription,
  getSubscriptions,
  deleteSubscription
} from "AppProxies";

type requestTypes = {
  getPlans: Function,
  getSubscriptions: Function,
  addSubscription: Function,
  deleteSubscription: Function
};

type Props = {
  navigator: Object,
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
  }: requestTypes) => (
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
      <View style={{ flex: 1 }}>
        <Header />
        <RequestProvider
          render={this.renderRequestProvider}
          requestProxy={this.planProxies}
        />
      </View>
    );
  }
}

export const PlansScreen = SpinnerProvider(WrappedPlansScreen);
