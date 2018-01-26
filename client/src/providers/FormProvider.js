// @flow
import React, { Component } from "react";
import { View } from "react-native";

type Props = {
  context: any
};

type State = {};

export class FormProvider extends Component {
  constructor(props) {
    super(props);
    this.context = props.context;
  }

  hasValidationErrors = (): boolean => {
    const { validations } = this.context.state;
    const keys = Object.keys(validations);
    let hasError = false;
    keys.forEach((key: string) => {
      // hasError should be true if at least one field is invalid
      const isError = validations[key].length > 0;
      hasError = hasError || isError;
    });
    return hasError;
  };

  render() {
    return <div />;
  }
}
