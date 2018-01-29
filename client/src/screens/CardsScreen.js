// @flow
import React, { Component } from "react";
import { Text } from "react-native";
import { InitEventHandlers } from "AppProviders";

type Props = {
  navigator: any
};

type State = {};

class CardsScreen extends Component<Props, State> {
  render() {
    return <Text>Second</Text>;
  }
}

export const WithEventHandlers = InitEventHandlers(CardsScreen);
