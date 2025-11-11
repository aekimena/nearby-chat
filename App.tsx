import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { ConnectionProvider } from "./src/contexts/ConnectionContext";
import { Provider } from "react-redux";
import store, { persistor } from "./src/store/configureStore";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSansBold: require("./src/assets/fonts/OpenSans-Bold.ttf"),
    OpenSansLight: require("./src/assets/fonts/OpenSans-Light.ttf"),
    OpenSansMedium: require("./src/assets/fonts/OpenSans-Medium.ttf"),
    OpenSansSemiBold: require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null; // or a splash/loading component
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ConnectionProvider>
            <NavigationContainer onReady={() => SplashScreen.hide()}>
              <AppNavigator />
            </NavigationContainer>
          </ConnectionProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});
