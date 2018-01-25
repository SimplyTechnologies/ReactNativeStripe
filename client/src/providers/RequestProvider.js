// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { fetchUtils } from "AppUtils";
import type { CallbackMap } from "AppTypes";

type Props = {
  render: Function,
  requestProxy: Function,
  callbackMap: Object
};

type State = {};

export class RequestProvider extends Component<Props, State> {
  handleRequest(...data: any) {
    const { requestProxy, callbackMap } = this.props;
    const { requestHandler } = fetchUtils;
    const request = requestProxy(...data);
    requestHandler(request, callbackMap);
  }

  render() {
    return this.props.render(this.handleRequest);
  }
}
