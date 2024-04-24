import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Keyboard, View, Text } from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { moderateVerticalScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "@component/Header";
import TextArea from "@component/TextArea";
import { GetGeocode } from "@api/Geocoding";
import ListCityItem from "@component/ListCityItem";
import type { GeocodeProps } from "@constant/Types";
import { HEIGHT, WIDTH } from "@constant/Dimensions";
import KeyboardHandler from "@component/KeyboardHandler";
import TabSafeAreaView from "@component/TabSafeAreaView";
import { updateHistory } from "@redux/history/HistorySlice";
import { useAppDispatch, useAppSelector } from "@redux/Hook";
import {
  SearchStackScreens,
  type SearchNavNavigationProp,
} from "@constant/NavigationTypes";

function SearchScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [search, setSearch] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const history = useAppSelector((state) => state.history.history);
  const [geocode, setGeocode] = React.useState<GeocodeProps[]>(history);
  const navigation =
    useNavigation<SearchNavNavigationProp<SearchStackScreens.Search>>();

  const addGeocodeToHistory = async (geocode: GeocodeProps) => {
    try {
      const history = await AsyncStorage.getItem("history");
      const oldHistory = history ? JSON.parse(history) : [];
      const isGeocodeExists = oldHistory.some(
        (item: GeocodeProps) =>
          item.lat === geocode.lat && item.lon === geocode.lon
      );
      if (!isGeocodeExists) {
        const newHistory = [geocode, ...oldHistory];
        await AsyncStorage.setItem("history", JSON.stringify(newHistory));
        dispatch(updateHistory(newHistory));
      }
    } catch (error) {
      console.error("Error while saving geocode to history: ", error);
    }
  };

  const removeGeocodeFromHistory = async (geocode: GeocodeProps) => {
    try {
      const history = await AsyncStorage.getItem("history");
      const oldHistory = history ? JSON.parse(history) : [];
      const newHistory = oldHistory.filter(
        (item: GeocodeProps) =>
          item.lat !== geocode.lat && item.lon !== geocode.lon
      );
      await AsyncStorage.setItem("history", JSON.stringify(newHistory));
      dispatch(updateHistory(newHistory));
    } catch (error) {
      console.error("Error while removing geocode from history: ", error);
    }
  };

  const handlePress = (geocode: GeocodeProps) => {
    addGeocodeToHistory(geocode);
    navigation.navigate(SearchStackScreens.SearchDetail, {
      lat: geocode.lat,
      lon: geocode.lon,
    });
  };

  const requestGetGeocode = async () => {
    const response = await GetGeocode(search.trim().toLowerCase());
    if (response?.status === 200) {
      setGeocode(response.data);
    } else {
      setGeocode([]);
      console.error("Error while fetching geocode:", response?.status);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (search.length >= 1) {
      setLoading(true);
      setGeocode(Array(5).fill({}));
      const timer = setTimeout(() => {
        requestGetGeocode();
      }, 800);

      return () => {
        setLoading(false);
        clearTimeout(timer);
      };
    }
  }, [search]);

  useEffect(() => {
    search.length < 1 && setGeocode(history);
  }, [history, search]);

  const renderItem: ListRenderItem<GeocodeProps> = ({ item }) => {
    return (
      <ListCityItem
        city={item.name}
        loading={loading}
        state={item.state}
        country={item.country}
        isHistory={search.length < 1}
        onPress={() => handlePress(item)}
        onPressRemove={() => removeGeocodeFromHistory(item)}
      />
    );
  };

  const empty = () => {
    return (
      <View style={styles.empty}>
        <LottieView
          loop
          autoPlay
          style={styles.lottie}
          source={require("@assets/lottie/World.json")}
        />
        <Text style={styles.text}>Recherchez la ville de votre choix</Text>
      </View>
    );
  };

  const separator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <KeyboardHandler>
      <TabSafeAreaView style={styles.container}>
        <Header title="Rechercher une ville" />
        <TextArea
          value={search}
          loading={loading}
          autoComplete="off"
          keyboardType="default"
          returnKeyType="search"
          textContentType="none"
          onChangeText={setSearch}
          label="Rechercher une ville"
        />
        <View style={styles.body}>
          {search.length < 1 && geocode.length >= 1 && (
            <Text style={styles.text}>Votre historique :</Text>
          )}
          <FlashList
            data={geocode}
            estimatedItemSize={5}
            renderItem={renderItem}
            scrollEnabled={!loading}
            ListEmptyComponent={empty}
            extraData={{ loading, search }}
            ItemSeparatorComponent={separator}
            showsVerticalScrollIndicator={!loading}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: moderateVerticalScale(10) }}
            onScroll={() => {
              Keyboard.dismiss();
            }}
          />
        </View>
      </TabSafeAreaView>
    </KeyboardHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  body: {
    flex: 1,
    justifyContent: "center",
    marginTop: moderateVerticalScale(20),
  },

  empty: {
    width: WIDTH,
    height: HEIGHT / 2,
    alignItems: "center",
    justifyContent: "center",
  },

  lottie: {
    width: "100%",
    height: "70%",
  },

  separator: {
    height: moderateVerticalScale(10),
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: moderateVerticalScale(10),
  },
});

export default SearchScreen;
