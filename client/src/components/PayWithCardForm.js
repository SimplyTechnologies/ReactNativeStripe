// @flow

import React, { Component } from "react";
import { View, Text } from "react-native";

type Props = {
  style: Object
};

export const PayWithCardForm = (props: Props): any => (
  <View style={props.style}>
    <Text>Pay wtih card</Text>
  </View>
);
