// @flow
import React, { Component } from "react";

type Props = {
  navigator: any,
  render: Function
};

type State = {};

export class NagiatorEventProvider extends Component<Props, State> {
  setNavigationEvent = (onNavigatorEvent: Function) => {
    const { navigator } = this.props;
    navigator.setOnNavigatorEvent(onNavigatorEvent);
  };

  render() {
    const { render } = this.props;
    return render(this.setNavigationEvent);
  }
}
