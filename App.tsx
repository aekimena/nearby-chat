import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { BleProvider } from "./src/contexts/BleContext";
import { ConnectionProvider } from "./src/contexts/ConnectionContext";
import { Provider } from "react-redux";
import store from "./src/store/configureStore";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
      <SafeAreaProvider>
        <ConnectionProvider>
          {/* <BleProvider> */}
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
          {/* </BleProvider> */}
        </ConnectionProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
