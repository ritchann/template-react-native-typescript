import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { getDataAsync } from "../data/actions";

export const Main = () => {
  const data = useSelector((state: StoreType) => state.data.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataAsync());
  }, [getDataAsync]);

  useMemo(() => {
    console.log(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <Text>{"Добрый вечер"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
