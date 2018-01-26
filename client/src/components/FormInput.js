// @flow
import React from "react";
import type { Element } from "react";
import { View, TextInput, Text } from "react-native";

type Props = {
  value: string,
  placeholder: string,
  handleChange: Function,
  validationMessage: string
};

export const FormInput = ({
  value,
  placeholder,
  handleChange,
  validationMessage
}: Props): Element<*> => (
  <View>
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={handleChange}
    />
    <Text>{validationMessage}</Text>
  </View>
);
