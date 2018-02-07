// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { fetchUtils } from "AppUtils";
import type { CallbackMap } from "AppTypes";

type Props = {
  render: Function,
  requestProxy: Function | Map<Function, Object>
};

export class RequestProvider extends Component<Props> {
  getRequestHandler = (): Function | void => {
    const { requestProxy } = this.props;
    const proxyType = typeof requestProxy;
    if (proxyType === "object") {
      return this.handleMapProxy();
    }
    if (proxyType === "function") {
      return this.handleFunctionProxy;
    }
  };

  generateRequestHandler = (proxy: any): Function => (...data: any) => (
    callbacks: any
  ) => {
    const { requestHandler } = fetchUtils;
    const request = proxy(...data);
    requestHandler(request, callbacks);
  };

  handleMapProxy = (): any => {
    const { requestProxy } = this.props; // this is a REFERENCE type
    const keys = Object.keys(requestProxy);
    const handlersMap = {};
    keys.forEach(
      (key: string) =>
        (handlersMap[key] = this.generateRequestHandler(requestProxy[key]))
    );
    return handlersMap;
  };

  handleFunctionProxy = (...data: any) => (callbackMap: any) => {
    const { requestProxy } = this.props;
    const requestHandler = this.generateRequestHandler(requestProxy);
    requestHandler(...data)(callbackMap);
  };

  render() {
    const { render } = this.props;
    const requestHandler = this.getRequestHandler();
    return render(requestHandler);
  }
}
