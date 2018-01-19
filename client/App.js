// @flow
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { PaymentForm } from "AppComponents";
import { stripeUtils } from "AppUtils";

const ff = (): string => 1;
ff();
export default class App extends Component {
  componentWillMount() {
    // initialize Stripe before app rendering
    stripeUtils.initializeStripe();
  }

  render() {
    return <PaymentForm />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
