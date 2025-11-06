import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";

export const ScreenLayout = ({
  children,
  backgroundColor,
  translucent = false,
  statusBarBackgroundColor = "transparent",
}: {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  translucent?: boolean;
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor || colors.white,
      }}
    >
      <StatusBar
        translucent={translucent}
        backgroundColor={statusBarBackgroundColor || "transparent"}
        barStyle="dark-content"
      />

      {!translucent && (
        <View style={{ paddingTop: StatusBar?.currentHeight || 20 }} />
      )}

      {children}
    </View>
  );
};

const styles = StyleSheet.create({});
