import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBar from "./TabBar";
import HomeNavigator from "./HomeNavigator";
import SearchNavigator from "./SearchNavigator";
import FavoriteNavigator from "./FavoriteNavigator";
import { BottomNavigatorScreens } from "@constant/NavigationTypes";

function BottomNavigator(): React.JSX.Element {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      backBehavior="none"
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName={BottomNavigatorScreens.HomeNavigator}
      screenOptions={() => ({
        tabBarShowLabel: false,
        keyboardHidesTabBar: true,
      })}
    >
      <Tab.Screen
        name={BottomNavigatorScreens.HomeNavigator}
        component={HomeNavigator}
        options={() => ({ headerShown: false })}
      />
      <Tab.Screen
        name={BottomNavigatorScreens.SearchNavigator}
        component={SearchNavigator}
        options={() => ({ headerShown: false })}
      />
      <Tab.Screen
        name={BottomNavigatorScreens.FavoriteNavigator}
        component={FavoriteNavigator}
        options={() => ({ headerShown: false })}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
