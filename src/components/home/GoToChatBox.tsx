import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LabelText } from "../LabelText";
import { Vspacer } from "../Vspacer";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import Feather from "@expo/vector-icons/Feather";

export const GoToChatBox = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable style={styles.chatBox} onPress={onPress}>
      <View>
        <View style={{ ...globalStyles.flexRow, gap: 10 }}>
          <LabelText
            title="Go to Chat"
            style={{ ...globalStyles.font16Semibold }}
          />
        </View>
        <Vspacer size={3} />
        <LabelText
          title="Chat with connected users"
          style={{ color: colors.textSecondary }}
        />
      </View>
      <Feather name="chevron-right" size={24} color={colors.iconPrimary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chatBox: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.card,
    ...globalStyles.flexRowBtw,
  },
});
