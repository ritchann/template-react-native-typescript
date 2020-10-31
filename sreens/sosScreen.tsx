import { Button, Text } from "@ui-kitten/components";
import React, { useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";

export const SOSScreen = () => {
  const onLongPress = useCallback(() => {
    Alert.alert(
      "",
      "Ваш сигнал SOS отправлен",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.description} category="label">
        {"Для отправки сигнала SOS удерживайте кнопку в течение 3 секунд"}
      </Text>
      <Button
        style={styles.sos}
        delayLongPress={1800}
        onLongPress={onLongPress}
        size="giant"
        status="danger"
      >
        SOS
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  sos: {
    marginBottom: 250,
    width: 150,
    height: 150,
    fontStyle: "italic",
  },
  description: {
    padding: 50,
    marginTop: 120,
    marginBottom: 5,
    color: "#8d9dae",
  },
});
