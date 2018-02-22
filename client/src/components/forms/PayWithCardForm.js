// @flow

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Loading, CardSelect } from "AppComponents";
import { PaymentButton } from "AppButtons";
import type { Card, CallbackMap } from "AppTypes";

type Props = {
  payWithCard: () => Function,
  getCards: () => Function,
  payCallbackMap: CallbackMap,
  getCardsCallbackMap: CallbackMap,
  cards: Array<Card>,
  message: string,
  showSpinner: ?Function
};

type State = {
  label: string,
  value: string
};

const EMPTY_FUNCTION = () => {};

export class PayWithCardForm extends Component<Props, State> {
  state = {
    label: "Select Me Please",
    value: ""
  };

  componentDidMount() {
    const { getCards, getCardsCallbackMap } = this.props;
    getCards()(getCardsCallbackMap);
  }

  onSelect = (value: string, label: string) => {
    this.setState({ label, value });
  };

  payButtonPressedHandler = () => {
    const { payWithCard, payCallbackMap, showSpinner } = this.props;
    const { value } = this.state;
    const spin = showSpinner || EMPTY_FUNCTION;
    if (value) {
      spin();
      payWithCard(value)(payCallbackMap);
    }
  };

  render() {
    const { message, cards } = this.props;
    const { label } = this.state;
    return cards ? (
      <View style={styles.container}>
        <Text style={styles.title}>Pay with selected card</Text>
        <CardSelect
          cards={cards}
          onSelect={this.onSelect}
          defaultText={label}
        />
        <Text>{message.length ? message : " "}</Text>
        <PaymentButton payButtonPressedHandler={this.payButtonPressedHandler} />
      </View>
    ) : (
      <Loading />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 25,
    marginTop: 10
  }
});
