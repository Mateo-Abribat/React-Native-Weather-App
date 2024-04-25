import { StyleSheet, ScrollView, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateVerticalScale } from "react-native-size-matters";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GetWeather } from "@api/Weather";
import { WIDTH } from "@constant/Dimensions";
import BackButton from "@component/BackButton";
import WeatherCard from "@component/WeatherCard";
import ForecastCard from "@component/ForecastCard";
import WeatherHeader from "@component/WeatherHeader";
import OtherInfosCard from "@component/OtherInfosCard";
import FavoriteButton from "@component/FavoriteButton";
import WeatherBackground from "@component/WeatherBackground";
import PrecipitationCard from "@component/PrecipitationCard";
import { useAppDispatch, useAppSelector } from "@redux/Hook";
import { updateFavorite } from "@redux/favorite/FavoriteSlice";
import type { CityProps, ToasterType, WeatherProps } from "@constant/Types";
import {
  updateState,
  updateVisibility,
  updateDescription,
} from "@redux/toaster/ToasterSlice";
import {
  FavoriteStackScreens,
  type FavoriteNavRouteProp,
  type FavoriteNavNavigationProp,
} from "@constant/NavigationTypes";

function FavoriteDetailScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [city, setCity] = useState<CityProps | undefined>(undefined);
  const favorite = useAppSelector((state) => state.favorite.favorite);
  const [weather, setWeather] = useState<WeatherProps | undefined>(undefined);
  const route =
    useRoute<FavoriteNavRouteProp<FavoriteStackScreens.FavoriteDetail>>();
  const navigation =
    useNavigation<
      FavoriteNavNavigationProp<FavoriteStackScreens.FavoriteDetail>
    >();
  const [forecast, setForecast] = useState<WeatherProps[] | undefined>(
    undefined
  );
  const lat = useMemo(() => {
    return route.params.lat;
  }, [route.params.lat]);
  const lon = useMemo(() => {
    return route.params.lon;
  }, [route.params.lon]);

  const handleToaster = (state: ToasterType, description: string) => {
    dispatch(updateState(state));
    dispatch(updateDescription(description));
    dispatch(updateVisibility(true));
  };

  const modifyFavorite = async () => {
    try {
      const favorite = await AsyncStorage.getItem("favorite");
      const oldFavorite = favorite ? JSON.parse(favorite) : [];
      const isCityExists = oldFavorite.some(
        (item: CityProps) => item.id === city?.id
      );
      if (!isCityExists) {
        const newFavorite = [...oldFavorite, city];
        await AsyncStorage.setItem("favorite", JSON.stringify(newFavorite));
        dispatch(updateFavorite(newFavorite));
        handleToaster("success", "La ville a été ajoutée à vos favoris");
      } else {
        const newFavorite = oldFavorite.filter(
          (item: CityProps) => item.id !== city?.id
        );
        await AsyncStorage.setItem("favorite", JSON.stringify(newFavorite));
        dispatch(updateFavorite(newFavorite));
        handleToaster("success", "La ville a été retirée de vos favoris");
      }
    } catch (error) {
      console.error("Error while saving city to favorite: ", error);
    }
  };

  const handlePress = (weather: WeatherProps) => {
    navigation.navigate(FavoriteStackScreens.FavoriteDayDetail, {
      city,
      weather,
    });
  };

  const requestGetWeather = async () => {
    if (lat && lon) {
      setLoading(true);
      setForecast(Array(10).fill({}));
      const response = await GetWeather(lat, lon);
      if (response?.status === 200) {
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
      handleToaster("failure", "Une erreur inconnue est survenue");
    }
  };

  useEffect(() => {
    requestGetWeather();
  }, [lat, lon]);

  return (
    <WeatherBackground
      loading={loading}
      icon={weather?.weather[0].icon ?? "default"}
    >
      <ScrollView
        scrollEnabled={!loading}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateVerticalScale(45) + moderateVerticalScale(10),
        }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.buttoncontainer}>
            <BackButton icon="arrow-back" />
            <FavoriteButton
              onPress={modifyFavorite}
              icon={
                favorite.some((item) => item.id === city?.id)
                  ? "heart"
                  : "heart-outline"
              }
            />
          </View>
          <WeatherHeader
            loading={loading}
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
            loading={loading}
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
        </SafeAreaView>
      </ScrollView>
    </WeatherBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  buttoncontainer: {
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default FavoriteDetailScreen;
