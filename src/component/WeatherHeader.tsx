import { WHITE } from "@style/Colors";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";

interface WeatherHeaderProps {
  title: string;
  loading?: boolean;
  subtitle?: string;
}

function WeatherHeader({
  title,
  loading,
  subtitle,
}: WeatherHeaderProps): React.JSX.Element {
  return (
    <View style={styles.header}>
      <Text numberOfLines={1} style={styles.title}>
        {loading ? "Chargement..." : title}
      </Text>
      {subtitle && (
        <Text numberOfLines={1} style={styles.subtitle}>
          {loading ? " " : subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 25,
    marginTop: moderateVerticalScale(10),
  },

  title: {
    fontSize: 30,
    color: WHITE,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 20,
    color: WHITE,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WeatherHeader;
