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
import { ResponseStatuses, ModalTypes } from "AppConstants";

const { STATUS_OK } = ResponseStatuses;
const { ADD_CARD } = ModalTypes;

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
    this.paymentProxies = {
      payWithToken,
      payWithCard,
      payWithDefaultCard,
      getCards
    };
    this.callbacks = {};
    this.initializeCallbacks();
  }

  componentDidMount() {
    initializeStripe();
  }

  initializeCallbacks = () => {
    const payWithToken = initializeCallbackMaps(this, "payWithTokenMessage");
    const payWithCard = initializeCallbackMaps(this, "payWithCardMessage");
    const payWithDefaultCard = initializeCallbackMaps(
      this,
      "payWithDefaultCardMessage"
    );
    this.callbacks = {
      payWithToken,
      payWithCard,
      payWithDefaultCard
    };
    this.initializeGetCardsCallbacks();
  };

  initializeGetCardsCallbacks = () => {
    const handleOk = (data: Array<Card>) => {
      this.setState({ cards: data });
    };
    this.callbacks.getCards = {
      [STATUS_OK]: handleOk
    };
  };

  renderRequestProvider = ({
    payWithToken,
    payWithCard,
    payWithDefaultCard,
    getCards
  }: any): Element<typeof PaymentForm> => {
    const {
      payWithTokenMessage,
      payWithDefaultCardMessage,
      payWithCardMessage,
      cards
    } = this.state;
    const callbacks = this.callbacks;
    return (
      <View style={styles.container}>
        <PaymentForm
          callbackMap={callbacks.payWithToken}
          payWithToken={payWithToken}
          message={payWithTokenMessage}
        />
        <PayWithCardForm
          callbackMap={callbacks.payWithCard}
          getCards={getCards}
          cards={cards}
          payWithCard={payWithCard}
          message={payWithCardMessage}
        />
        <PayWithDefaultCardForm
          callbackMap={callbacks.payWithDefaultCard}
          payWithDefaultCard={payWithDefaultCard}
          message={payWithDefaultCardMessage}
        />
      </View>
    );
  };

  render = () => {
    return (
      <RequestProvider
        requestProxy={this.paymentProxies}
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
