import React, { ReactNode } from "react";
import {
  Platform,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

interface KeyboardHandlerProps {
  children?: ReactNode;
}

function KeyboardHandler({
  children,
}: KeyboardHandlerProps): React.JSX.Element {
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "android" ? undefined : "padding"}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardHandler;
