import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import { Colors } from "../../constants/Colors";

type valueProps = {
  label: string;
  value: string;
};

export const LabelValue: FC<valueProps> = ({ label, value }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 20 },
  value: { fontSize: 35, color: Colors.black, fontWeight: "500" },
});
