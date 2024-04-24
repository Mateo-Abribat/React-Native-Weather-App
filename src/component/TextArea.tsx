import React, { useEffect, forwardRef } from "react";
import { useTheme } from "@react-navigation/native";
import { moderateVerticalScale } from "react-native-size-matters";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  ActivityIndicator,
} from "react-native";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";

import { DARK_GRAY, VIOLET } from "@style/Colors";

interface TextAreaProps
  extends Omit<TextInputProps, "onBlur" | "onFocus" | "ref"> {
  label?: string;
  loading?: boolean;
}

function TextAreaForwarded(
  {
    style,
    label,
    value,
    loading,
    editable,
    selectionColor,
    ...props
  }: TextAreaProps,
  ref: React.Ref<TextInput>
): React.JSX.Element {
  const { colors } = useTheme();
  const borderColor = useSharedValue<number>(0);
  const textOpacity = useSharedValue<number>(0.3);
  const customStyle = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  useEffect(() => {
    value && value.length > 0
      ? (textOpacity.value = 0)
      : (textOpacity.value = 0.3);
  }, [value]);

  const handleFocus = () => {
    borderColor.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    borderColor.value = withTiming(0, { duration: 200 });
  };

  const animatedContainer = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        borderColor.value,
        [0, 1],
        [colors.border, VIOLET]
      ),
    };
  });

  const animatedLabel = useAnimatedStyle(() => {
    return {
      opacity: withTiming(textOpacity.value, {
        duration: 100,
        easing: Easing.inOut(Easing.linear),
      }),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        animatedContainer,
        { backgroundColor: colors.background },
        { ...customStyle },
      ]}
    >
      <Animated.Text
        style={[styles.label, { color: DARK_GRAY }, animatedLabel]}
      >
        {label}
      </Animated.Text>
      <TextInput
        ref={ref}
        {...props}
        value={value}
        editable={editable}
        onBlur={handleBlur}
        onFocus={handleFocus}
        selectionColor={selectionColor ?? VIOLET}
        style={[
          styles.textinput,
          {
            paddingRight: loading ? 47 : 17,
            color:
              editable !== undefined && editable === false
                ? colors.border
                : colors.text,
          },
        ]}
      />
      {loading ? <ActivityIndicator style={styles.loading} /> : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 25,
    height: moderateVerticalScale(45),
  },

  label: {
    left: 17,
    fontSize: 14,
    letterSpacing: 0.5,
    position: "absolute",
  },

  textinput: {
    fontSize: 14,
    width: "100%",
    paddingLeft: 17,
    height: moderateVerticalScale(45),
  },

  loading: {
    right: 17,
    position: "absolute",
  },
});

const TextArea = forwardRef<TextInput, TextAreaProps>(TextAreaForwarded);

export default TextArea;
