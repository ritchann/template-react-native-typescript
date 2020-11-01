import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import {
  getDataAsync,
  setBuildingSite,
  setIsStarted,
  setPositionAsync,
  setSiteEventAsync,
} from "../data/actions";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  Text,
  Modal,
} from "@ui-kitten/components";
import { buildingSites } from "./data";
import * as Location from "expo-location";
import { BuildingSite, Profile } from "../data/model";
import { THEME } from "../data/constants";
import { setSiteEvent } from "../data/api";

export const LoginScreen = () => {
  const buildingSite = useSelector(
    (state: StoreType) => state.data.buildingSite
  );

  const dispatch = useDispatch();
  const profile: Profile = useSelector(
    (state: StoreType) => state.data.profile
  );
  const isStarted = useSelector((state: StoreType) => state.data.isStarted);

  const [value, setValue] = useState("");
  const [data, setData] = useState(buildingSites);
  const [emptyWarning, setEmptyWarning] = useState(false);
  const [endWarning, setEndWarning] = useState(false);
  const [startWarning, setStartWarning] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const sendStart = useCallback(() => {
    dispatch(
      setSiteEventAsync({
        event_type: "shift_start",
        created_at: new Date().toISOString(),
        data: {
          worker_id: 0,
          site_id: (buildingSite as BuildingSite).id,
        },
      })
    );
  }, [buildingSite]);

  const sendEnd = useCallback(() => {
    dispatch(
      setSiteEventAsync({
        event_type: "shift_end",
        created_at: new Date().toISOString(),
        data: {
          worker_id: 0,
          site_id: (buildingSite as BuildingSite).id,
        },
      })
    );
  }, [buildingSite]);

  const click = useCallback(() => {
    dispatch(getDataAsync());
    dispatch(setIsStarted(true));
    setTimeLeft(0);
    sendStart();
  }, [dispatch, getDataAsync, sendStart]);

  const onChangeText = useCallback((newValue: string) => {
    setValue(newValue);
    setData(data.filter((x) => x.address.includes(newValue)));
    if (newValue === "") setData(buildingSites);
  }, []);

  const [location, setLocation] = useState<{ lat: number; lon: number }>({
    lat: 0,
    lon: 0,
  });

  const getLocation = useCallback(() => {
    let status = Location.requestPermissionsAsync().then((res) => res.status);
    return Location.getCurrentPositionAsync({}).then((x) => {
      const { latitude, longitude } = x.coords;
      console.log(latitude, longitude);
      dispatch(
        setPositionAsync({
          lat: latitude,
          lon: longitude,
          worker_id: 0,
          site_id: (buildingSite as BuildingSite).id,
        })
      );
    });
  }, []);

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    if (isStarted) {
      const handle = setInterval(() => getLocation(), 5000);
      return () => {
        clearInterval(handle);
      };
    }
  }, [isStarted]);

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
    },
    [data]
  );

  const title = useMemo(() => {
    return profile == null
      ? `Добрый день!`
      : `Добрый день, ${(profile as Profile).firstName}!`;
  }, [profile]);

  const dateString = useMemo(() => {
    var hours = Math.floor(timeLeft / 60 / 60);
    var minutes = Math.floor(timeLeft / 60) - hours * 60;
    var seconds = timeLeft % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <Text category="h4" style={styles.title}>
        {title}
      </Text>
      <View>
        <Autocomplete
          style={styles.input}
          placeholder="Введите адрес или выберите из списка"
          value={value}
          onSelect={onSelect}
          onChangeText={onChangeText}
          label="Строительная площадка"
          disabled={isStarted}
        >
          {data.map((item) => (
            <AutocompleteItem key={item.id} title={item.address} />
          ))}
        </Autocomplete>
        <Text
          category="label"
          style={
            isStarted
              ? { ...styles.flatListDesc, opacity: 0.5 }
              : styles.flatListDesc
          }
        >
          Ближайшие:
        </Text>
        <FlatList
          scrollEnabled={!isStarted}
          style={
            isStarted
              ? { ...styles.flatList, opacity: 0.5 }
              : { ...styles.flatList }
          }
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
                source={item.image}
              >
                <View style={styles.itemTextImage}>
                  <Text style={styles.imageText}>{item.title}</Text>
                  <Text style={styles.descriptionText}>{item.address}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          horizontal
        />
      </View>
      <Text category="h5" style={styles.buttonLogin}>
        {isStarted === true ? dateString : ""}
      </Text>
      {isStarted === true ? (
        <Button onPress={() => setEndWarning(true)}>Завершить смену</Button>
      ) : (
        <Button
          onPress={() => {
            if (profile == null) setEmptyWarning(true);
            else setStartWarning(true);
          }}
        >
          Начать смену
        </Button>
      )}
      <Modal visible={emptyWarning} backdropStyle={styles.backdrop}>
        <Card disabled={true}>
          <Text style={styles.modalText}>
            Пожалуйста, заполните личные данные
          </Text>
          <Button onPress={() => setEmptyWarning(false)}>Хорошо</Button>
        </Card>
      </Modal>
      <Modal
        visible={endWarning}
        backdropStyle={styles.backdrop}
        style={{ width: "80%" }}
      >
        <Card disabled={true}>
          <Text style={styles.modalText}>
            Вы действительно хотите завершить смену?
          </Text>
          <View style={styles.buttons}>
            <Button
              style={{ marginRight: 10 }}
              onPress={() => {
                setEndWarning(false);
                dispatch(setIsStarted(false));
                sendEnd();
              }}
            >
              Да
            </Button>
            <Button appearance="outline" onPress={() => setEndWarning(false)}>
              Нет
            </Button>
          </View>
        </Card>
      </Modal>
      <Modal
        visible={startWarning}
        backdropStyle={styles.backdrop}
        style={{ width: "80%" }}
      >
        <Card disabled={true}>
          <Text style={styles.modalText}>
            Вы действительно хотите начать смену?
          </Text>
          <View style={styles.buttons}>
            <Button
              style={{ marginRight: 10 }}
              onPress={() => {
                click();
                setStartWarning(false);
              }}
            >
              Да
            </Button>
            <Button appearance="outline" onPress={() => setStartWarning(false)}>
              Нет
            </Button>
          </View>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  title: {
    alignSelf: "flex-start",
    marginTop: 30,
  },
  buttonLogin: {
    marginTop: 5,
    paddingBottom: 15,
    height: 30,
  },
  flatList: {
    maxHeight: 300,
    paddingBottom: 20,
  },
  site: {
    margin: 4,
    width: 200,
    borderRadius: 5,
    elevation: 4,
    borderColor: "black",
    shadowColor: "#000",
    shadowRadius: 0,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-start",
    shadowRadius: 2,
    borderRadius: 5,
    overflow: "hidden",
  },
  imageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME.PRIMARY_COLOR,
    marginTop: 10,
  },
  itemTextImage: {
    flex: 1,
    alignItems: "center",
    minHeight: 100,
  },
  selectedSite: {
    borderWidth: 2.5,
    borderColor: THEME.SELECTED_COLOR,
    borderRadius: 5,
  },
  input: {
    marginTop: 20,
  },
  descriptionText: {
    textAlign: "left",
    color: THEME.SECONDARY_COLOR,
  },
  flatListDesc: {
    marginTop: 20,
    marginBottom: 5,
    color: "#8d9dae",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    marginTop: 5,
    marginBottom: 20,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
