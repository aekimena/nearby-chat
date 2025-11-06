import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenNames } from "./routes";
import HomeScreen from "../screens/home/HomeScreen";
import HostConnectionNavigator from "./HostConnectionNavigator";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.homeScreen} component={HomeScreen} />
      <Stack.Screen
        name={screenNames.host}
        component={HostConnectionNavigator}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
