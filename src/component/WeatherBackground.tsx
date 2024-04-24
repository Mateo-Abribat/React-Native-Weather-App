import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const backgroundMap: { [key: string]: string[] } = {
  "01d": ["#9AD1FF", "#6BA8E6", "#3D85CD"],
  "01n": ["#193A6F", "#001F3F", "#000A1A"],
  "02d": ["#9AD1FF", "#6BA8E6", "#3D85CD"],
  "02n": ["#4E5F99", "#354A6E", "#192F52"],
  "03d": ["#9AD1FF", "#6BA8E6", "#3D85CD"],
  "03n": ["#6BA8E6", "#4E5F99", "#354A6E"],
  "04d": ["#9AD1FF", "#6BA8E6", "#3D85CD"],
  "04n": ["#5F7986", "#4C5C6A", "#2B3E4D"],
  "09d": ["#7BB2FF", "#4984E0", "#0055B2"],
  "09n": ["#3D85CD", "#4984E0", "#0055B2"],
  "10d": ["#7BB2FF", "#4984E0", "#0055B2"],
  "10n": ["#4984E0", "#0055B2", "#001F3F"],
  "11d": ["#5F5F5F", "#2B2B2B", "#000000"],
  "11n": ["#2B2B2B", "#000000", "#000000"],
  "13d": ["#F2F2F2", "#E6E6E6", "#CCCCCC"],
  "13n": ["#CCCCCC", "#A8A8A8", "#7F7F7F"],
  "50d": ["#C6C6C6", "#B3B3B3", "#A8A8A8"],
  "50n": ["#A8A8A8", "#7F7F7F", "#5F5F5F"],
};

interface WeatherBackgroundProps {
  icon: string | undefined;
  children: React.ReactNode;
}

function WeatherBackground({
  icon,
  children,
}: WeatherBackgroundProps): React.JSX.Element {
  return (
    <LinearGradient
      style={styles.container}
      colors={backgroundMap[icon ?? "01d"]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WeatherBackground;
