import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenNames } from "./routes";
import SplashScreen from "../screens/auth/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import { useSelector } from "react-redux";
import { selectSplashSeen } from "../storeServices/auth/authReducer";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const isSplashSeen = useSelector(selectSplashSeen);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isSplashSeen && (
        <Stack.Screen
          name={screenNames.splashScreen}
          component={SplashScreen}
        />
      )}
      <Stack.Screen name={screenNames.login} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
