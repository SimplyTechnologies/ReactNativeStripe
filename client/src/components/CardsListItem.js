// @flow

import React, { Component, Fragment } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { RequestProvider } from "AppProviders";
import { deleteCard } from "AppProxies";
import { ResponseStatuses } from "AppConstants";
import type { Card } from "../types";

const { STATUS_OK } = ResponseStatuses;

type Props = {
  card: Card,
  removeDeletedCard: Function
};
type State = {
  loading: boolean
};

export class CardsListItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false
    };
    this.initializeCallbacks();
  }

  callbackMap: Object;

  initializeCallbacks = () => {
    const { removeDeletedCard } = this.props;
    const handleOk = (data: any) => {
      removeDeletedCard(data);
    };
    this.callbackMap = {
      [STATUS_OK]: handleOk
    };
  };
  renderRequestProvider = (handleRequest: Function): any => {
    const { last4, id } = this.props.card;
    const { loading } = this.state;
    const deleteButtonPressedHandler = () => {
      this.setState({ loading: true }, () => {
        handleRequest(id);
      });
    };
    return (
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Text>{last4}</Text>
            <TouchableOpacity onPress={deleteButtonPressedHandler}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  render() {
    return (
      <RequestProvider
        render={this.renderRequestProvider}
        requestProxy={deleteCard}
        callbackMap={this.callbackMap}
      />
    );
  }
}
