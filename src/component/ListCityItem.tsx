import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { moderateVerticalScale } from "react-native-size-matters";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import SkeletonView from "./SkeletonView";
import { LIGHT_GRAY } from "@style/Colors";
import CountryFlag from "react-native-country-flag";

interface ListCityItemProps extends TouchableOpacityProps {
  city: string;
  state?: string;
  country: string;
  loading?: boolean;
  isHistory?: boolean;
  onPressRemove?: () => void;
}

function ListCityItem({
  city,
  state,
  style,
  country,
  loading,
  disabled,
  isHistory,
  activeOpacity,
  onPressRemove,
  ...props
}: ListCityItemProps): React.JSX.Element {
  const { colors } = useTheme();
  const customStyle = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return loading ? (
    <SkeletonView style={[styles.skeleton, { ...customStyle }]} />
  ) : (
    <TouchableOpacity
      {...props}
      disabled={loading ? true : disabled}
      activeOpacity={activeOpacity ?? 0.5}
      style={[
        styles.button,
        {
          backgroundColor: colors.card,
        },
        { ...customStyle },
      ]}
    >
      <View style={styles.leftsubcontainer}>
        <CountryFlag size={20} style={styles.flag} isoCode={country} />
        <Text style={styles.text} numberOfLines={2}>
          {city}
          {state ? `, ${state}` : null}
        </Text>
      </View>
      {isHistory && (
        <TouchableOpacity
          activeOpacity={activeOpacity ?? 0.5}
          onPress={() => (onPressRemove ? onPressRemove() : null)}
        >
          <Ionicons name="close" size={22} color={colors.text} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: LIGHT_GRAY,
    height: moderateVerticalScale(57),
  },

  button: {
    flex: 1,
    elevation: 5,
    shadowRadius: 3,
    borderRadius: 10,
    shadowOpacity: 0.1,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    height: moderateVerticalScale(57),
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  flag: {
    borderRadius: 2,
  },

  text: {
    fontSize: 14,
    marginLeft: 10,
    maxWidth: "80%",
    fontWeight: "bold",
  },

  leftsubcontainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ListCityItem;
