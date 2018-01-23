import { Navigation } from "react-native-navigation";
import {
  CARDS_SCREEN,
  PLANS_SCREEN,
  CARDS_SCREEN_TITLE,
  PLANS_SCREEN_TITLE
} from "./constants";
import { initializeScreens } from "./initializeScreens";

initializeScreens();

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
        icon: require("../img/plan.png")
      }
    ]
  });
};
