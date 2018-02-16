// @flow
import { AsyncStorage } from "react-native";
import { Navigation } from "react-native-navigation";
import {
  CARDS_SCREEN,
  PLANS_SCREEN,
  PAYMENT_SCREEN,
  LOGIN_SCREEN,
  CARDS_SCREEN_TITLE,
  PLANS_SCREEN_TITLE,
  PAYMENT_SCREEN_TITLE,
  LOGIN_SCREEN_TITLE
} from "./constants";
import { initializeScreens } from "./initializeScreens";

initializeScreens();

const navigatorButtons = {
  rightButtons: [
    {
      title: "logout",
      id: "logout"
    }
  ]
};

const startLoginScreen = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: LOGIN_SCREEN,
      title: LOGIN_SCREEN_TITLE
    }
  });
};

const startDashboardScreen = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: CARDS_SCREEN_TITLE,
        screen: CARDS_SCREEN,
        title: CARDS_SCREEN_TITLE,
        icon: require("../img/card.png"),
        navigatorButtons
      },
      {
        label: PLANS_SCREEN_TITLE,
        screen: PLANS_SCREEN,
        title: PLANS_SCREEN_TITLE,
        icon: require("../img/plan.png"),
        navigatorButtons
      },
      {
        label: PAYMENT_SCREEN_TITLE,
        screen: PAYMENT_SCREEN,
        title: PAYMENT_SCREEN_TITLE,
        icon: require("../img/product.png"),
        navigatorButtons
      }
    ]
  });
};

export const startApp = () => {
  AsyncStorage.getItem("token").then((token: string | null) => {
    if (token) {
      startDashboardScreen();
    } else {
      startLoginScreen();
    }
  });
};
