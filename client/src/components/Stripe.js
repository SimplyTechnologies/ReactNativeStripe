import React, { Component } from "react";
import { View, Button, StryleSheet } from "react-native";
import PropTypes from "prop-types";
import Stripe, { PaymentCardTextField } from "tipsi-stripe";

// TODO: Flowify everything
export class Stripe extends Component {
  static propTypes = {};
  
  state = {
      isValid: false,
      params: null
  };

  fieldParamsChangedHandler = (isValid, params) => {
      this.setState({ isValid, params });
  }

  payButtonPressedHandler = () => {
    const { isValid, params } = this.state;
    if(isValid) {
      Stripe.createTokenWithCard(params).then(res=>{
        const { tokenId } = res;
        console.log(tokenId);
        fetch('http://localhost:3000/card/pay', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tokenId })
        }).then(res => {
          return res.json()
        }).then(res => {
          this.setState({ notification: res.msg });
        }).catch(err=>{
          this.setState({ notification: err.message });
        })
      }).catch(err=>{
        console.log(err)
      })
    }
  }

  render() {
      return (
          <View>
              <PaymentCardTextField
                style={styles.cardTextField}
                onParamsChange={this.fieldParamsChangedHandler}
              />
              <Button
                title="Pay"
                onPress={this.payButtonPressedHandler}
                style={styles.payButon}
                color="black"
              />
          </View>
      );
  }
}

const styles = StyleSheet.create({
  cardTextField: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  },
  payButon: {
    width: 100
  }
})
