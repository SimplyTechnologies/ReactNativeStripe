import React, { Component } from "react";
import { Text } from "react-native";
import withEventHandlers from "./withEventHandlers";

@withEventHandlers
export class PlansScreen extends Component {
  render() {
    return <Text>First</Text>;
  }
}
