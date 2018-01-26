// @flow
import React from "react";
import type { Element } from "react";
import { View, TextInput, Text } from "react-native";

type Props = {
  value: string,
  placeholder: string,
  handleChange: Function,
  validationMessage: string,
  autoFocus: ?boolean
};

export const FormInput = ({
  value,
  placeholder,
  handleChange,
  validationMessage,
  autoFocus
}: Props): Element<*> => (
  <View>
    <TextInput
      autoFocus={autoFocus}
      value={value}
      placeholder={placeholder}
      onChangeText={handleChange}
      autoCapitalize="none"
    />
    <Text>{validationMessage}</Text>
  </View>
);
