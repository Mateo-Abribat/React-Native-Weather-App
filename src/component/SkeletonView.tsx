import React, { useEffect } from "react";
import { StyleSheet, ViewProps } from "react-native";
import Animated, {
  Easing,
  withRepeat,
  withTiming,
  ReduceMotion,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

function SkeletonView({ style, ...props }: ViewProps): React.JSX.Element {
  const opacity = useSharedValue<number>(1);
  const customStyle = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.6, {
        duration: 1000,
        reduceMotion: ReduceMotion.System,
        easing: Easing.inOut(Easing.poly(3)),
      }),
      -1,
      true
    );
  }, [opacity]);

  const animatedContainer = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View {...props} style={[animatedContainer, { ...customStyle }]} />
  );
}

export default SkeletonView;
