import { Image } from "expo-image";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import { View, Keyboard, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Gesture,
  GestureDetector,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  withTiming,
  withSpring,
  ReduceMotion,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { VIOLET, RED } from "@style/Colors";
import { WIDTH } from "@constant/Dimensions";
import { useAppSelector, useAppDispatch } from "@redux/Hook";
import { updateVisibility } from "@redux/toaster/ToasterSlice";

function Toaster(): React.JSX.Element {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const top = useSharedValue<number>(-100);
  const width = useSharedValue<number>(WIDTH - 40);
  const state = useAppSelector((state) => state.toaster.state);
  const visible = useAppSelector((state) => state.toaster.visible);
  const description = useAppSelector((state) => state.toaster.description);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        dispatch(updateVisibility(false));
      }
    );

    return () => {
      keyboardWillShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      width.value = WIDTH - 20;
      width.value = withTiming(0, {
        duration: 7000,
        easing: Easing.linear,
        reduceMotion: ReduceMotion.System,
      });
      const timer = setTimeout(() => {
        dispatch(updateVisibility(false));
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  useEffect(() => {
    visible ? (top.value = 10 + insets.top) : (top.value = -100);
  }, [top.value, visible]);

  const hideToaster = () => {
    dispatch(updateVisibility(false));
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      if (event.translationY < 10 + insets.top) {
        top.value = insets.top + 10 + event.translationY;
      } else if (event.translationY > 10 + insets.top) {
        const maxTranslation = 150;
        const dampingFactor = 0.1;
        const distanceFromMax = Math.min(
          maxTranslation,
          event.translationY - 10 + insets.top
        );
        const damping = 1 / (1 + distanceFromMax * dampingFactor);
        top.value = insets.top + 10 + event.translationY * damping;
      }
    })
    .onFinalize((event) => {
      if (event.translationY < -insets.top) {
        runOnJS(hideToaster)();
      } else {
        top.value = visible ? 10 + insets.top : -100;
      }
    });

  const animatedContainer = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, {
        damping: 12,
        stiffness: 200,
        overshootClamping: false,
        restSpeedThreshold: 1,
        restDisplacementThreshold: 1,
      }),
    };
  });

  const animatedTimeBar = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.container,
          animatedContainer,
          {
            backgroundColor: colors.card,
          },
        ]}
      >
        <View style={styles.subcontainer}>
          <View style={styles.firstcell}>
            <Image
              contentFit="contain"
              cachePolicy={"memory-disk"}
              style={state === "failure" ? styles.imagefailure : styles.image}
              source={
                state === "success"
                  ? require("@assets/image/valid.png")
                  : require("@assets/image/decline.png")
              }
            />
          </View>
          <View style={styles.secondcell}>
            <Text style={styles.title}>
              {state === "success" ? "Succès" : "Erreur"}
            </Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.thirdcell}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                dispatch(updateVisibility(false));
              }}
            >
              <Ionicons name="close" color={VIOLET} size={moderateScale(25)} />
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View
          style={[
            styles.timebar,
            state === "failure"
              ? { backgroundColor: RED }
              : { backgroundColor: VIOLET },
            animatedTimeBar,
          ]}
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    maxWidth: 800,
    shadowRadius: 3,
    borderRadius: 10,
    width: WIDTH - 20,
    overflow: "hidden",
    shadowOpacity: 0.1,
    alignSelf: "center",
    position: "absolute",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  subcontainer: {
    padding: 7,
    borderRadius: 10,
    flexDirection: "row",
  },

  firstcell: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 45,
  },

  image: {
    width: "55%",
    height: "55%",
  },

  imagefailure: {
    width: "40%",
    height: "40%",
  },

  secondcell: {
    width: "75%",
    minHeight: 45,
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
  },

  description: {
    fontSize: 14,
    fontWeight: "bold",
  },

  thirdcell: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 45,
  },

  timebar: {
    height: 3,
  },
});

export default Toaster;
