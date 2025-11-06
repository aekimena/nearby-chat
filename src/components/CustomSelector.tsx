import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@rneui/themed";
import { LabelText } from "./LabelText";
import { Vspacer } from "./Vspacer";
import { globalStyles } from "../constants/styles";
import Feather from "@expo/vector-icons/Feather";

export const CustomSelector = ({
  label,
  onPress,
  placeholder,
  value,
}: {
  label: string;
  onPress: () => void;
  placeholder: string;
  value?: string;
}) => {
  const { theme } = useTheme();
  return (
    <Pressable onPress={onPress}>
      {label && (
        <>
          <LabelText title={label} style={{ color: theme.colors.grey1 }} />
          <Vspacer size={2} />
        </>
      )}
      <View
        style={{
          borderColor: theme.colors.grey3,
          ...styles.container,
        }}
      >
        <View style={{ flex: 1 }}>
          <LabelText
            title={value || placeholder || ""}
            style={{ color: value ? theme.colors.grey1 : theme.colors.grey3 }}
          />
        </View>
        <Feather name="chevron-down" size={20} color={theme.colors.grey3} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    borderWidth: 0.5,

    borderRadius: 15,
    ...globalStyles.flexRow,
    gap: 10,
    paddingHorizontal: 15,
  },
});
