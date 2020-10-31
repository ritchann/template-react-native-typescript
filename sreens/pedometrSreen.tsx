import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Pedometer } from "expo-sensors";
import { steps } from "./data";
import { Icon, Button } from "@ui-kitten/components";

interface Props {
  onClose: () => void;
}

export const PedometrScreen: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const PersonIcon = (props: any) => <Icon {...props} name="person-outline" />;

  const _subscribe = () => {
    Pedometer.watchStepCount((result) => {
      setStep(result.steps);
    });
  };

  useEffect(() => _subscribe(), [_subscribe]);

  return (
    <Modal
      animationType="slide"
      onRequestClose={() => console.log("close")}
      style={styles.container}
    >
      <View style={styles.сurrentStepInfo}>
        <Text>{`Сегодня вы прошли ${step} шагов`}</Text>
      </View>
      <View style={{ height: 50, width: 50 }}>
        <Icon name="close-outline" />
      </View>
      <LineChart
        data={{
          labels: steps.map((x) => x.date),
          datasets: [
            {
              data: steps.map((x) => x.value),
            },
          ],
        }}
        width={370}
        height={210}
        chartConfig={{
          backgroundColor: "#a20a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "3",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />
      <BarChart
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
        data={{
          labels: steps.map((x) => x.date),
          datasets: [
            {
              data: steps.map((x) => x.time),
            },
          ],
        }}
        width={360}
        height={215}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: `rgb(51, 102, 255)`,
          backgroundGradientFrom: `rgb(51, 102, 255)`,
          backgroundGradientTo: `rgb(51, 102, 255)`,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "3",
            stroke: "#ffa726",
          },
        }}
        verticalLabelRotation={0}
      />
      <Button
        style={{ marginLeft: 10, marginRight: 10 }}
        appearance="outline"
        accessoryLeft={PersonIcon}
        onPress={onClose}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  сurrentStepInfo: {
    minHeight: 100,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 4,
    borderColor: "black",
    shadowColor: "#000",
    shadowRadius: 0,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: "#fff",
  },
  lineChart: {},
});
