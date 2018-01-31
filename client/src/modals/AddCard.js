// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PaymentForm } from "AppComponents";

type Props = {};

type State = {};

export class AddCard extends Component<Props, State> {
  state = {};
  render() {
    return (
      <View style={styles.modalContainer}>
        <PaymentForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 200,
    height: 500
  }
});
