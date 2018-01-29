// @flow

import React, { Component } from "react";
import { Text } from "react-native";
import { NavigatorEventHandlers } from "AppNavigation";

type Props = {
  navigator: any
};

export class PlansScreen extends Component<Props> {
  renderHandler() {
    return <Text>first</Text>;
  }
  render() {
    return (
      <NavigatorEventHandlers
        render={this.renderHandler}
        navigator={this.props.navigator}
      />
    );
  }
}
