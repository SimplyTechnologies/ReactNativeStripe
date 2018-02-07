// @flow
import React, { Component } from "react";
import { Dimensions, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  itemTitle: string,
  handleButtonPress: Function
};

const { height } = Dimensions.get("window");
const offsetY = -1 * height;

export const FloatingButton = ({ itemTitle, handleButtonPress }) => (
  <ActionButton
    buttonColor="rgba(231,76,60,1)"
    offsetX={10}
    offsetY={10}
    // style={{ position: "relative" }}
  >
    <ActionButton.Item
      buttonColor="#1abc9c"
      title={itemTitle}
      onPress={handleButtonPress}
    >
      <Icon name="md-create" style={styles.actionButtonIcon} />
    </ActionButton.Item>
  </ActionButton>
);

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
