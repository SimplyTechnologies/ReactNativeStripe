import React from "react";
import { Navigation } from "react-native-navigation";
import * as ScreenNames from "./constants";
import { CardsScreen } from "./CardsScreen";
import { PlansScreen } from "./PlansScreen";
// !!!this is temporary!!!
const Screens = {
  CardsScreen,
  PlansScreen
};

export const initializeScreens = () => {
  const keys = Object.keys(ScreenNames);
  keys.forEach(key => {
    const name = ScreenNames[key];
    const screenName = name.replace(/app\./, "");
    const ScreenComponent = Screens[screenName];
    Navigation.registerComponent(name, () => ScreenComponent);
  });
};
