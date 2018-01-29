import React, { Component } from "react";
import { Text } from "react-native";
import { withEventHandlers } from "../navigation/withEventHandlers";

// @withEventHandlers
class Plans extends Component {
  render() {
    return <Text>First</Text>;
  }
}

export const PlansScreen = withEventHandlers(Plans);
