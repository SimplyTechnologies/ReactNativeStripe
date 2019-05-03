// @flow
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  PayWithCardForm,
  PaymentForm,
  PayWithDefaultCardForm,
  Filter
} from "AppComponents";
import { stripeUtils } from "AppUtils";
import { ResponseStatuses } from "AppConstants";
import type { Card } from "AppTypes";

type Props = {
  payWithToken: Function,
  payWithCard: Function,
  payWithDefaultCard: Function,
  getCards: Function,
  showSpinner: Function,
  hideSpinner: Function
};

type State = {
  payWithTokenMessage: string,
  payWithDefaultCardMessage: string,
  payWithCardMessage: string,
  selectedFilter: "Card number" | "Your cards" | "Default card",
  cards: ?Array<Card>
};

type Message = {
  message: string
};

const { initializeCallbackMaps } = stripeUtils;
const { STATUS_OK, STATUS_402, STATUS_400 } = ResponseStatuses;

export class PaymentContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedFilter: "Card number",
      payWithTokenMessage: "",
      payWithDefaultCardMessage: "",
      payWithCardMessage: "",
      cards: null
    };
    this.callbacks = {};
    this.initializeCallbacks();
    this.initializeFiltersMap();
  }

  setMessage = (messageTitle: string, message: string) => {
    this.setState({ [messageTitle]: message });
    setTimeout(() => this.clearMessage(messageTitle), 3000);
  };

  clearMessage = messageTitle => this.setState({ [messageTitle]: "" });

  getNotificationHandler = (messageTitle: string) => ({ message }: Message) => {
    this.props.hideSpinner();
    this.setMessage(messageTitle, message);
  };

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

  initializeFiltersMap = () => {
    this.filtersMap = {
      "Card number": () => this.setState({ selectedFilter: "Card number" }),
      "Your cards": () => this.setState({ selectedFilter: "Your cards" }),
      "Default card": () => this.setState({ selectedFilter: "Default card" })
    };
  };

  renderForm = () => {
    const { selectedFilter } = this.state;
    switch (selectedFilter) {
      case "Card number":
        return this.renderPaymentForm();
      case "Your cards":
        return this.renderPayWithCardForm();
      case "Default card":
        return this.renderPayWithDefaultCardForm();
      default:
        return null;
    }
  };

  renderPaymentForm = () => {
    const { payWithToken, showSpinner } = this.props;
    const { payWithTokenMessage } = this.state;
    const { callbacks } = this;
    return (
      <PaymentForm
        callbackMap={callbacks.payWithToken}
        payWithToken={payWithToken}
        message={payWithTokenMessage}
        showSpinner={showSpinner}
      />
    );
  };

  renderPayWithCardForm = () => {
    const { getCards, payWithCard, showSpinner } = this.props;
    const { cards, payWithCardMessage } = this.state;
    const { callbacks } = this;
    return (
      <PayWithCardForm
        payCallbackMap={callbacks.payWithCard}
        getCardsCallbackMap={callbacks.getCards}
        getCards={getCards}
        cards={cards}
        payWithCard={payWithCard}
        message={payWithCardMessage}
        showSpinner={showSpinner}
      />
    );
  };

  renderPayWithDefaultCardForm = () => {
    const { payWithDefaultCard, showSpinner } = this.props;
    const { payWithDefaultCardMessage } = this.state;
    const { callbacks } = this;
    return (
      <PayWithDefaultCardForm
        callbackMap={callbacks.payWithDefaultCard}
        payWithDefaultCard={payWithDefaultCard}
        message={payWithDefaultCardMessage}
        showSpinner={showSpinner}
      />
    );
  };

  render() {
    const { selectedFilter } = this.state;
    const { filtersMap } = this;
    return (
      <View style={styles.container}>
        <Filter filtersMap={filtersMap} selectedFilter={selectedFilter} />
        <View style={styles.formContainer}>{this.renderForm()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    alignItems: "center"
  },
  formContainer: {
    flex: 11
  }
});
