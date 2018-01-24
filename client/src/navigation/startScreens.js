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

export const startLoginScreen = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: LOGIN_SCREEN,
      title: LOGIN_SCREEN_TITLE
    }
  });
};

export const startApp = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: CARDS_SCREEN_TITLE,
        screen: CARDS_SCREEN,
        title: CARDS_SCREEN_TITLE,
        icon: require("../img/card.png")
      },
      {
        label: PLANS_SCREEN_TITLE,
        screen: PLANS_SCREEN,
        title: PLANS_SCREEN_TITLE,
        icon: require("../img/card.png")
      },
      {
        label: PAYMENT_SCREEN_TITLE,
        screen: PAYMENT_SCREEN,
        title: PAYMENT_SCREEN_TITLE,
        icon: require("../img/product.png")
      }
    ]
  });
};
