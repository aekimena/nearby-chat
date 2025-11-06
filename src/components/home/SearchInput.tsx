import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

export const SearchInput = ({
  onPressFilter,
  disabled,
}: {
  onPressFilter: () => void;
  disabled?: boolean;
}) => {
  return (
    <View style={{}}>
      <View style={styles.container}>
        <Feather name="search" size={20} color={colors.iconSecondary} />
        <TextInput
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "transparent",
            ...globalStyles.font14Medium,
          }}
          placeholder="Search"
          placeholderTextColor={colors.textSecondary}
          editable={!disabled}
        />
        <Pressable onPress={onPressFilter}>
          <Octicons name="sliders" size={20} color={colors.iconSecondary} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 15,
    ...globalStyles.flexRow,
    paddingHorizontal: 15,
    gap: 5,
  },
});
