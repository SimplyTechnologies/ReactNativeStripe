// @flow

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PaymentButton } from "AppButtons";

type Props = {
  handleSubmit: Function,
  payWithDefaultCard: Function,
  callbackMap: Object,
  message: string
};

const payHandler = (payWithDefaultCard, callbackMap) => () =>
  payWithDefaultCard()(callbackMap);

export const PayWithDefaultCardForm = ({
  message,
  payWithDefaultCard,
  callbackMap
}: Props): any => (
  <View style={styles.container}>
    <Text style={styles.title}>Pay with default card</Text>
    <Text>{message}</Text>
    <PaymentButton
      payButtonPressedHandler={payHandler(payWithDefaultCard, callbackMap)}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 20
  }
});
