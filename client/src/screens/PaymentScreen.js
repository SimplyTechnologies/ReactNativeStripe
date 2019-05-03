// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { PaymentContainer } from "AppContainers";
import { Header } from "AppComponents";
import {
  payWithToken,
  payWithCard,
  payWithDefaultCard,
  getCards
} from "AppProxies";
import { RequestProvider, SpinnerProvider } from "AppProviders";
import { stripeUtils } from "AppUtils";

type Props = {
  navigator: Object,
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

  render = () => (
    <View style={{ flex: 1 }}>
      <Header />
      <RequestProvider
        requestProxy={this.paymentProxies}
        render={this.renderRequestProvider}
      />
    </View>
  );
}

export const PaymentScreen = SpinnerProvider(WrappedPaymentScreen);
