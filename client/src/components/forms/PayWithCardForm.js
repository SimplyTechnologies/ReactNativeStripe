// @flow

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Select, Option } from "react-native-chooser";
import { Loading } from "AppComponents";
import { PaymentButton } from "AppButtons";
import type { Card } from "AppCards";

type Props = {
  payWithCard: () => Function,
  payCallbackMap: Object,
  getCardsCallbackMap: Object,
  cards: Array<Card>,
  message: string,
  getCards: () => Function
};

type State = {
  label: string,
  value: string
};

export class PayWithCardForm extends Component<Props, State> {
  state = {
    label: "Select Me Please",
    value: ""
  };

  componentDidMount() {
    const { getCards, getCardsCallbackMap } = this.props;
    getCards()(getCardsCallbackMap);
  }

  onSelect = (value: string, label: string) => {
    this.setState({ label, value });
  };

  payButtonPressedHandler = () => {
    const { payWithCard, payCallbackMap } = this.props;
    const { value } = this.state;
    if (value) {
      payWithCard(value)(payCallbackMap);
    }
  };

  renderOptions(): Array<Option> {
    const { cards } = this.props;
    return cards.map((card: Card): Option => {
      const { id, last4, exp_month: month, exp_year: year } = card;
      const cardInfo = `...${last4}  ${month}${year}`;
      return (
        <Option value={id} key={id}>
          {cardInfo}
        </Option>
      );
    });
  }

  render() {
    const { message, cards } = this.props;
    return cards ? (
      <View style={styles.container}>
        <Text style={styles.title}>Pay wtih selected card</Text>
        <View style={styles.selectBox}>
          <Select
            onSelect={this.onSelect}
            defaultText={this.state.label}
            style={{ borderWidth: 2, borderColor: "green" }}
            backdropStyle={{ backgroundColor: "#d3d5d6" }}
            optionListStyle={{ backgroundColor: "#F5FCFF" }}
          >
            {this.renderOptions()}
          </Select>
        </View>
        <Text>{message}</Text>
        <PaymentButton payButtonPressedHandler={this.payButtonPressedHandler} />
      </View>
    ) : (
      <Loading />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center"
  },
  title: {
    fontSize: 25,
    marginTop: 10
  },
  selectBox: {
    marginTop: 20,
    marginBottom: 20
  }
});
