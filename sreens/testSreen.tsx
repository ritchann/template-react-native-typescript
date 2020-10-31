import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Accelerometer } from "expo-sensors";

export const TestScreen = () => {
  const [data, setData] = useState<{ x: number; y: number; z: number }>({
    x: 0,
    y: 0,
    z: 0,
  });

  const [sos, setSos] = useState(false);

  const _slow = () => {
    Accelerometer.setUpdateInterval(100);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(5000);
  };

  const _subscribe = () => {
    console.log("sub");
    let prevY = 0;
    Accelerometer.setUpdateInterval(500);
    Accelerometer.addListener((accelerometerData) => {
      console.log(
        accelerometerData.y,
        prevY,
        Math.abs(data.y - accelerometerData.y)
      );
      if (Math.abs(prevY - accelerometerData.y) > 1) setSos(true);
      else setSos(false);
      setData(accelerometerData);
      prevY = accelerometerData.y;
    });
  };

  const round = (n: number) => {
    if (!n) {
      return 0;
    }

    return Math.floor(n * 100) / 100;
  };

  useEffect(() => {
    _subscribe();
  }, []);
  const _unsubscribe = () => {};

  return (
    <View style={[styles.container, sos ? styles.sos : styles.container]}>
      <Text>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
      <Text>
        x: {round(data.x)} y: {round(data.y)} z: {round(data.z)}
      </Text>
      <View>
        <TouchableOpacity style={{ marginBottom: 5 }} onPress={_slow}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast}>
          <Text>Fast</Text>
        </TouchableOpacity>
        {sos && <Text>{"SOS"}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  sos: {
    backgroundColor: "red",
  },
});
