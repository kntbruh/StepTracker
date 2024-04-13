import { StyleSheet, Text, View } from "react-native";
import { Colors } from "./constants/Colors";

export default function App() {
  type valueProps = {
    label: string;
    value: string;
  };
  const LabelValue = ({ label, value }: valueProps) => (
    <View style={styles.labelValue}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
  stepsData: { flexDirection: "row", gap: 20 },
  labelValue: {},
  label: { fontSize: 20 },
  value: { fontSize: 35, color: Colors.black, fontWeight: "500" },
});
