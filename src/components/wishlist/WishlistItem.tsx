import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListingProp } from "../../types/listing";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import { LabelText } from "../LabelText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Vspacer } from "../Vspacer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../../navigation/routes";

export const WishlistItem = ({ item }: { item: ListingProp }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate(screenNames.screens, {
          screen: screenNames.listingDetails,
          params: { id: "123" },
        })
      }
      style={{
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.card,
        ...globalStyles.flexRow,
        gap: 10,
      }}
    >
      <Image
        source={{ uri: item?.image }}
        style={{ borderRadius: 10, width: 100, height: 120 }}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{ ...globalStyles.flexRow, gap: 10, alignItems: "flex-start" }}
        >
          <View style={{ flex: 1, gap: 10 }}>
            <LabelText
              title={item?.category}
              style={{ ...globalStyles.font12Medium, color: colors.primary }}
            />
            <LabelText
              title={item.title}
              numberOfLines={1}
              style={{ ...globalStyles.font16Semibold, fontSize: 15 }}
            />
          </View>
          <Pressable>
            {item.isLiked ? (
              <Ionicons name="heart" size={18} color={colors.negative} />
            ) : (
              <Ionicons
                name="heart-outline"
                size={18}
                color={colors.iconPrimary}
              />
            )}
          </Pressable>
        </View>
        <Vspacer size={5} />
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
        <Vspacer size={5} />
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

          <View style={styles.rating}>
            <AntDesign name="star" size={12} color={colors.amber} />
            <LabelText
              title={item.rating.toString()}
              style={{ fontSize: 12 }}
            />
          </View>
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
