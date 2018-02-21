// @flow
import React, { Component } from "react";
import type { ComponentType } from "react";
import { initializeEvents } from "AppNavigation";

export const InitEventHandlers = (
  WrappedComponent: ComponentType<*>
): ComponentType<*> => {
  type Props = {
    navigator: any
  };

  type State = {};

  class Wrapper extends Component<Props, State> {
    constructor(props: Props) {
      super(props);
      const { navigator } = this.props;
      initializeEvents(navigator);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return Wrapper;
};
