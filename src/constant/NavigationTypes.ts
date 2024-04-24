import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import {
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import type { CityProps, WeatherProps } from "./Types";

export enum RootStackScreens {
  Onboarding = "Onboarding",
  BottomNavigator = "BottomNavigator",
}

export type RootStackScreensParams = {
  [RootStackScreens.Onboarding]: undefined;
  [RootStackScreens.BottomNavigator]: undefined;
};

export type RootNavScreenProps<
  RouteName extends keyof RootStackScreensParams = RootStackScreens
> = StackScreenProps<RootStackScreensParams, RouteName>;

export type RootNavNavigationProp<
  RouteName extends keyof RootStackScreensParams = RootStackScreens
> = StackNavigationProp<RootStackScreensParams, RouteName>;

export type RootNavRouteProp<
  RouteName extends keyof RootStackScreensParams = RootStackScreens
> = RouteProp<RootStackScreensParams, RouteName>;

export enum BottomNavigatorScreens {
  HomeNavigator = "HomeNavigator",
  SearchNavigator = "SearchNavigator",
  FavoriteNavigator = "FavoriteNavigator",
}

export type BottomNavigatorScreensParams = {
  [BottomNavigatorScreens.HomeNavigator]: undefined;
  [BottomNavigatorScreens.SearchNavigator]: undefined;
  [BottomNavigatorScreens.FavoriteNavigator]: undefined;
};

export type BottomNavScreenProps<
  RouteName extends keyof BottomNavigatorScreensParams = BottomNavigatorScreens
> = BottomTabScreenProps<BottomNavigatorScreensParams, RouteName>;

export type BottomNavNavigationProp<
  RouteName extends keyof BottomNavigatorScreensParams = BottomNavigatorScreens
> = BottomTabNavigationProp<BottomNavigatorScreensParams, RouteName>;

export type BottomNavRouteProp<
  RouteName extends keyof BottomNavigatorScreensParams = BottomNavigatorScreens
> = RouteProp<BottomNavigatorScreensParams, RouteName>;

export enum HomeStackScreens {
  Home = "Home",
  HomeDayDetail = "HomeDayDetail",
}

export type HomeStackScreensParams = {
  [HomeStackScreens.Home]: undefined;
  [HomeStackScreens.HomeDayDetail]: {
    city: CityProps | undefined;
    weather: WeatherProps;
  };
};

export type HomeNavScreenProps<
  RouteName extends keyof HomeStackScreensParams = HomeStackScreens
> = StackScreenProps<HomeStackScreensParams, RouteName>;

export type HomeNavNavigationProp<
  RouteName extends keyof HomeStackScreensParams = HomeStackScreens
> = StackNavigationProp<HomeStackScreensParams, RouteName>;

export type HomeNavRouteProp<
  RouteName extends keyof HomeStackScreensParams = HomeStackScreens
> = RouteProp<HomeStackScreensParams, RouteName>;

export enum SearchStackScreens {
  Search = "Search",
  SearchDetail = "SearchDetail",
  SearchDayDetail = "SearchDayDetail",
}

export type SearchStackScreensParams = {
  [SearchStackScreens.Search]: undefined;
  [SearchStackScreens.SearchDetail]: { lat: number; lon: number };
  [SearchStackScreens.SearchDayDetail]: {
    city: CityProps | undefined;
    weather: WeatherProps;
  };
};

export type SearchNavScreenProps<
  RouteName extends keyof SearchStackScreensParams = SearchStackScreens
> = StackScreenProps<SearchStackScreensParams, RouteName>;

export type SearchNavNavigationProp<
  RouteName extends keyof SearchStackScreensParams = SearchStackScreens
> = StackNavigationProp<SearchStackScreensParams, RouteName>;

export type SearchNavRouteProp<
  RouteName extends keyof SearchStackScreensParams = SearchStackScreens
> = RouteProp<SearchStackScreensParams, RouteName>;

export enum FavoriteStackScreens {
  Favorite = "Favorite",
  FavoriteDetail = "FavoriteDetail",
  FavoriteDayDetail = "FavoriteDayDetail",
}

export type FavoriteStackScreensParams = {
  [FavoriteStackScreens.Favorite]: undefined;
  [FavoriteStackScreens.FavoriteDetail]: { lat: number; lon: number };
  [FavoriteStackScreens.FavoriteDayDetail]: {
    city: CityProps | undefined;
    weather: WeatherProps;
  };
};

export type FavoriteNavScreenProps<
  RouteName extends keyof FavoriteStackScreensParams = FavoriteStackScreens
> = StackScreenProps<FavoriteStackScreensParams, RouteName>;

export type FavoriteNavNavigationProp<
  RouteName extends keyof FavoriteStackScreensParams = FavoriteStackScreens
> = StackNavigationProp<FavoriteStackScreensParams, RouteName>;

export type FavoriteNavRouteProp<
  RouteName extends keyof FavoriteStackScreensParams = FavoriteStackScreens
> = RouteProp<FavoriteStackScreensParams, RouteName>;
