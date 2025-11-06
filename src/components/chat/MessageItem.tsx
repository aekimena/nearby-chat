import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { screenWidth } from "../../constants/constants";
import { colors } from "../../constants/colors";
import { LabelText } from "../LabelText";
import { globalStyles } from "../../constants/styles";
import { useSelector } from "react-redux";
import { selectUser } from "../../storeServices/auth/authReducer";

export const MessageItem = ({ item }: { item: any }) => {
  const user = useSelector(selectUser);
  return (
    <Pressable
      style={{
        padding: 10,
        borderRadius: 10,
        backgroundColor:
          item.deviceId == user?.deviceId ? colors.primary : colors.card,
        minWidth: 100,
        maxWidth: screenWidth * 0.7,
        alignSelf: item.deviceId == user?.deviceId ? "flex-end" : "flex-start",
      }}
    >
      {item.deviceId !== user?.deviceId && (
        <LabelText
          title={`~ ${item?.name}`}
          style={{
            ...globalStyles.font14Bold,
            fontSize: 8,
            textAlign: "right",
          }}
        />
      )}
      <LabelText
        title={item.message}
        style={{
          color: item.deviceId == user?.deviceId ? "#fff" : colors.textPrimary,
        }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({});
