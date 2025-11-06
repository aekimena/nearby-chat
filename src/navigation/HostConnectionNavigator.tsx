import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { screenNames } from "./routes";
import HostDetails from "../screens/hostConnection/HostDetails";
import HostChatScreen from "../screens/hostConnection/HostChatScreen";
import { ScreenLayout } from "../components/layout/ScreenLayout";
import { globalStyles } from "../constants/styles";
import { colors } from "../constants/colors";
import { LeftIconHeader } from "../components/LeftIconHeader";

const Tab = createMaterialTopTabNavigator();

const HostConnectionNavigator = () => {
  return (
    <ScreenLayout>
      <LeftIconHeader title="Host a Connection" />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { ...globalStyles.font16Semibold },
          tabBarStyle: { backgroundColor: colors.white },
          tabBarIndicatorStyle: { backgroundColor: colors.primary },
          swipeEnabled: false,
          tabBarActiveTintColor: colors.textPrimary,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tab.Screen
          name={screenNames.hostDetails}
          component={HostDetails}
          options={{ title: "Details" }}
        />
        <Tab.Screen
          name={screenNames.hostChat}
          component={HostChatScreen}
          options={{ title: "Chat" }}
        />
      </Tab.Navigator>
    </ScreenLayout>
  );
};

export default HostConnectionNavigator;

const styles = StyleSheet.create({});
