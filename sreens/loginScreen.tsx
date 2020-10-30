import React, { useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { getDataAsync } from "../data/actions";
import { Button } from "@ui-kitten/components";

export const LoginScreen = () => {
  const data = useSelector((state: StoreType) => state.data.data);

  const dispatch = useDispatch();

  const click = useCallback(() => {
    dispatch(getDataAsync());
  }, [dispatch, getDataAsync]);

  useMemo(() => {
    console.log(data);
  }, [data]);

  const buildingSites = [
    { id: 0, address: "Мира 5" },
    { id: 1, address: "Ленина 5" },
    { id: 2, address: "Горького 5" },
    { id: 3, address: "Родионова 5" },
    { id: 4, address: "Карла Маркса 5" },
    { id: 5, address: "Родионова 5" },
    { id: 6, address: "Карла Маркса 5" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={buildingSites}
        renderItem={({ item }) => (
          <View style={styles.site} key={item.id}>
            <ImageBackground
              style={styles.image}
              source={{
                uri:
                  "https://www.business-class.su/uploads/material/42/45/84/424584729b7b143abc62ef430fc040fc.jpg",
              }}
            >
              <View style={styles.itemTextImage}>
                <Text style={styles.imageText}>{item.address}</Text>
              </View>
            </ImageBackground>
          </View>
        )}
        horizontal
      />
      <Button style={styles.buttonLogin} onPress={click}>
        {"Начать смену"}
      </Button>
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
    marginTop: 100,
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
});
