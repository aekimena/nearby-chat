import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../constants/styles";
import Feather from "@expo/vector-icons/Feather";
import { Vspacer } from "./Vspacer";
import { LabelText } from "./LabelText";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";

export const LeftCenterHeader = ({ title }: { title: string }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderColor: colors.border,
      }}
    >
      <Vspacer size={5} />

      <View
        style={{
          paddingHorizontal: 20,
          ...globalStyles.flexRowCenter,
          gap: 10,
        }}
      >
        <Pressable
          style={{ position: "absolute", left: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={24} color="black" />
        </Pressable>
        <LabelText title={title} style={{ ...globalStyles.font18SemiBold }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
