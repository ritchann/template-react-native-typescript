import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Pedometer } from "expo-sensors";
import { steps } from "./data";
import { Icon, Button, Text } from "@ui-kitten/components";
import { THEME } from "../data/constants";

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
      <Text category="h4" style={styles.label}>
        Статистика
      </Text>
      <Text category="s1" style={{ 
        marginLeft: 20, 
        color: THEME.PRIMARY_COLOR, 
        marginBottom: 10
      }}>{`Поздравляем, сегодня вы прошли ${step} шагов!`}</Text>
      <View style={{ padding: 10 }}>
        <Text category="label" style={{ marginBottom: 5, marginLeft: 10 }}>Активность за последнюю неделю</Text>
        <LineChart
          data={{
            labels: steps.map((x) => x.date),
            datasets: [
              {
                data: steps.map((x) => x.value),
              },
            ],
          }}
          width={350}
          height={200}
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
      </View>
      <Text category="label" style={{ marginBottom: 5, marginLeft: 20 }}>Количество отработанных часов</Text>
      <BarChart
        style={{
          marginLeft: 20,
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
        width={340}
        height={200}
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
        style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}
        appearance="outline"
        accessoryLeft={PersonIcon}
        onPress={onClose}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20
  },
  label: {
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20
  },
});
