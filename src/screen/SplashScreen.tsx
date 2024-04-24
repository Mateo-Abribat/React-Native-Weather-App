import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VIOLET } from "@style/Colors";

function SplashScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        loop
        autoPlay
        style={styles.lottie}
        source={require("@assets/lottie/Loading.json")}
      />
      <Text style={styles.title}>Mon app météo</Text>
      <Text style={styles.subtitle}>by Matéo Abribat</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  lottie: {
    width: "100%",
    height: "50%",
  },

  title: {
    fontSize: 30,
    color: VIOLET,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 20,
    color: VIOLET,
    fontWeight: "500",
  },
});

export default SplashScreen;
