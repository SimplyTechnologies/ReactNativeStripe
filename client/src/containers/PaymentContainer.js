// @flow
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  PayWithCardForm,
  PaymentForm,
  PayWithDefaultCardForm
} from "AppComponents";
import { stripeUtils } from "AppUtils";
import { ResponseStatuses } from "AppConstants";

type Props = {
  payWithToken: Function,
  payWithCard: Function,
  payWithDefaultCard: Function,
  getCards: Function
};

type State = {};

const { initializeCallbackMaps } = stripeUtils;
const { STATUS_OK } = ResponseStatuses;

export class PaymentContainer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      payWithTokenMessage: "",
      payWithDefaultCardMessage: "",
      payWithCardMessage: "",
      cards: null
    };
    this.callbacks = {};
    this.initializeCallbacks();
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

  render() {
    const {
      payWithToken,
      payWithCard,
      payWithDefaultCard,
      getCards
    } = this.props;
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    alignItems: "center"
  }
});
