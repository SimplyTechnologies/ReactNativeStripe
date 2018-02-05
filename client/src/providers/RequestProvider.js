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
      return this.handleMapProxy();
    }
    if (requestProxy instanceof Function) {
      return this.handleFunctionProxy;
    }
  };

  generateRequestHandler = (proxy: any, callbacks: any): Function => (
    ...data: any
  ) => {
    const { requestHandler } = fetchUtils;
    const request = proxy(...data);
    requestHandler(request, callbacks);
  };

  handleMapProxy = (): any => {
    const { requestProxy } = this.props;
    const handlersMap = {};
    for (const [proxy, callbacks] of requestProxy) {
      const proxyName = proxy.name;
      handlersMap[proxyName] = this.generateRequestHandler(proxy, callbacks);
    }
    return handlersMap;
  };

  handleFunctionProxy = (...data: any) => {
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
