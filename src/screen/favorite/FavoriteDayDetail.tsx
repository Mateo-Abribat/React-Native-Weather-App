import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BackButton from "@component/BackButton";
import WeatherCard from "@component/WeatherCard";
import { useRoute } from "@react-navigation/native";
import WeatherHeader from "@component/WeatherHeader";
import OtherInfosCard from "@component/OtherInfosCard";
import ModalSafeAreaView from "@component/ModalSafeAreaView";
import WeatherBackground from "@component/WeatherBackground";
import {
  FavoriteStackScreens,
  type FavoriteNavRouteProp,
} from "@constant/NavigationTypes";

function FavoriteDayDetailScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const route =
    useRoute<FavoriteNavRouteProp<FavoriteStackScreens.FavoriteDayDetail>>();
  const city = route.params.city;
  const weather = route.params.weather;

  return (
    <WeatherBackground icon={weather.weather[0].icon ?? "01d"}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateVerticalScale(10) + insets.bottom,
        }}
      >
        <ModalSafeAreaView style={styles.container}>
          <BackButton icon="close" />
          <WeatherHeader
            title={
              weather?.dt
                ? new Date(weather?.dt * 1000)
                    .toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                    .replace(/^(.)/, (match) => match.toUpperCase())
                : "Erreur"
            }
          />
          <WeatherCard
            city={city?.name}
            icon={weather.weather[0].icon}
            temperature={weather.temp.eve}
            minTemperature={weather.temp.min}
            maxTemperature={weather.temp.max}
            description={weather.weather[0].description}
          />
          <OtherInfosCard
            deg={weather.deg}
            gust={weather.gust}
            speed={weather.speed}
            clouds={weather.clouds}
            sunset={weather.sunset}
            sunrise={weather.sunrise}
            humidity={weather.humidity}
            pressure={weather.pressure}
            timezoneOffset={city?.timezone}
            feelsLike={weather.feels_like.eve}
          />
        </ModalSafeAreaView>
      </ScrollView>
    </WeatherBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default FavoriteDayDetailScreen;
