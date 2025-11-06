import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ListingProp } from "../../types/listing";
import { screenWidth } from "../../constants/constants";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LabelText } from "../LabelText";
import { Vspacer } from "../Vspacer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../../navigation/routes";

export const RecommendationsItem = ({ item }: { item: ListingProp }) => {
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
        width: screenWidth * 0.55,
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.card,
      }}
    >
      <View style={{ height: 120, width: "100%" }}>
        <Image
          source={{ uri: item.image }}
          style={{
            height: 120,
            //   backgroundColor: "grey",
            width: "100%",
            borderRadius: 10,
          }}
        />

        <View style={styles.rating}>
          <AntDesign name="star" size={12} color={colors.amber} />
          <LabelText title={item.rating.toString()} style={{ fontSize: 12 }} />
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <LabelText
          title={item.category}
          style={{
            ...globalStyles.font12Medium,
            marginTop: 10,
            color: colors.primary,
          }}
        />

        <LabelText
          title={item.title}
          numberOfLines={1}
          style={{ ...globalStyles.font16Semibold, fontSize: 15 }}
        />

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
          <Pressable>
            <Fontisto name="heart-alt" size={15} color={colors.iconPrimary} />
          </Pressable>
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
    position: "absolute",
    top: 10,
    right: 10,
  },
});
