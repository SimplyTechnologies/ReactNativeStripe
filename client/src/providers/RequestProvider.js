// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { requestHandler } from "AppUtils";
import type { CallbackMap } from "AppTypes";

type Props = {
  callbackMap: CallbackMap,
  requestProxy: Function,
  render: Function
};

type State = {};

export class RequestProvider extends Component<Props, State> {
  handleRequest = data => {
    const { callbackMap, requestProxy } = this.props;
    const request = requestProxy(data);
    requestHandler(request, callbackMap);
  };

  render() {
    return this.props.render(this.handleRequest);
  }
}
