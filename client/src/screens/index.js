/**
 * @providesModule AppNavigation
 */

import { Navigation } from "react-native-navigation";

import { FirstScreen } from "./FirstScreen";
import { SecondScreen } from "./SecondScreen";

export const initializeScreens = () => {
  console.log("CALLED");
  Navigation.registerComponent("stripe.First", () => FirstScreen);
  Navigation.registerComponent("stripe.Second", () => SecondScreen);
};
