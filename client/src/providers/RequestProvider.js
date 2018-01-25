// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { fetchUtils } from "AppUtils";
import type { CallbackMap } from "AppTypes";

type Props = {
  render: Function,
  requestProxyMap: Object,
  callbackMap: Object
};

type State = {};

export class RequestProvider extends Component<Props, State> {
  handleRequest(...data: any) {
    const { requestHandler } = fetchUtils;
    const request = this.requestProxy(...data);

    requestHandler(request, this.callback);
  }

  render() {
    const { requestProxyMap, callbackMap } = this.props;
    const args = Object.keys(requestProxyMap).map((key: string): any =>
      this.handleRequest.bind({
        callback: callbackMap[key],
        requestProxy: requestProxyMap[key]
      })
    );
    return this.props.render(...args);
  }
}
