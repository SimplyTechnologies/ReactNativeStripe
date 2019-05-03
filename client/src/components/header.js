// @flow

import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { startApp } from "AppNavigation";

const handleLogout = () => {
  AsyncStorage.removeItem("token").then(startApp);
};

export function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.link}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10,
    backgroundColor: "#3c78df",
    height: 50
  },
  link: {
    color: "white"
  }
});
