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
  icon,
}: {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
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
        ...globalStyles.flexRow,
        gap: 5,
        ...buttonStyle,
      }}
    >
      <LabelText
        title={title}
        style={{ color: "#fff", ...globalStyles.font16Semibold, ...textStyle }}
      />
      {icon && icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
