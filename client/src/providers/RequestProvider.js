// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { fetchUtils } from "AppUtils";
import type { CallbackMap } from "AppTypes";

type Props = {
  render: Function,
  requestProxy: Function | Map<Function, Object>,
  callbackMap: Object
};

export class RequestProvider extends Component<Props> {
  getRequestHandler = (): Function | void => {
    const { requestProxy } = this.props;
    if (requestProxy instanceof Map) {
      return this.handleMapProxy;
    }
    if (requestProxy instanceof Function) {
      return this.handleFunctionProxy;
    }
  };

  handleMapProxy = (): any => {
    const { requestProxy } = this.props;
    const { requestHandler } = fetchUtils;
    const handlersMap = {};
    for (const [proxy, callbacks] of requestProxy) {
      const proxyName = proxy.name;
      handlersMap[proxyName] = (...data) => {
        const request = proxy(...data);
        requestHandler(request, callbacks);
      };
    }
    return handlersMap;
  };

  handleFunctionProxy = (...data) => {
    const { requestProxy, callbackMap } = this.props;
    const { requestHandler } = fetchUtils;
    const request = requestProxy(...data);
    requestHandler(request, callbackMap);
  };

  render() {
    const { render } = this.props;
    const requestHandler = this.getRequestHandler();
    return render(requestHandler);
  }
}
