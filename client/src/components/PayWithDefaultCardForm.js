// @flow

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PaymentButton } from "AppButtons";

type Props = {
  handleSubmit: Function,
  payButtonPressedHandler: Function,
  message: string
};

export const PayWithDefaultCardForm = (props: Props): any => (
  <View style={styles.container}>
    <Text style={styles.title}>Pay with default card</Text>
    <Text>{props.message}</Text>
    <PaymentButton payButtonPressedHandler={props.payButtonPressedHandler} />
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
