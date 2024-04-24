import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";

import { WHITE } from "@style/Colors";
import { WIDTH } from "@constant/Dimensions";
import type { WeatherProps } from "@constant/Types";
import WeatherImage from "./WeatherImage";
import SkeletonView from "./SkeletonView";

interface ForecastCardProps {
  loading?: boolean;
  data: WeatherProps[] | undefined;
  onPress: (data: WeatherProps) => void;
}

function ForecastCard({
  data,
  loading,
  onPress,
}: ForecastCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="calendar" size={16} color={WHITE} />
        <Text numberOfLines={2} style={styles.titletext}>
          Prévision sur les 10 prochains jours:
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.separator} />
        {data !== undefined &&
          data?.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.forecastday}
                onPress={() => onPress(item)}
              >
                {loading ? (
                  <SkeletonView style={styles.skeletonforecastdaytext} />
                ) : (
                  <Text style={styles.forecastdaytext}>
                    {item.dt !== undefined
                      ? new Date(item.dt * 1000).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "2-digit",
                        })
                      : "Erreur"}
                  </Text>
                )}
                {loading ? (
                  <SkeletonView style={styles.skeletonforecastcontainer} />
                ) : (
                  <View style={styles.forecastcontainer}>
                    <View style={styles.minmaxcontainer}>
                      <Ionicons name="arrow-down" size={20} color={WHITE} />
                      <Text style={styles.minmaxtext}>
                        {item.temp && item.temp.min !== undefined
                          ? `${Math.round(item.temp.min)} °c.`
                          : "Erreur"}
                      </Text>
                      <Ionicons name="arrow-up" size={20} color={WHITE} />
                      <Text style={styles.minmaxtext}>
                        {item.temp && item.temp.max !== undefined
                          ? `${Math.round(item.temp.max)} °c.`
                          : "Erreur"}
                      </Text>
                    </View>
                    <WeatherImage
                      style={styles.forecastdayimage}
                      icon={(item.weather && item.weather[0].icon) ?? "default"}
                    />
                  </View>
                )}
              </TouchableOpacity>
              <View style={styles.separator} />
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    width: WIDTH - 40,
    marginTop: moderateVerticalScale(10),
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  titletext: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: moderateScale(5),
  },

  body: {
    marginTop: moderateVerticalScale(10),
  },

  separator: {
    height: 2,
    backgroundColor: WHITE,
  },

  forecastday: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 5,
    justifyContent: "space-between",
    paddingVertical: moderateVerticalScale(12),
  },

  skeletonforecastdaytext: {
    height: 27,
    width: "15%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },

  forecastdaytext: {
    color: WHITE,
    fontSize: 15,
    fontWeight: "bold",
  },

  forecastcontainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  skeletonforecastcontainer: {
    height: 27,
    width: "60%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },

  minmaxcontainer: {
    flexDirection: "row",
  },

  minmaxtext: {
    fontSize: 17,
    color: WHITE,
    fontWeight: "bold",
    marginHorizontal: 5,
  },

  forecastdayimage: {
    width: 27,
    height: 27,
    marginLeft: 5,
  },
});

export default ForecastCard;
