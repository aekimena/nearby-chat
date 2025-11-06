import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { LabelText } from "./LabelText";
import { colors } from "../constants/colors";
import { globalStyles } from "../constants/styles";

export const CustomButton = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
}: {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 50,
        width: "100%",
        borderRadius: 10,
        backgroundColor: colors.primary,
        ...globalStyles.allCenter,
        ...buttonStyle,
      }}
    >
      <LabelText title={title} style={{ color: "#fff", ...textStyle }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
