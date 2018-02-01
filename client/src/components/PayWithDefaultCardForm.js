// @flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  style: Object,
  handleSubmit: Function
};

export const PayWithDefaultCardForm = (props: Props): any => (
  <View style={props.style}>
    <Text>Pay with default card</Text>
    <Text>{props.message}</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        props.handleSubmit();
      }}
    >
      <Text style={styles.buttonText}>Pay</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  notification: {},
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    width: 50
  },
  buttonText: {
    textAlign: "center",
    color: "white"
  }
});
