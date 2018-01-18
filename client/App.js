/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { PaymentCardTextField } from 'tipsi-stripe';
import React, { Component } from 'react';
import stripe from 'tipsi-stripe';
import { StyleSheet } from "react-native";
import App from "./src";

export default class App extends Component {
  render() {
    return <App />;
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
