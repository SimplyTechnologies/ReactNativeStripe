import React, { Component } from "react";
import { Text } from "react-native";
import withEventHandlers from "./withEventHandlers";

@withEventHandlers
export class CardsScreen extends Component {
  render() {
    return <Text>Second</Text>;
  }
}
