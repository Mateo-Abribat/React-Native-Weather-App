import { Theme } from "@react-navigation/native";

import {
  GRAY,
  WHITE,
  BLACK,
  VIOLET,
  DARK_GRAY,
  LIGHT_GRAY,
} from "@style/Colors";

export const NavigationTheme: Theme = {
  dark: false,
  colors: {
    text: BLACK,
    border: GRAY,
    primary: VIOLET,
    card: LIGHT_GRAY,
    background: WHITE,
    notification: DARK_GRAY,
  },
};
