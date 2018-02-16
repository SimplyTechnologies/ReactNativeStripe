// @flow
import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  filtersMap: Object,
  selectedFilter: string
};

type State = {};

export class Filter extends Component<Props, State> {
  renderFiltersMap = () => {
    const { filtersMap, selectedFilter } = this.props;
    const filters = Object.keys(filtersMap);
    return filters.map((filter, index) => {
      const filterHandler = filtersMap[filter];
      const filterStyle =
        filter === selectedFilter ? styles.selectedFilter : styles.filter;
      const textStyle =
        filter === selectedFilter ? styles.selectedText : styles.text;
      return (
        <TouchableOpacity
          key={index}
          style={filterStyle}
          onPress={filterHandler}
        >
          <Text style={textStyle}>{filter}</Text>
        </TouchableOpacity>
      );
    });
  };

  render() {
    return <View style={styles.container}>{this.renderFiltersMap()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  filter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#C4CBB7"
  },
  text: {},
  selectedFilter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#C4CBB7",
    backgroundColor: "#7ABA71"
  },
  selectedText: {
    color: "white"
  }
});
