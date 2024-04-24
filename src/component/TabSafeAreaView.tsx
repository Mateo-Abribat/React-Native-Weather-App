import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabSafeAreaViewProps {
  style?: ViewStyle | ViewStyle[];
  children?: ReactNode;
}

function TabSafeAreaView({
  style,
  children,
}: TabSafeAreaViewProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const customStyle = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        ...customStyle,
      }}
    >
      {children}
    </View>
  );
}

export default TabSafeAreaView;
