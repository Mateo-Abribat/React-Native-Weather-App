import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { LocationObjectCoords } from "expo-location";
import { moderateVerticalScale } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GetWeather } from "@api/Weather";
import WeatherCard from "@component/WeatherCard";
import ForecastCard from "@component/ForecastCard";
import WeatherHeader from "@component/WeatherHeader";
import OtherInfosCard from "@component/OtherInfosCard";
import TabSafeAreaView from "@component/TabSafeAreaView";
import WeatherBackground from "@component/WeatherBackground";
import PrecipitationCard from "@component/PrecipitationCard";
import { useAppDispatch, useAppSelector } from "@redux/Hook";
import type { CityProps, ToasterType, WeatherProps } from "@constant/Types";
import {
  HomeStackScreens,
  type HomeNavNavigationProp,
} from "@constant/NavigationTypes";
import {
  updateState,
  updateVisibility,
  updateDescription,
} from "@redux/toaster/ToasterSlice";

function HomeScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState<boolean>(true);
  const location = useAppSelector((state) => state.weather.location);
  const [city, setCity] = useState<CityProps | undefined>(undefined);
  const [weather, setWeather] = useState<WeatherProps | undefined>(undefined);
  const navigation =
    useNavigation<HomeNavNavigationProp<HomeStackScreens.Home>>();
  const [forecast, setForecast] = useState<WeatherProps[] | undefined>(
    undefined
  );
  const [actualLocation, setActualLocation] = useState<
    LocationObjectCoords | undefined
  >(undefined);

  const handleToaster = (state: ToasterType, description: string) => {
    dispatch(updateState(state));
    dispatch(updateDescription(description));
    dispatch(updateVisibility(true));
  };

  const handlePress = (weather: WeatherProps) => {
    navigation.navigate(HomeStackScreens.HomeDayDetail, {
      city,
      weather,
    });
  };

  const requestGetWeather = async () => {
    if (
      location?.latitude === actualLocation?.latitude &&
      location?.longitude === actualLocation?.longitude
    ) {
      return;
    } else if (location) {
      setLoading(true);
      setForecast(Array(10).fill({}));
      const response = await GetWeather(location.latitude, location.longitude);
      if (response?.status === 200) {
        setActualLocation(location);
        setCity(response.data.city);
        if (Array.isArray(response.data.list)) {
          setWeather(response.data.list[0]);
          setForecast(response.data.list.slice(1));
        }
      } else {
        setForecast(undefined);
        console.error("Error while fetching weather:", response?.status);
        handleToaster("failure", "Erreur lors de la récupération de la météo");
      }
      setLoading(false);
    } else {
      console.error("Error while getting location");
      handleToaster(
        "failure",
        "Vous devez activer la localisation pour utiliser ce service"
      );
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      requestGetWeather();
    });

    return unsubscribe;
  }, [navigation, actualLocation, location]);

  return (
    <WeatherBackground icon={weather?.weather[0].icon ?? "01d"}>
      <ScrollView
        scrollEnabled={!loading}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom:
            moderateVerticalScale(45) +
            moderateVerticalScale(10) +
            insets.bottom,
        }}
      >
        <TabSafeAreaView style={styles.container}>
          <WeatherHeader
            loading={loading}
            title="Aujourd'hui"
            subtitle="Votre position"
          />
          <WeatherCard
            loading={loading}
            city={city?.name}
            icon={weather?.weather[0].icon}
            temperature={weather?.temp.eve}
            minTemperature={weather?.temp.min}
            maxTemperature={weather?.temp.max}
            description={weather?.weather[0].description}
          />
          {(weather?.rain || weather?.snow) && (
            <PrecipitationCard
              rain={weather.rain}
              snow={weather.snow}
              probability={weather.pop}
            />
          )}
          <ForecastCard
            data={forecast}
            loading={loading}
            onPress={(item) => handlePress(item)}
          />
          <OtherInfosCard
            deg={weather?.deg}
            gust={weather?.gust}
            speed={weather?.speed}
            clouds={weather?.clouds}
            sunset={weather?.sunset}
            sunrise={weather?.sunrise}
            humidity={weather?.humidity}
            pressure={weather?.pressure}
            timezoneOffset={city?.timezone}
            feelsLike={weather?.feels_like.eve}
          />
        </TabSafeAreaView>
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

export default HomeScreen;
