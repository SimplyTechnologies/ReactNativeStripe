// @flow
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

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
        <View style={styles.container}>
          <Spinner
            visible={visible}
            textContent=""
            size="large"
            textStyle={styles.textStyle}
          />
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
    flex: 1
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  textStyle: {
    color: "#FFF"
  }
});
