import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListingProp } from "../../types/listing";
import { colors } from "../../constants/colors";
import { LabelText } from "../LabelText";
import { globalStyles } from "../../constants/styles";
import { Vspacer } from "../Vspacer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../../navigation/routes";

export const ListingItem = ({ item }: { item: ListingProp }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate(screenNames.screens, {
          screen: screenNames.listingDetails,
          params: { id: "123" },
        })
      }
      style={{ borderRadius: 10, backgroundColor: colors.card, padding: 15 }}
    >
      <View style={{ height: 150, width: "100%" }}>
        <Image
          source={{ uri: item.image }}
          style={{ height: "100%", width: "100%", borderRadius: 10 }}
        />
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <LabelText
            title={item.category}
            style={{
              ...globalStyles.font12Medium,
              color: colors.textPrimary,
            }}
          />
        </View>
      </View>
      <Vspacer size={5} />
      <LabelText
        title={item.title}
        style={{ ...globalStyles.font16Semibold, fontSize: 15 }}
        numberOfLines={2}
      />
      <Vspacer size={3} />
      <View style={{ ...globalStyles.flexRow, gap: 3 }}>
        <MaterialIcons
          name="location-pin"
          size={15}
          color={colors.iconSecondary}
        />
        <LabelText
          title={item.location}
          style={{
            ...globalStyles.font12Medium,
            color: colors.textSecondary,
          }}
        />
      </View>
      <Vspacer size={3} />
      <View style={{ ...globalStyles.flexRow, gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...globalStyles.font16Semibold,
              fontSize: 15,
              color: colors.textPrimary,
            }}
          >
            ₦{item.price.toLocaleString()}{" "}
            <Text
              style={{
                ...globalStyles.font12Medium,
                color: colors.textSecondary,
              }}
            >
              /month
            </Text>
          </Text>
        </View>
        {/* <Pressable>
          <Fontisto name="heart-alt" size={15} color={colors.iconPrimary} />
        </Pressable> */}
        <View style={styles.rating}>
          <AntDesign name="star" size={12} color={colors.amber} />
          <LabelText title={item.rating.toString()} style={{ fontSize: 12 }} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rating: {
    ...globalStyles.flexRow,
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    backgroundColor: "#fff",
    // position: "absolute",
    // top: 10,
    // right: 10,
  },
});
