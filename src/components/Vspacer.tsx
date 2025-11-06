import { StyleSheet, Text, View } from "react-native";
import React from "react";

export const Vspacer = ({ size = 20 }: { size?: number }) => {
  return <View style={{ marginVertical: size }}></View>;
};

const styles = StyleSheet.create({});
