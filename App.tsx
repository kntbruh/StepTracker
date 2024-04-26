import { StyleSheet, Text, View } from "react-native";
import { Colors } from "./constants/Colors";
import { LabelValue } from "./src/components/LabelValue";
import CircleProgress from "./src/components/CircleProgress";
import useHealthData from "./src/components/hooks/useHealthData";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const STEPS_GOAL = 8_000;

export default function App() {
  const [date, setDate] = useState(new Date());
  const { steps, flights, distance } = useHealthData(date);

  const onChangeDate = (numberDay: number) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + numberDay);
    setDate(currentDate);
  };
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <AntDesign
          onPress={() => onChangeDate(-1)}
          name="banckward"
          size={21}
          color={Colors.blue}
        />
        <Text style={styles.dateText}>{date.toDateString()}</Text>
        <AntDesign
          onPress={() => onChangeDate(1)}
          name="forward"
          size={21}
          color={Colors.blue}
        />
      </View>
      <CircleProgress
        radius={100}
        strokeWidth={40}
        progress={steps / STEPS_GOAL}
      />
      <View style={styles.stepsData}>
        <LabelValue label="Steps" value={steps.toString()} />
        <LabelValue
          label="Distance"
          value={`${(distance / 1000).toFixed(2)} km`}
        />
      </View>
      <LabelValue label="Flights climbed" value={flights.toString()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flexDirection: "row",
    gap: 10,
  },
  dateText: { color: Colors.red, fontWeight: "500", fontSize: 20 },
  stepsData: {
    flexDirection: "row",
    gap: 25,
    flexWrap: "wrap",
    marginTop: 100,
  },
});
