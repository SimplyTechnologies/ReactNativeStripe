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

type Message = {
  message: string
};

const { initializeCallbackMaps } = stripeUtils;
const { STATUS_OK, STATUS_402, STATUS_400 } = ResponseStatuses;

export class PaymentContainer extends Component<Props, State> {
  constructor(props: Props) {
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

  setMessage = (messageTitle: string, message: string) => {
    this.setState({ [messageTitle]: message });
    setTimeout(() => this.clearMessage(messageTitle), 3000);
  };

  clearMessage = messageTitle => this.setState({ [messageTitle]: "" });

  getNotificationHandler = (messageTitle: string) => ({ message }: Message) =>
    this.setMessage(messageTitle, message);

  getCallbackMaps = (messageTitle: string) => {
    const notificationhandler = this.getNotificationHandler(messageTitle);
    return {
      [STATUS_OK]: notificationhandler,
      [STATUS_402]: notificationhandler,
      [STATUS_400]: notificationhandler
    };
  };

  initializeCallbacks = () => {
    // payment forms callbacks
    const payWithToken = this.getCallbackMaps("payWithTokenMessage");
    const payWithCard = this.getCallbackMaps("payWithCardMessage");
    const payWithDefaultCard = this.getCallbackMaps(
      "payWithDefaultCardMessage"
    );

    // fetching cards callbacks
    const getCards = {
      [STATUS_OK]: (data: Array<Card>) => {
        this.setState({ cards: data });
      }
    };

    // setting callbacks
    this.callbacks = {
      payWithToken,
      payWithCard,
      payWithDefaultCard,
      getCards
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
          payCallbackMap={callbacks.payWithCard}
          getCardsCallbackMap={callbacks.getCards}
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
