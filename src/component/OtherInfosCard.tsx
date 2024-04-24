import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";

import { WHITE } from "@style/Colors";
import WeatherImage from "./WeatherImage";
import { WIDTH } from "@constant/Dimensions";

interface OtherInfosCardProps {
  loading?: boolean;
  deg: number | undefined;
  gust: number | undefined;
  speed: number | undefined;
  clouds: number | undefined;
  sunset: number | undefined;
  sunrise: number | undefined;
  pressure: number | undefined;
  humidity: number | undefined;
  feelsLike: number | undefined;
  timezoneOffset: number | undefined;
}

function OtherInfosCard({
  deg,
  gust,
  speed,
  clouds,
  sunset,
  sunrise,
  loading,
  pressure,
  humidity,
  feelsLike,
  timezoneOffset,
}: OtherInfosCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.rowcontainer}>
        <View style={[styles.nestedcard, { width: "49%" }]}>
          <Text style={styles.titletext}>Ressenti</Text>
          <Text style={styles.descriptiontext}>
            {feelsLike ? `${Math.round(feelsLike)} °c.` : "Erreur"}
          </Text>
        </View>
        <View style={[styles.nestedcard, { width: "49%" }]}>
          <Text style={styles.titletext}>Humidité</Text>
          <Text style={styles.descriptiontext}>
            {humidity ? `${humidity} %` : "Erreur"}
          </Text>
        </View>
      </View>
      <View style={styles.nestedcard}>
        <Text style={styles.titletext}>Lever et coucher du soleil</Text>
        <View style={styles.rowcontainer}>
          <View style={styles.suncontainer}>
            <WeatherImage icon="sunrise" style={styles.image} />
            <Text style={styles.suntext}>
              {sunrise
                ? new Date(
                    (sunrise + (timezoneOffset ?? 0)) * 1000
                  ).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "UTC",
                  })
                : "Erreur"}
            </Text>
          </View>
          <View style={styles.suncontainer}>
            <WeatherImage icon="sunset" style={styles.image} />
            <Text style={styles.suntext}>
              {sunset
                ? new Date(
                    (sunset + (timezoneOffset ?? 0)) * 1000
                  ).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "UTC",
                  })
                : "Erreur"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.nestedcard}>
        <Text style={styles.titletext}>Vitesse et direction du vent</Text>
        <View
          style={[
            styles.rowcontainer,
            { width: "100%", paddingHorizontal: moderateScale(10) },
          ]}
        >
          <WeatherImage icon="wind" style={[styles.image, { width: "30%" }]} />
          <View>
            <Text
              style={[styles.descriptiontext, { width: "70%", fontSize: 15 }]}
            >
              Vent: {speed !== undefined ? speed + " km/h" : "Erreur"}
            </Text>
            <Text
              style={[styles.descriptiontext, { width: "70%", fontSize: 15 }]}
            >
              Rafales: {gust !== undefined ? gust + " km/h" : "Erreur"}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View
          style={[
            styles.rowcontainer,
            { width: "100%", paddingHorizontal: moderateScale(10) },
          ]}
        >
          <Text
            style={[styles.descriptiontext, { width: "70%", fontSize: 15 }]}
          >
            Direction: {deg !== undefined ? deg + " °" : "Erreur"}
          </Text>
          <WeatherImage
            icon="direction"
            style={[styles.image, { width: "30%" }]}
          />
        </View>
      </View>
      <View style={styles.rowcontainer}>
        <View style={[styles.nestedcard, { width: "49%" }]}>
          <Text style={styles.titletext}>Nuages</Text>
          <Text style={styles.descriptiontext}>
            {clouds !== undefined ? `${clouds} %` : "Erreur"}
          </Text>
        </View>
        <View style={[styles.nestedcard, { width: "49%" }]}>
          <Text style={styles.titletext}>Pression</Text>
          <Text style={styles.descriptiontext}>
            {pressure !== undefined ? `${pressure} hPa` : "Erreur"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: WIDTH - 40,
  },

  nestedcard: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: moderateVerticalScale(10),
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },

  rowcontainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  titletext: {
    fontSize: 20,
    color: WHITE,
    fontWeight: "800",
    marginBottom: moderateVerticalScale(5),
  },

  descriptiontext: {
    fontSize: 30,
    color: WHITE,
    fontWeight: "800",
    marginTop: moderateVerticalScale(5),
  },

  suncontainer: {
    width: "50%",
    alignItems: "center",
    marginTop: moderateVerticalScale(5),
  },

  image: {
    width: "50%",
    height: moderateVerticalScale(70),
  },

  suntext: {
    fontSize: 15,
    color: WHITE,
    fontWeight: "bold",
    marginTop: moderateVerticalScale(5),
  },

  separator: {
    height: 2,
    width: "100%",
    backgroundColor: WHITE,
    marginVertical: moderateVerticalScale(10),
  },
});

export default OtherInfosCard;
