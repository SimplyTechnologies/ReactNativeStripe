// @flow
import { eventHandlers } from "AppNavigation";

export const initializeEvents = (navigation: any) => {
  navigation.setOnNavigatorEvent(eventHandlers);
};
