import React, { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { getDataAsync } from "../data/actions";
import { Button } from "@ui-kitten/components";

export const Main = () => {
  const data = useSelector((state: StoreType) => state.data.data);

  const dispatch = useDispatch();

  const click = useCallback(() => {
    dispatch(getDataAsync());
  }, [dispatch, getDataAsync]);

  useMemo(() => {
    console.log(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <Button onPress={click}>{"BUTTON"}</Button>
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
