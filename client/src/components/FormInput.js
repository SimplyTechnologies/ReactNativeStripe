// @flow
import React from "react";
import type { Element } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

type Props = {
  value: string,
  placeholder: string,
  handleChange: Function,
  validationMessage: string,
  autoFocus: ?boolean,
  secureTextEntry: ?boolean
};

export const FormInput = ({
  value,
  placeholder,
  handleChange,
  validationMessage,
  autoFocus,
  secureTextEntry
}: Props): Element<*> => (
  <View>
    <TextInput
      autoFocus={autoFocus}
      value={value}
      placeholder={placeholder}
      onChangeText={handleChange}
      autoCorrect={false}
      autoCapitalize="none"
      secureTextEntry={secureTextEntry}
    />
    <Text>{validationMessage || " "}</Text>
  </View>
);
