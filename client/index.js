// import { AppRegistry } from 'react-native';
// import App from './App';

// AppRegistry.registerComponent('stripeProject', () => App);

// @flow
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";
import { PaymentForm } from "AppComponents";
import { stripeUtils } from "AppUtils";
import { initializeScreens } from "AppNavigation";

initializeScreens();

Navigation.startTabBasedApp({
  tabs: [
    {
      label: "One",
      screen: "stripe.First",
      title: "Screen One"
    },
    {
      label: "Two",
      screen: "stripe.Second",
      title: "Screen Two"
    }
  ]
});

// export default class App extends Component {
//   componentWillMount() {
//     // initialize Stripe before app rendering
//     stripeUtils.initializeStripe();
//   }

//   render() {
//     return <PaymentForm />;
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
