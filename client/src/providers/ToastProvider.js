// @flow
import React, { Component } from "react";
import { View } from "react-native";
import Toast from "react-native-root-toast";

type Props = {
  children: Function
};

type State = {
  isVisible: boolean,
  message: string
};

export class ToastProvider extends Component<Props, State> {
  state = {
    isVisible: false,
    message: ""
  };
  TOAST_POSITION = Toast.positions.bottom;
  TOAST_SHADOW = false;
  TOAST_HIDE_ON_PRESS = true;

  show = (message: string) =>
    this.setState({ isVisible: true, message }, this.showCallback);

  hide = () => this.setState({ isVisible: false, message: "" });

  showCallback = () => setTimeout(() => this.hide(), 5000);

  render() {
    const { children } = this.props;
    const { isVisible, message } = this.state;
    const showToast = this.show;
    const hideToast = this.hide;
    return (
      <View>
        <Toast
          visible={isVisible}
          position={this.TOAST_POSITION}
          shadow={this.TOAST_SHADOW}
          animation={isVisible}
          hideOnPress={this.TOAST_HIDE_ON_PRESS}
        >
          {message}
        </Toast>
        {children({ showToast, hideToast })}
      </View>
    );
  }
}
