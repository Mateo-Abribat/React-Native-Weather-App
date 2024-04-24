import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "@screen/search/Search";
import SearchDetailScreen from "@screen/search/SearchDetail";
import { SearchStackScreens } from "@constant/NavigationTypes";
import SearchDayDetailScreen from "@screen/search/SearchDayDetail";

function SearchNavigator(): React.JSX.Element {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name={SearchStackScreens.Search}
          component={SearchScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={SearchStackScreens.SearchDetail}
          component={SearchDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name={SearchStackScreens.SearchDayDetail}
          component={SearchDayDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default SearchNavigator;
