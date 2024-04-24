import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";

import { WHITE } from "@style/Colors";
import WeatherImage from "./WeatherImage";
import { WIDTH } from "@constant/Dimensions";

interface PrecipitationCardProps {
  rain: number | undefined;
  snow: number | undefined;
  probability: number | undefined;
}

function PrecipitationCard({
  rain,
  snow,
  probability,
}: PrecipitationCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <WeatherImage icon={rain ? "rain" : "snow"} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.probabilitytext}>
          {probability ? `${probability * 100}% ` : "Erreur"}
          <Text style={styles.descriptiontext}>de risque de précipitation</Text>
        </Text>
        <Text style={styles.volumetext}>
          {rain
            ? rain + " mm de pluie"
            : snow
            ? snow + " mm de neige"
            : "Erreur"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    width: WIDTH - 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateVerticalScale(10),
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },

  image: {
    width: "30%",
    height: moderateVerticalScale(70),
  },

  container: {
    width: "70%",
    borderLeftWidth: 2,
    borderColor: WHITE,
    paddingHorizontal: 20,
  },

  probabilitytext: {
    fontSize: 35,
    color: "white",
    fontWeight: "800",
  },

  descriptiontext: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },

  volumetext: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
    marginTop: moderateVerticalScale(10),
  },
});

export default PrecipitationCard;
