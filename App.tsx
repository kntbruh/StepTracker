import { StyleSheet, Text, View } from "react-native";
import { Colors } from "./constants/Colors";
import { LabelValue } from "./src/components/LabelValue";
import CircleProgress from "./src/components/CircleProgress";
import useHealthData from "./src/components/hooks/useHealthData";

const STEPS_GOAL = 8_000;

export default function App() {
  const { steps, flights, distance } = useHealthData(new Date(2024, 4, 24));
  return (
    <View style={styles.container}>
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
  stepsData: {
    flexDirection: "row",
    gap: 25,
    flexWrap: "wrap",
    marginTop: 100,
  },
});
