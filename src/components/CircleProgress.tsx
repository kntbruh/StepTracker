import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import { Colors } from "../../constants/Colors";
import SVG, { Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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

  const fill = useSharedValue(0);

  React.useEffect(() => {
    fill.value = withTiming(progress, { duration: 1500 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [diametr * fill.value, diametr],
  }));

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
          strokeWidth={strokeWidth}
          stroke={Colors.red}
          fill={Colors.background}
          opacity={0.3}
        />
        {/* foreground circle */}
        <AnimatedCircle
          animatedProps={animatedProps}
          r={innerRadius}
          cx={radius}
          cy={radius}
          originX={radius}
          originY={radius}
          stroke={Colors.red}
          fill={Colors.background}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          rotation="-90"
        />
      </SVG>
    </View>
  );
};

export default CircleProgress;
