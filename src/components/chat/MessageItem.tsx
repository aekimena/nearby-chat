import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { screenWidth } from "../../constants/constants";
import { colors } from "../../constants/colors";
import { LabelText } from "../LabelText";
import { globalStyles } from "../../constants/styles";

export const MessageItem = ({ item }: { item: any }) => {
  return (
    <Pressable
      style={{
        padding: 10,
        borderRadius: 10,
        backgroundColor: item.deviceId == "1" ? colors.primary : colors.card,
        minWidth: 100,
        maxWidth: screenWidth * 0.7,
        alignSelf: item.deviceId == "1" ? "flex-end" : "flex-start",
      }}
    >
      {item.deviceId !== "1" && (
        <LabelText
          title="~ KIMENA"
          style={{
            ...globalStyles.font14Bold,
            fontSize: 8,
            textAlign: "right",
          }}
        />
      )}
      <LabelText
        title={item.text}
        style={{ color: item.deviceId == "1" ? "#fff" : colors.textPrimary }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({});
