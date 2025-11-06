import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { useSelector } from "react-redux";
import { selectUser } from "../../storeServices/auth/authReducer";
import { LabelText } from "../LabelText";
import { colors } from "../../constants/colors";

export const Header = () => {
  const user = useSelector(selectUser);
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 15,
        ...globalStyles.flexRow,
        gap: 15,
      }}
    >
      {/* <Pressable>
        <Image
          source={{ uri: `data:image/png;base64,${user.image}` }}
          style={{ height: 50, width: 50, borderRadius: 50 }}
        />
      </Pressable>
      <View>
        <LabelText
          title="Welcome back,"
          style={{ ...globalStyles.font12Medium, color: colors.textSecondary }}
        />
        <LabelText
          title={user?.name}
          style={{ ...globalStyles.font18SemiBold }}
        />
      </View> */}
      <View style={{ gap: 3, flex: 1 }}>
        <LabelText title="NearbyChat" style={{ ...globalStyles.font20Bold }} />
        <LabelText
          title="Connect & chat instantly — no internet needed!"
          style={{ color: colors.textSecondary }}
        />
      </View>
      <Pressable>
        <Image
          source={{ uri: `data:image/png;base64,${user.image}` }}
          style={{ height: 50, width: 50, borderRadius: 50 }}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});
