// @flow
import React, { Component } from "react";
import type { Node } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PaymentButton } from "AppButtons";
import type { CallbackMap } from "AppTypes";

type Props = {
  handleSubmit: Function,
  payWithDefaultCard: Function,
  callbackMap: CallbackMap,
  message: string,
  showSpinner: ?Function
};

const EMPTY_FUNCTION = () => {};

const payHandler = (payWithDefaultCard, callbackMap, showSpinner) => () => {
  const spin = showSpinner || EMPTY_FUNCTION;
  spin();
  payWithDefaultCard()(callbackMap);
};

export const PayWithDefaultCardForm = ({
  message,
  payWithDefaultCard,
  callbackMap,
  showSpinner
}: Props): Node => (
  <View style={styles.container}>
    <Text style={styles.title}>Pay with default card</Text>
    <Text>{message.length ? message : " "}</Text>
    <PaymentButton
      payButtonPressedHandler={payHandler(
        payWithDefaultCard,
        callbackMap,
        showSpinner
      )}
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
