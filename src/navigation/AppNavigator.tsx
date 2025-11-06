import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainNavigator from "./MainNavigator";
import { screenNames } from "./routes";
import { useSelector } from "react-redux";
import { selectUser } from "../storeServices/auth/authReducer";
import AuthNavigator from "./AuthNavigator";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const user = useSelector(selectUser);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name={screenNames.main} component={MainNavigator} />
      ) : (
        <Stack.Screen name={screenNames.auth} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
