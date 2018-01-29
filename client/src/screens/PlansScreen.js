// @flow

import React, { Component } from "react";
import { Text } from "react-native";
import { initializeEvents } from "AppNavigation";

type Props = {
  navigator: any
};

type State = {};

export class PlansScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { navigator } = props;
    initializeEvents(navigator);
  }

  render() {
    return <Text>first</Text>;
  }
}
