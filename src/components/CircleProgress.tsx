import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import { Colors } from "../../constants/Colors";
import SVG, { Circle } from "react-native-svg";

type cirlceProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number;
};

const CircleProgress: FC<cirlceProps> = ({
  radius = 100,
  strokeWidth = 30,
  progress,
}) => {
  const innerRadius = radius - strokeWidth / 2;
  const diametr = Math.PI * 2 * innerRadius;

  const styles = StyleSheet.create({
    circleContainer: {
      width: radius * 2,
      height: radius * 2,
      alignSelf: "center",
    },
  });
  return (
    <View style={styles.circleContainer}>
      <SVG>
        {/* background circle */}
        <Circle
          r={innerRadius}
          cx={radius}
          cy={radius}
          stroke={Colors.red}
          fill={Colors.background}
          strokeWidth={strokeWidth}
          opacity={0.3}
        />
        {/* foreground circle */}
        <Circle
          r={innerRadius}
          cx={radius}
          cy={radius}
          originX={radius}
          originY={radius}
          stroke={Colors.red}
          fill={Colors.background}
          strokeWidth={strokeWidth}
          strokeDasharray={[diametr * progress, diametr]}
          strokeLinecap="round"
          rotation="-90"
        />
      </SVG>
    </View>
  );
};

export default CircleProgress;
