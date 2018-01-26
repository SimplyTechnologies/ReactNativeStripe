// @flow

import React, { Component } from "react";
import type { ComponentType } from "react";
import { AsyncStorage } from "react-native";
import { startApp } from "AppNavigation";

const withEventHandlers = <PropsInput: {}, PropsOutput: {}>(
  PassedComponent: ComponentType<PropsOutput>
): ComponentType<PropsInput> =>
  class WithEventHandlers extends Component<PropsInput> {
    constructor(props: PropsInput) {
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
      return <PassedComponent {...this.props} />;
    }
  };

export default withEventHandlers;
