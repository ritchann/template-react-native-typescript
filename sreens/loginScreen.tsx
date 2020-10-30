import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { getDataAsync, setBuildingSite } from "../data/actions";
import { Autocomplete, AutocompleteItem, Button } from "@ui-kitten/components";
import { buildingSites } from "./data";
import * as Location from "expo-location";
import { BuildingSite } from "../data/model";

export const LoginScreen = () => {
  const buildingSite = useSelector(
    (state: StoreType) => state.data.buildingSite
  );

  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [data, setData] = useState(buildingSites);

  const click = useCallback(() => {
    dispatch(getDataAsync());
  }, [dispatch, getDataAsync]);

  const onChangeText = useCallback((newValue: string) => {
    setValue(newValue);
    setData(data.filter((x) => x.address.includes(newValue)));
    if (newValue === "") setData(buildingSites);
  }, []);

  const [location, setLocation] = useState<{ lat: number; lon: number }>({
    lat: 0,
    lon: 0,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    if (location) console.log(location);
  }, [location]);

  useEffect(() => {
    if (location.lat !== 0 && location.lon !== 0) {
      const first: BuildingSite[] = [];
      let minLat = 10000,
        minLon = 10000;
      buildingSites.forEach((item) => {
        if (
          Math.abs(item.lat - location.lat) < minLat &&
          Math.abs(item.lon - location.lon) < minLon
        ) {
          minLat = Math.abs(item.lat - location.lat);
          minLon = Math.abs(item.lon - location.lon);
          first.unshift(item);
        } else first.push(item);
      });
      setData(first);
      dispatch(setBuildingSite(first?.[0]));
    }
  }, [location, buildingSites]);

  const onSelect = useCallback(
    (index: number) => {
      dispatch(setBuildingSite(data[index]));
      setValue(data[index].address);
      const newData = data.filter((x) => x.id !== data[index].id);
      newData.unshift(data[index]);
      setData(newData);
      console.log("data ", data);
    },
    [data]
  );

  return (
    <View style={styles.container}>
      <View>
        <Autocomplete
          style={styles.input}
          placeholder="Введите адрес строительной площадки"
          value={value}
          onSelect={onSelect}
          onChangeText={onChangeText}
        >
          {data.map((item) => (
            <AutocompleteItem key={item.id} title={item.address} />
          ))}
        </Autocomplete>
        <FlatList
          style={styles.flatList}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => dispatch(setBuildingSite(item))}
              style={styles.site}
              key={item.id}
            >
              <ImageBackground
                style={[
                  styles.image,
                  buildingSite.id === item.id
                    ? styles.selectedSite
                    : styles.image,
                ]}
                source={{
                  uri:
                    "https://www.business-class.su/uploads/material/42/45/84/424584729b7b143abc62ef430fc040fc.jpg",
                }}
              >
                <View style={styles.itemTextImage}>
                  <Text style={styles.imageText}>{item.address}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          horizontal
        />
      </View>
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
