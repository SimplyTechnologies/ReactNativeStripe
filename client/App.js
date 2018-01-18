/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { PaymentCardTextField } from 'tipsi-stripe';
import React, { Component } from 'react';
import stripe from 'tipsi-stripe';
import { StyleSheet } from "react-native";
import { PaymentForm } from "AppComponents";
import { stripeUtils } from "AppUtils";

export default class App extends Component {

  componentWillMount() {
    //initialize Stripe before app rendering
    stripeUtils.initializeStripe();
  }

  render() {
    return <PaymentForm/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
