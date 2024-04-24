import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FavoriteScreen from "@screen/favorite/Favorite";
import { FavoriteStackScreens } from "@constant/NavigationTypes";
import FavoriteDetailScreen from "@screen/favorite/FavoriteDetail";
import FavoriteDayDetailScreen from "@screen/favorite/FavoriteDayDetail";

function FavoriteNavigator(): React.JSX.Element {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name={FavoriteStackScreens.Favorite}
          component={FavoriteScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={FavoriteStackScreens.FavoriteDetail}
          component={FavoriteDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name={FavoriteStackScreens.FavoriteDayDetail}
          component={FavoriteDayDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default FavoriteNavigator;
