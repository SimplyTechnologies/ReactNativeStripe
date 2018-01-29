// @flow
import { AsyncStorage } from "react-native";
import { startApp } from "AppNavigation";

const logoutEvent = () => {
  AsyncStorage.removeItem("token").then(startApp);
};

export const eventHandlers = ({ id }: { id: string }) => {
  switch (id) {
    case "logout":
      logoutEvent();
      break;
    default:
      break;
  }
};
