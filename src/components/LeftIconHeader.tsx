import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../constants/styles";
import Feather from "@expo/vector-icons/Feather";
import { LabelText } from "./LabelText";
import { Vspacer } from "./Vspacer";
import { colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

export const LeftIconHeader = ({
  title,
  showSeparator = true,
}: {
  title: string;
  showSeparator?: boolean;
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingBottom: 15,
        // borderBottomWidth: showSeparator ? 0.5 : 0,
        // borderColor: colors.border,
      }}
    >
      <Vspacer size={5} />

      <View style={{ paddingHorizontal: 20, ...globalStyles.flexRow, gap: 10 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="black" />
        </Pressable>
        <LabelText title={title} style={{ ...globalStyles.font18SemiBold }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
