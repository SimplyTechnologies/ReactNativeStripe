// @flow

import React, { Component } from "react";
import { Text } from "react-native";
import { InitEventHandlers } from "AppProviders";

type Props = {
  navigator: any
};

type State = {};

class WrappedPlansScreen extends Component<Props, State> {
  render() {
    return <Text>first</Text>;
  }
}

export const PlansScreen = InitEventHandlers(WrappedPlansScreen);
