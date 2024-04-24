import { Image } from "expo-image";
import React, { useEffect, useMemo } from "react";
import { moderateVerticalScale } from "react-native-size-matters";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabNavigationState, useTheme } from "@react-navigation/native";
import { ParamListBase, NavigationHelpers } from "@react-navigation/native";
import type {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { VIOLET } from "@style/Colors";
import { WIDTH } from "@constant/Dimensions";
import {
  HomeStackScreens,
  SearchStackScreens,
  BottomNavigatorScreens,
  FavoriteStackScreens,
} from "@constant/NavigationTypes";

interface TabBarProps {
  descriptors: BottomTabDescriptorMap;
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

function TabBar(props: TabBarProps): React.JSX.Element {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const translateX = useSharedValue<number>(0);
  const navigationRoute = useMemo(() => {
    return props.state.routes[props.state.index];
  }, [props.state.index, props.state.routes]);
  const nestedRouteName: string | undefined = useMemo(() => {
    return navigationRoute.state?.index
      ? navigationRoute.state.routes?.[navigationRoute.state.index]?.name
      : undefined;
  }, [navigationRoute.state?.index, navigationRoute.state?.routes]);

  const animatedSlider = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(translateX.value, {
            damping: 21,
            stiffness: 200,
            restSpeedThreshold: 1,
            overshootClamping: false,
            restDisplacementThreshold: 1,
          }),
        },
      ],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          height: moderateVerticalScale(45) + insets.bottom,
          display:
            nestedRouteName === HomeStackScreens.HomeDayDetail ||
            nestedRouteName === SearchStackScreens.SearchDayDetail ||
            nestedRouteName === FavoriteStackScreens.FavoriteDayDetail
              ? "none"
              : "flex",
          position:
            nestedRouteName === SearchStackScreens.SearchDetail ||
            nestedRouteName === FavoriteStackScreens.FavoriteDetail ||
            navigationRoute.name === BottomNavigatorScreens.HomeNavigator
              ? "absolute"
              : "relative",
          backgroundColor:
            nestedRouteName === SearchStackScreens.SearchDetail ||
            nestedRouteName === FavoriteStackScreens.FavoriteDetail ||
            navigationRoute.name === BottomNavigatorScreens.HomeNavigator
              ? "rgba(0, 0, 0, 0.25)"
              : "transparent",
        },
      ]}
    >
      <View
        style={[
          styles.backgroundslider,
          {
            backgroundColor:
              nestedRouteName === SearchStackScreens.SearchDetail ||
              nestedRouteName === FavoriteStackScreens.FavoriteDetail ||
              navigationRoute.name === BottomNavigatorScreens.HomeNavigator
                ? "rgba(150, 150, 150, 0.25)"
                : colors.border,
          },
        ]}
      />
      <Animated.View style={[styles.slider, animatedSlider]} />
      {props.state.routes.map((route, index) => {
        const isFocused = props.state.index === index;
        const { options } = props.descriptors[route.key];
        const iconMap: { [key: string]: React.ReactNode } = {
          HomeNavigator: (
            <Image
              contentFit="contain"
              style={styles.image}
              cachePolicy={"memory-disk"}
              source={require("@assets/image/home.png")}
            />
          ),
          SearchNavigator: (
            <Image
              contentFit="contain"
              style={styles.image}
              cachePolicy={"memory-disk"}
              source={require("@assets/image/search.png")}
            />
          ),
          FavoriteNavigator: (
            <Image
              contentFit="contain"
              style={styles.image}
              cachePolicy={"memory-disk"}
              source={require("@assets/image/favorite.png")}
            />
          ),
        };

        useEffect(() => {
          translateX.value = (WIDTH / 3) * props.state.index;
        }, [props.state.index]);

        const onPress = () => {
          const event = props.navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name, { merge: true });
          }
        };

        const onLongPress = () => {
          props.navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.button}
            onLongPress={onLongPress}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            {iconMap[route.name]}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    width: WIDTH,
    alignItems: "center",
    flexDirection: "row",
  },

  backgroundslider: {
    top: -2,
    height: 2,
    width: WIDTH,
    position: "absolute",
  },

  slider: {
    top: -2,
    height: 2,
    width: WIDTH / 3,
    position: "absolute",
    backgroundColor: VIOLET,
  },

  image: {
    width: "60%",
    height: "60%",
  },

  button: {
    height: "100%",
    width: WIDTH / 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabBar;
