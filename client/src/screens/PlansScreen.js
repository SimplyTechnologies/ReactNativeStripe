// @flow

import React, { Component } from "react";
import { Text } from "react-native";
import { InitEventHandlers } from "AppProviders";

type Props = {
  navigator: any
};

type State = {};

class PlansScreen extends Component<Props, State> {
  render() {
    return <Text>first</Text>;
  }
}

export const WithEventHandlers = InitEventHandlers(PlansScreen);
