import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import React, { JSX } from "react";
import { globalStyles } from "../constants/styles";
import { LabelText } from "./LabelText";
import { Vspacer } from "./Vspacer";
import { colors } from "../constants/colors";

export const CustomInput = ({
  placeholder,
  label,
  onChangeText,
  leftIcon,
  isError,
  errorMessage,
  style,
  keyboardType,
  multiLine,
  maxLength,
  disabled,
}: {
  placeholder?: string;
  label?: string;
  onChangeText: (v: string) => void;
  leftIcon?: JSX.Element;
  isError?: boolean;
  errorMessage?: string;
  style?: ViewStyle;
  keyboardType?: KeyboardType;
  multiLine?: boolean;
  maxLength?: number;
  disabled?: boolean;
}) => {
  return (
    <View>
      {label && (
        <>
          <LabelText title={label} style={{ color: colors.textPrimary }} />
          <Vspacer size={2} />
        </>
      )}

      <View
        style={{
          ...styles.container,
          ...globalStyles.flexRow,

          backgroundColor: colors.card,

          ...style,
          // ...(multiLine ? { minHeight: 100, height: "auto" } : {}),

          height: multiLine ? 100 : 50,
          // paddingTop: multiLine ? 10 : 0,
        }}
      >
        {leftIcon && leftIcon}
        <View style={{ flex: 1 }}>
          <TextInput
            onChangeText={onChangeText}
            style={{
              height: "100%",
              backgroundColor: "transparent",
              ...globalStyles.font14Medium,
              fontSize: 15,
              color: colors.black,
              textAlignVertical: multiLine ? "top" : "center",
            }}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            multiline={multiLine}
            maxLength={maxLength || undefined}
            keyboardType={keyboardType || "default"}
            editable={!disabled}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.flexRow,
    gap: 5,

    borderRadius: 10,
    height: 50,
    width: "100%",
    paddingHorizontal: 15,
  },
});
