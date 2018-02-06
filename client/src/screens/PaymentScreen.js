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
import { RequestProvider, InitEventHandlers } from "AppProviders";

type Props = {
  navigator: any
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
    initializeStripe();
  }

  renderRequestProvider = (requests: Object) => (
    <PaymentContainer {...requests} />
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

export const PaymentScreen = InitEventHandlers(WrappedPaymentScreen);
