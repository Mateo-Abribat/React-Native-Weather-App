import { AppState } from "react-native";
import React, { useEffect } from "react";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import Toaster from "@component/Toaster";
import { useAppDispatch } from "@redux/Hook";
import { NavigationTheme } from "@style/Navigation";
import RootNavigator from "@navigation/RootNavigator";
import { updateLocation } from "@redux/weather/WeatherSlice";
import { getStorageHistory } from "@redux/history/HistorySlice";
import { updateStatus } from "@redux/application/ApplicationSlice";
import { getStorageFavorite } from "@redux/favorite/FavoriteSlice";

function Container(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    } else {
      const location = await Location.getCurrentPositionAsync({
        distanceInterval: 1000,
        accuracy: Location.Accuracy.Low,
      });
      dispatch(updateLocation(location.coords));
    }
  };

  const bootstrap = async () => {
    await getLocation();
    dispatch(getStorageHistory());
    dispatch(getStorageFavorite());
    dispatch(updateStatus("connected"));
  };

  useEffect(() => {
    bootstrap();
  }, []);

  useEffect(() => {
    const unsubscribe = AppState.addEventListener("change", async (state) => {
      if (state === "active") {
        await getLocation();
      }
    });

    return () => {
      unsubscribe.remove();
    };
  }, []);

  return (
    <NavigationContainer theme={NavigationTheme}>
      <StatusBar
        animated
        translucent
        style="auto"
        backgroundColor={"transparent"}
        hideTransitionAnimation={"slide"}
      />
      <RootNavigator />
      <Toaster />
    </NavigationContainer>
  );
}

export default Container;
