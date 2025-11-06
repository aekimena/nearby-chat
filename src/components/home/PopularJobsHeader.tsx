import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { LabelText } from "../LabelText";
import { Vspacer } from "../Vspacer";
import { timeAgo } from "../../utils/helpers";
import { useTheme } from "@rneui/themed";
import Feather from "@expo/vector-icons/Feather";

export const PopularJobsHeader = () => {
  const { theme } = useTheme();

  // get this from server instead
  const now = new Date();
  const lastUpdated = new Date(now.getTime() - 30 * 1000);
  return (
    <View style={{ paddingHorizontal: 20, ...globalStyles.flexRow }}>
      <View style={{ ...globalStyles.flexRow }}>
        <View style={{ flex: 1 }}>
          <LabelText
            title="Popular jobs"
            style={{ ...globalStyles.font20Semibold, fontSize: 30 }}
          />
          <Vspacer size={3} />
          <Text
            style={{
              ...globalStyles.font14Medium,
              color: theme.colors.grey2,
            }}
          >
            Last updated{" "}
            <Text
              style={{
                ...globalStyles.font14Semibold,

                color: theme.colors.grey1,
              }}
            >
              {timeAgo(lastUpdated)}
            </Text>
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Feather name="arrow-up-right" size={35} color={theme.colors.grey3} />
          <Vspacer size={3} />
          <View style={{ ...globalStyles.flexRow, gap: 3 }}>
            <View
              style={{
                height: 5,
                width: 5,
                borderRadius: 10,
                backgroundColor: theme.colors.grey2,
              }}
            />
            <LabelText
              title="15 New"
              style={{
                ...globalStyles.font14Semibold,

                color: theme.colors.grey1,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
