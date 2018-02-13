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
    backgroundColor: "#32CD32",
    borderRadius: 3,
    width: 50,
    padding: 5
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    color: "white"
  }
});
