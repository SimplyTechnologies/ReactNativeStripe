import React from "react";
import { Navigation } from "react-native-navigation";
import * as ScreenNames from "./constants";
import { FirstScreen } from "./FirstScreen";
import { SecondScreen } from "./SecondScreen";
// !!!this is temporary!!!
const Screens = {
  FirstScreen,
  SecondScreen
};

export const initializeScreens = () => {
  const keys = Object.keys(ScreenNames);
  keys.forEach(key => {
    const name = ScreenNames[key];
    const Screen = Screens[name];
    Navigation.registerComponent(name, () => Screen);
  });
};
