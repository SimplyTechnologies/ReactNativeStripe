// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { View, StyleSheet } from "react-native";
import {
  PaymentForm,
  PayWithDefaultCardForm,
  PayWithCardForm
} from "AppComponents";
import { payWithToken, payWithCard, payWithDefaultCard } from "AppProxies";
import { RequestProvider, InitEventHandlers } from "AppProviders";
import { stripeUtils } from "AppUtils";

const { initializeStripe, initializeCallbackMaps } = stripeUtils;

type Props = {
  navigator: any
};

type State = {
  payWithTokenMessage: string,
  payWithDefaultCardMessage: string,
  payWithCardMessage: string
};

class WrappedPaymentScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      payWithTokenMessage: "",
      payWithDefaultCardMessage: "",
      payWithCardMessage: ""
    };
  }

  componentDidMount() {
    initializeStripe();
  }

  renderRequestProvider = (
    handleRequest: Function
  ): Element<typeof PaymentForm> => {
    const {
      payWithTokenMessage,
      payWithDefaultCardMessage,
      payWithCardMessage
    } = this.state;
    return (
      <View style={styles.container}>
        <PaymentForm
          style={styles.component}
          handleSubmit={handleRequest().payWithToken}
          message={payWithTokenMessage}
        />
        <PayWithDefaultCardForm
          style={styles.component}
          handleSubmit={handleRequest().payWithDefaultCard}
          message={payWithDefaultCardMessage}
        />
        <PayWithCardForm
          style={styles.component}
          handleSubmit={handleRequest().payWithCard}
          message={payWithCardMessage}
        />
      </View>
    );
  };

  render() {
    const requestProxy = new Map([
      [payWithToken, initializeCallbackMaps(this, "payWithTokenMessage")],
      [
        payWithDefaultCard,
        initializeCallbackMaps(this, "payWithDefaultCardMessage")
      ],
      [payWithCard, initializeCallbackMaps(this, "payWithCardMessage")]
    ]);
    return (
      <RequestProvider
        requestProxy={requestProxy}
        render={this.renderRequestProvider}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    alignItems: "center"
  },
  component: {
    flex: 1,
    justifyContent: "center"
  }
});

export const PaymentScreen = InitEventHandlers(WrappedPaymentScreen);
