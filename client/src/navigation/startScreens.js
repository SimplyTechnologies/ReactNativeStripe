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

const startLoginScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: LOGIN_SCREEN
            }
          }
        ],
        options: {
          topBar: {
            title: {
              text: LOGIN_SCREEN_TITLE
            }
          }
        }
      }
    }
  });
};

const startDashboardScreen = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: "BottomTabsId",
        children: [
          {
            component: {
              name: CARDS_SCREEN,
              options: {
                bottomTab: {
                  fontSize: 12,
                  selectedIconColor: "#D34712",
                  text: CARDS_SCREEN_TITLE,
                  icon: require("../img/card.png")
                }
              }
            }
          },
          {
            component: {
              name: PLANS_SCREEN,
              options: {
                topBar: {
                  visible: true,
                  title: {
                    text: "dsds"
                  }
                },
                bottomTab: {
                  text: PLANS_SCREEN_TITLE,
                  fontSize: 12,
                  selectedIconColor: "#D34712",
                  icon: require("../img/plan.png"),
                }
              }
            }
          },
          {
            component: {
              name: PAYMENT_SCREEN,
              options: {
                bottomTab: {
                  text: PAYMENT_SCREEN_TITLE,
                  fontSize: 12,
                  selectedIconColor: "#D34712",
                  icon: require("../img/product.png"),
                }
              }
            }
          }
        ]
      }
    }
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
