// @flow
import React, { Component } from "react";
import { View } from "react-native";
import Toast from "react-native-root-toast";

type Props = {
  children: Function
};

type State = {
  isVisible: boolean
};

export class ToastProvider extends Component<Props, State> {
  state = {
    isVisible: false
  };
  TOAST_POSITION = 50;
  TOAST_SHADOW = false;
  TOAST_ANIMATION = true;
  TOAST_HIDE_ON_PRESS = true;

  show = () => this.setState({ isVisible: true });

  hide = () => this.setState({ isVisible: false });

  render() {
    const { children } = this.props;
    const showToast = this.show;
    const hideToast = this.hide;
    return (
      <View>
        <Toast
          position={this.TOAST_POSITION}
          shadow={this.TOAST_SHADOW}
          animation={this.TOAST_ANIMATION}
          hideOnPress={this.TOAST_HIDE_ON_PRESS}
        />
        {children({ showToast, hideToast })}
      </View>
    );
  }
}
