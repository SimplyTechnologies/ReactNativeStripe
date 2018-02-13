import React from "react";
import { Navigation } from "react-native-navigation";
import * as Screens from "AppScreens";
import * as ScreenNames from "./constants";

export const initializeScreens = () => {
  const keys = Object.keys(ScreenNames);
  keys.forEach(key => {
    const name = ScreenNames[key];
    const screenName = name.replace(/app\./, "");
    const ScreenComponent = Screens[screenName];
    Navigation.registerComponent(name, () => ScreenComponent);
  });
};
