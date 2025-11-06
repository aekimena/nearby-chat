import React from "react";
import { View, Pressable, Image } from "react-native";
import { globalStyles } from "../../constants/styles";
import { LabelText } from "../LabelText";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "../../constants/colors";

export const ConnectionCard = ({
  iconUri,
  title,
  subtitle,
  warningText,
  onPress,
}: {
  iconUri: string;
  title: string;
  subtitle: string;
  warningText: string;
  onPress: () => void;
}) => {
  return (
    <Pressable style={[styles.card]} onPress={onPress}>
      <View style={{ flex: 1, ...globalStyles.flexRow, gap: 10 }}>
        <Image source={{ uri: iconUri }} style={{ height: 50, width: 50 }} />

        <View style={{ flex: 1, gap: 5 }}>
          <LabelText title={title} style={globalStyles.font16Bold} />
          <LabelText title={subtitle} />

          {warningText && (
            <View
              style={{
                ...globalStyles.flexRow,
                gap: 5,
                marginTop: 5,
              }}
            >
              <Entypo name="warning" size={15} color={"#E1AF3B"} />
              <LabelText
                title={warningText}
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                }}
              />
            </View>
          )}
        </View>
      </View>

      <AntDesign name="arrow-right" size={15} color="black" />
    </Pressable>
  );
};

const styles = {
  card: {
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 10,
    ...globalStyles.flexRow,
    gap: 15,
  },
};
