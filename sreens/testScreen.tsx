import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

export const TestScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{"Test"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonLogin: {},
  flatList: {
    marginTop: 60,
    maxHeight: 400,
    padding: 4,
  },
  site: {
    margin: 4,
    width: 250,
    borderRadius: 10,
    elevation: 4,
    borderColor: "black",
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.5,
    flex: 1,
    justifyContent: "flex-start",
    shadowRadius: 2,
    borderRadius: 20 / 2,
    overflow: "hidden",
  },
  imageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    opacity: 5,
    textDecorationColor: "black",
  },
  itemTextImage: {
    flex: 1,
    alignItems: "center",
    minHeight: 100,
  },
  selectedSite: {
    borderWidth: 2.5,
    borderColor: "#3366ff",
    borderRadius: 10,
  },
  input: {
    paddingTop: 70,
    padding: 10,
  },
});
