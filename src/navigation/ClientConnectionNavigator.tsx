import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { screenNames } from "./routes";
import { ScreenLayout } from "../components/layout/ScreenLayout";
import { globalStyles } from "../constants/styles";
import { colors } from "../constants/colors";
import { LeftIconHeader } from "../components/LeftIconHeader";
import ClientDetails from "../screens/clientConnection/ClientDetails";
import ClientChatScreen from "../screens/clientConnection/ClientChatScreen";
import { AuthenticationModal } from "../modals/AuthenticationModal";

const Tab = createMaterialTopTabNavigator();

const ClientConnectionNavigator = () => {
  return (
    <ScreenLayout>
      <>
        <LeftIconHeader title="Join a Connection" />
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
            name={screenNames.clientDetails}
            component={ClientDetails}
            options={{ title: "Details" }}
          />
          <Tab.Screen
            name={screenNames.clientChat}
            component={ClientChatScreen}
            options={{ title: "Chat" }}
          />
        </Tab.Navigator>
        <AuthenticationModal />
      </>
    </ScreenLayout>
  );
};

export default ClientConnectionNavigator;

const styles = StyleSheet.create({});
