// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { PaymentContainer } from "AppContainers";
import {
  payWithToken,
  payWithCard,
  payWithDefaultCard,
  getCards
} from "AppProxies";
import {
  RequestProvider,
  InitEventHandlers,
  SpinnerProvider
} from "AppProviders";
import { stripeUtils } from "AppUtils";

type Props = {
  navigator: any,
  showSpinner: Function,
  hideSpinner: Function
};

type State = {};

class WrappedPaymentScreen extends Component<Props, State> {
  paymentProxies = {
    payWithToken,
    payWithCard,
    payWithDefaultCard,
    getCards
  };

  componentDidMount() {
    stripeUtils.initializeStripe();
  }

  renderRequestProvider = (requests: Object) => (
    <PaymentContainer
      showSpinner={this.props.showSpinner}
      hideSpinner={this.props.hideSpinner}
      {...requests}
    />
  );

  render = () => {
    return (
      <RequestProvider
        requestProxy={this.paymentProxies}
        render={this.renderRequestProvider}
      />
    );
  };
}

export const PaymentScreen = InitEventHandlers(
  SpinnerProvider(WrappedPaymentScreen)
);
