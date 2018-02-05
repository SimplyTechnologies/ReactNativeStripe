// @flow

import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import type { Node } from "react-native";

type Props = {
  payButtonPressedHandler: () => void
};

export const PaymentButton = (props: Props): Node => (
  <TouchableOpacity
    style={styles.button}
    onPress={props.payButtonPressedHandler}
  >
    <Text style={styles.buttonText}>Pay</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    width: 80
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
    color: "white"
  }
});
