/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { PaymentCardTextField } from 'tipsi-stripe';
import React, { Component } from 'react';
import stripe from 'tipsi-stripe';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';



export default class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello world</Text>
      </View>
    );
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
