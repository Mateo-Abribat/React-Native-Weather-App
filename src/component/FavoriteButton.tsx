import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";

import { VIOLET } from "@style/Colors";

interface FavoriteButtonProps {
  onPress: () => void;
  icon: "heart-outline" | "heart";
}

function FavoriteButton({
  icon,
  onPress,
}: FavoriteButtonProps): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.button}
    >
      <Ionicons color={VIOLET} name={icon} size={moderateScale(25)} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginRight: 16,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "center",
    marginTop: moderateVerticalScale(20),
    backgroundColor: "rgba(187, 11, 222, 0.25)",
  },
});

export default FavoriteButton;
