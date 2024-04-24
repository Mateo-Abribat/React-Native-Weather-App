import React, { ReactNode } from "react";
import { View, ViewStyle, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ModalSafeAreaViewProps {
  style?: ViewStyle | ViewStyle[];
  children?: ReactNode;
}

function ModalSafeAreaView({
  style,
  children,
}: ModalSafeAreaViewProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const customStyle = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <View
      style={{
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom,
        paddingTop: Platform.OS === "android" ? insets.top : 0,
        ...customStyle,
      }}
    >
      {children}
    </View>
  );
}

export default ModalSafeAreaView;
