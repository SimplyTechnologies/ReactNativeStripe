// @flow

import React, { Component } from "react";
import { Text } from "react-native";
import { NavigatorEventHandlers } from "AppNavigation";

type Props = {
  navigator: any
};

export class CardsScreen extends Component<Props> {
  renderHandler = (): any => <Text>Second</Text>;
  render() {
    return (
      <NavigatorEventHandlers
        render={this.renderHandler}
        navigator={this.props.navigator}
      />
    );
  }
}
