import React from "react";
import { StyleProp, StyleSheet } from "react-native";
import { Image, ImageSource, ImageStyle } from "expo-image";

const imageMap: { [key: string]: ImageSource } = {
  default: require("@assets/image/error.png"),
  "01d": require("@assets/image/01d.png"),
  "01n": require("@assets/image/01n.png"),
  "02d": require("@assets/image/02d.png"),
  "02n": require("@assets/image/02n.png"),
  "03d": require("@assets/image/03.png"),
  "03n": require("@assets/image/03.png"),
  "04d": require("@assets/image/04.png"),
  "04n": require("@assets/image/04.png"),
  "09d": require("@assets/image/09.png"),
  "09n": require("@assets/image/09.png"),
  "10d": require("@assets/image/10d.png"),
  "10n": require("@assets/image/10n.png"),
  "11d": require("@assets/image/11.png"),
  "11n": require("@assets/image/11.png"),
  "13d": require("@assets/image/13.png"),
  "13n": require("@assets/image/13.png"),
  "50d": require("@assets/image/50.png"),
  "50n": require("@assets/image/50.png"),
  rain: require("@assets/image/rain.png"),
  snow: require("@assets/image/snow.png"),
  wind: require("@assets/image/wind.png"),
  sunset: require("@assets/image/sunset.png"),
  sunrise: require("@assets/image/sunrise.png"),
  direction: require("@assets/image/direction.png"),
};

interface WeatherImageProps {
  icon: string;
  style?: StyleProp<ImageStyle>;
}

function WeatherImage({ icon, style }: WeatherImageProps): React.JSX.Element {
  const customStyle = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <Image
      contentFit="contain"
      source={imageMap[icon]}
      cachePolicy={"memory-disk"}
      style={[styles.image, { ...customStyle }]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});

export default WeatherImage;
