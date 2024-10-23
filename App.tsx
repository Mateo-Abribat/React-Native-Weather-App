import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Container from "Container";
import { Store } from "@redux/Store";

export default function App() {
  return (
    <Provider store={Store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Container />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
