import { StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { globalStyles } from "../constants/styles";
import { colors } from "../constants/colors";

export const LabelText = ({
  title,
  style,
  numberOfLines,
}: {
  title: string;
  style?: TextStyle;
  numberOfLines?: number;
}) => {
  return (
    <Text
      numberOfLines={numberOfLines || undefined}
      style={{
        color: colors.textPrimary,
        ...globalStyles.font14Medium,
        ...style,
      }}
    >
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({});
