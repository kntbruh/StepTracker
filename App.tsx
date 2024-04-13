import { StyleSheet, Text, View } from "react-native";
import { Colors } from "./constants/Colors";
import { LabelValue } from "./src/components/LabelValue";
import CircleProgress from "./src/components/CircleProgress";

export default function App() {
  return (
    <View style={styles.container}>
      <CircleProgress progress={0.2} />
      <View style={styles.stepsData}>
        <LabelValue label="Steps" value="1337" />
        <LabelValue label="Distance" value="2,28 km" />
      </View>
      <LabelValue label="Flights climbed" value="0,75 km" />
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
