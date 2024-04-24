import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Keyboard, View, Text } from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { moderateVerticalScale } from "react-native-size-matters";

import Header from "@component/Header";
import { useAppSelector } from "@redux/Hook";
import type { CityProps } from "@constant/Types";
import ListCityItem from "@component/ListCityItem";
import { HEIGHT, WIDTH } from "@constant/Dimensions";
import KeyboardHandler from "@component/KeyboardHandler";
import TabSafeAreaView from "@component/TabSafeAreaView";
import {
  FavoriteStackScreens,
  type FavoriteNavNavigationProp,
} from "@constant/NavigationTypes";

function FavoriteScreen(): React.JSX.Element {
  const favorite = useAppSelector((state) => state.favorite.favorite);
  const navigation =
    useNavigation<FavoriteNavNavigationProp<FavoriteStackScreens.Favorite>>();

  const handlePress = (city: CityProps) => {
    navigation.navigate(FavoriteStackScreens.FavoriteDetail, {
      lat: city.coord.lat,
      lon: city.coord.lon,
    });
  };

  const renderItem: ListRenderItem<CityProps> = ({ item }) => {
    return (
      <ListCityItem
        city={item.name}
        country={item.country}
        onPress={() => handlePress(item)}
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
          source={require("@assets/lottie/Empty.json")}
        />
        <Text style={styles.text}>
          Vous pouvez ajouter des favoris pour les voir apparaîtrent ici
        </Text>
      </View>
    );
  };

  const separator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <KeyboardHandler>
      <TabSafeAreaView style={styles.container}>
        <Header title="Vos favoris" />
        <View style={styles.body}>
          <FlashList
            data={favorite}
            estimatedItemSize={20}
            renderItem={renderItem}
            ListEmptyComponent={empty}
            ItemSeparatorComponent={separator}
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
  },

  empty: {
    width: WIDTH,
    height: HEIGHT / 1.7,
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
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: moderateVerticalScale(10),
  },
});

export default FavoriteScreen;
