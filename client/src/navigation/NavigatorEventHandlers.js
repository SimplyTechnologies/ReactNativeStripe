// @flow

import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { startApp } from "AppNavigation";

type Props = {
  navigator: any,
  render: Function
};

export class NavigatorEventHandlers extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent(event: { id: string }) {
    if (event.id === "logout") {
      AsyncStorage.removeItem("token");
      startApp();
    }
  }
  render() {
    return this.props.render();
  }
}
