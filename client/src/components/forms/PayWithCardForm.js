// @flow

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Loading, CardSelect } from "AppComponents";
import { PaymentButton } from "AppButtons";
import type { Card } from "AppTypes";

type Props = {
  payWithCard: () => Function,
  getCards: () => Function,
  payCallbackMap: Object,
  getCardsCallbackMap: Object,
  cards: Array<Card>,
  message: string
};

type State = {
  label: string,
  value: string
};

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
    const { payWithCard, payCallbackMap } = this.props;
    const { value } = this.state;
    if (value) {
      payWithCard(value)(payCallbackMap);
    }
  };

  render() {
    const { message, cards } = this.props;
    const { label } = this.state;
    return cards ? (
      <View style={styles.container}>
        <Text style={styles.title}>Pay wtih selected card</Text>
        <CardSelect
          cards={cards}
          onSelect={this.onSelect}
          defaultText={label}
        />
        <Text>{message}</Text>
        <PaymentButton payButtonPressedHandler={this.payButtonPressedHandler} />
      </View>
    ) : (
      <Loading />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center"
  },
  title: {
    fontSize: 25,
    marginTop: 10
  }
});
