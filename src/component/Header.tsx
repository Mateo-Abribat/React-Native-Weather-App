import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps): React.JSX.Element {
  return (
    <View style={styles.header}>
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 25,
    marginVertical: moderateVerticalScale(26),
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Header;
