// @flow
import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

type Props = {};

type State = {
  visible: boolean
};

export const SpinnerProvider = (WrappedComponent: any): any => {
  class Wrapper extends Component<Props, State> {
    state = { visible: false };

    show = () => this.setState({ visible: true });

    hide = () => this.setState({ visible: false });

    render() {
      const { visible } = this.state;
      return (
        <View>
          {visible ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          <WrappedComponent
            showSpinner={this.show}
            hideSpinner={this.hide}
            {...this.props}
          />
        </View>
      );
    }
  }

  return Wrapper;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
