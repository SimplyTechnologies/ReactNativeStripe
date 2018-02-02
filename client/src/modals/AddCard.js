// @flow
import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { PaymentForm } from "AppComponents";

type Props = {};

type State = {};

export class AddCard extends Component<Props, State> {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add card</Text>
          <PaymentForm buttonTitle="Add Card" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  modalContent: {
    height: 300,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "rgba(0, 0, 0, 0.5)"
  }
});
