import React from "react";
import { RouteProp } from "@react-navigation/native";
import {
  StackScreenProps,
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";

import HomeScreen from "@screen/home/Home";
import HomeDayDetailScreen from "@screen/home/HomeDayDetail";
import { HomeStackScreens } from "@constant/NavigationTypes";

function HomeNavigator(): React.JSX.Element {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name={HomeStackScreens.Home}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name={HomeStackScreens.HomeDayDetail}
          component={HomeDayDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default HomeNavigator;
