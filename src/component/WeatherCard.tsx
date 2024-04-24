import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";

import { WHITE } from "@style/Colors";
import WeatherImage from "./WeatherImage";
import SkeletonView from "./SkeletonView";
import { WIDTH } from "@constant/Dimensions";

interface WeatherCardProps {
  loading?: boolean;
  city: string | undefined;
  icon: string | undefined;
  temperature: number | undefined;
  description: string | undefined;
  maxTemperature: number | undefined;
  minTemperature: number | undefined;
}

function WeatherCard({
  city,
  icon,
  loading,
  temperature,
  description,
  maxTemperature,
  minTemperature,
}: WeatherCardProps): React.JSX.Element {
  return (
    <>
      <View style={styles.card}>
        {loading ? (
          <SkeletonView style={styles.skeletoncitytext} />
        ) : (
          <Text style={styles.citytext}>{city}</Text>
        )}
        {loading ? (
          <SkeletonView style={styles.skeletonimage} />
        ) : (
          <WeatherImage icon={icon ?? "default"} style={styles.image} />
        )}
        {loading ? (
          <SkeletonView style={styles.skeletondescriptiontext} />
        ) : (
          <Text style={styles.descriptiontext}>{description ?? "Erreur"}</Text>
        )}
        {loading ? (
          <SkeletonView style={styles.skeletontemperaturetext} />
        ) : (
          <>
            <Text style={styles.temperaturetext}>
              {temperature !== undefined
                ? `${Math.round(temperature)} °c.`
                : "Erreur"}
            </Text>
            <View style={styles.minmaxcontainer}>
              <Ionicons name="arrow-down" size={25} color={WHITE} />
              <Text style={styles.minmaxtext}>
                {minTemperature !== undefined
                  ? `${Math.round(minTemperature)} °c.`
                  : "Erreur"}
              </Text>
              <Ionicons name="arrow-up" size={25} color={WHITE} />
              <Text style={styles.minmaxtext}>
                {maxTemperature !== undefined
                  ? `${Math.round(maxTemperature)} °c.`
                  : "Erreur"}
              </Text>
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    width: WIDTH - 40,
    alignItems: "center",
    marginTop: moderateVerticalScale(10),
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },

  skeletoncitytext: {
    height: 24,
    width: "50%",
    borderRadius: 10,
    marginBottom: moderateVerticalScale(5),
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },

  citytext: {
    fontSize: 20,
    color: WHITE,
    fontWeight: "bold",
    marginBottom: moderateVerticalScale(5),
  },

  skeletonimage: {
    width: "65%",
    borderRadius: 10,
    height: moderateVerticalScale(120),
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },

  image: {
    width: "100%",
    height: moderateVerticalScale(120),
  },

  skeletondescriptiontext: {
    height: 19,
    width: "50%",
    borderRadius: 10,
    marginTop: moderateVerticalScale(5),
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },

  descriptiontext: {
    fontSize: 16,
    color: WHITE,
    fontWeight: "bold",
    marginTop: moderateVerticalScale(5),
  },

  skeletontemperaturetext: {
    height: 91,
    width: "60%",
    borderRadius: 10,
    marginTop: moderateVerticalScale(5),
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },

  temperaturetext: {
    fontSize: 60,
    color: WHITE,
    fontWeight: "800",
  },

  minmaxcontainer: {
    flexDirection: "row",
  },

  minmaxtext: {
    fontSize: 20,
    color: WHITE,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});

export default WeatherCard;
