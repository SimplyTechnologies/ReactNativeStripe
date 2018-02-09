// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { PlansList, Loading } from "AppComponents";
import { ResponseStatuses } from "AppConstants";

type Props = {
  getPlans: Function
};

type State = {
  plans: any
};

const { STATUS_OK } = ResponseStatuses;

export class PlansContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      plans: null
    };
    this.callbacks = {};
    this.initializeGetPlansCallbacks();
  }
  state = {
    plans: null
  };

  componentDidMount() {
    const { getPlans } = this.props;
    const { getPlans: getPlansCallbacks } = this.callbacks;
    getPlans()(getPlansCallbacks);
  }

  initializeGetPlansCallbacks = () => {
    const handleOk = (plans: any) => this.setState({ plans });
    const callbackMap = {
      [STATUS_OK]: handleOk
    };
    this.callbacks.getPlans = callbackMap;
  };

  render() {
    const { plans } = this.state;
    return plans ? <PlansList plans={plans} /> : <Loading />;
  }
}
