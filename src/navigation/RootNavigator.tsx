import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useAppSelector } from "@redux/Hook";
import SplashScreen from "@screen/SplashScreen";
import BottomNavigator from "./BottomNavigator";
import { RootStackScreens } from "@constant/NavigationTypes";

function RootNavigator(): React.JSX.Element {
  const Stack = createStackNavigator();
  const status = useAppSelector((state) => state.application.status);

  if (status === "loading") {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RootStackScreens.BottomNavigator}
        component={BottomNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
