import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LabelText } from "../LabelText";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const DetailsBox = ({
  label,
  title,
  onCopy,
}: {
  label: string;
  title: string;
  onCopy: () => void;
}) => {
  return (
    <View style={{ gap: 10 }}>
      <LabelText title={label} />
      <View style={styles.box}>
        <LabelText title={title} style={{ ...globalStyles.font14Semibold }} />
        <Pressable onPress={onCopy}>
          <MaterialIcons
            name="file-copy"
            size={16}
            color={colors.iconPrimary}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.card,
    ...globalStyles.flexRowBtw,
  },
});
