import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../storeServices/auth/authReducer";
import { Header } from "../../components/home/Header";
import { Vspacer } from "../../components/Vspacer";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";

import { ConnectionCard } from "../../components/home/ConnectionCard";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../../navigation/routes";
import { generateInviteCode, generatePort } from "../../utils/networkUtils";
import { useConnection } from "../../contexts/ConnectionContext";
import { NetworkInfo } from "react-native-network-info";

const HomeScreen = () => {
  const user = useSelector(selectUser);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { startServer } = useConnection();

  const onPressHost = () => {
    const PORT = generatePort();
    const INVITE_CODE = generateInviteCode();

    dispatch({ type: "setPort", payload: PORT });
    dispatch({ type: "setInviteCode", payload: INVITE_CODE });

    navigation.navigate(screenNames.host);
  };

  const onPressJoin = () => {
    navigation.navigate(screenNames.client);
  };

  // useEffect(() => {
  //   // Get Local IP
  //   NetworkInfo.getIPAddress().then((ipAddress) => {
  //     console.log("IP Address: ", ipAddress);
  //   });

  //   // Get IPv4 IP (priority: WiFi first, cellular second)
  //   NetworkInfo.getIPV4Address().then((ipv4Address) => {
  //     console.log("IPV4 Address: ", ipv4Address);
  //   });
  // }, []);

  return (
    <ScreenLayout>
      <View style={{ flex: 1 }}>
        {/* header */}
        <Header />

        <Vspacer size={20} />
        <View style={{ paddingHorizontal: 20, gap: 25 }}>
          <ConnectionCard
            iconUri="https://img.icons8.com/color/48/rfid-signal.png"
            title="Host a Connection"
            subtitle="Let others connect to you"
            warningText="Turn on your mobile hotspot before hosting"
            onPress={() => onPressHost()}
          />

          <ConnectionCard
            iconUri="https://img.icons8.com/color/48/wifi--v1.png"
            title="Join a Connection"
            subtitle="Connect to a nearby host"
            warningText="Connect to the host’s Wi-Fi network first"
            onPress={() => onPressJoin()}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 10,
    ...globalStyles.flexRow,
    gap: 15,
  },
});
