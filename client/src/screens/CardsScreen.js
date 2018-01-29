// @flow

import React, { Component } from "react";
import { Text } from "react-native";
import { withEventHandlers } from "../navigation/withEventHandlers";

class Cards extends Component<void> {
  render() {
    return <Text>Second</Text>;
  }
}

export const CardsScreen = withEventHandlers(Cards);
