// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { View, StyleSheet } from "react-native";
import {
  PaymentForm,
  PayWithDefaultCardForm,
  PayWithCardForm
} from "AppComponents";
import {
  payWithToken,
  payWithCard,
  payWithDefaultCard,
  getCards
} from "AppProxies";
import { RequestProvider, InitEventHandlers } from "AppProviders";
import { stripeUtils } from "AppUtils";
import type { Card } from "AppTypes";
import { ResponseStatuses } from "AppConstants";

const { STATUS_OK } = ResponseStatuses;

const { initializeStripe, initializeCallbackMaps } = stripeUtils;

type Props = {
  navigator: any
};

type State = {
  payWithTokenMessage: string,
  payWithDefaultCardMessage: string,
  payWithCardMessage: string,
  cards: Array<Card>
};

class WrappedPaymentScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      payWithTokenMessage: "",
      payWithDefaultCardMessage: "",
      payWithCardMessage: "",
      cards: []
    };
    this.initializeGetCardsCallbacks(this);
  }

  componentDidMount() {
    initializeStripe();
  }
  getCardsCallbackMap: Object;
  initializeGetCardsCallbacks = (context: any) => {
    const handleOk = (data: Array<Card>) => {
      context.setState({ cards: data });
    };
    this.getCardsCallbackMap = {
      [STATUS_OK]: handleOk
    };
  };

  renderRequestProvider = (
    handleRequest: Function
  ): Element<typeof PaymentForm> => {
    const {
      payWithTokenMessage,
      payWithDefaultCardMessage,
      payWithCardMessage,
      cards
    } = this.state;
    return (
      <View style={styles.container}>
        <PaymentForm
          payButtonPressedHandler={handleRequest().payWithToken}
          message={payWithTokenMessage}
        />
        <PayWithCardForm
          getCards={handleRequest().getCards}
          cards={cards}
          payButtonPressedHandler={handleRequest().payWithCard}
          message={payWithCardMessage}
        />
        <PayWithDefaultCardForm
          payButtonPressedHandler={handleRequest().payWithDefaultCard}
          message={payWithDefaultCardMessage}
        />
      </View>
    );
  };

  render = () => {
    const requestProxy = new Map([
      [payWithToken, initializeCallbackMaps(this, "payWithTokenMessage")],
      [
        payWithDefaultCard,
        initializeCallbackMaps(this, "payWithDefaultCardMessage")
      ],
      [payWithCard, initializeCallbackMaps(this, "payWithCardMessage")],
      [getCards, this.getCardsCallbackMap]
    ]);
    return (
      <RequestProvider
        requestProxy={requestProxy}
        render={this.renderRequestProvider}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    alignItems: "center"
  }
});

export const PaymentScreen = InitEventHandlers(WrappedPaymentScreen);
