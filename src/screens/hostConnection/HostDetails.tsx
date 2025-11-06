import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { Vspacer } from "../../components/Vspacer";
import { LabelText } from "../../components/LabelText";
import { globalStyles } from "../../constants/styles";
import { useConnection } from "../../contexts/ConnectionContext";
import { useSelector } from "react-redux";
import {
  selectClients,
  selectInviteCode,
  selectPort,
} from "../../storeServices/host/hostReducer";
// import NetInfo from "@react-native-community/netinfo";
import { NetworkInfo } from "react-native-network-info";
import { DetailsBox } from "../../components/chat/DetailsBox";

const HostDetails = () => {
  const { startServer } = useConnection();

  // const { approveClient } = startServer();

  const PORT = useSelector(selectPort);
  const INVITE_CODE = useSelector(selectInviteCode);
  const CLIENTS = useSelector(selectClients);

  const [IP, setIp] = useState("");

  useEffect(() => {
    // startServer();
    // Get IPv4 IP (priority: WiFi first, cellular second)
    NetworkInfo.getIPAddress().then((ipv4Address) => {
      console.log("IPV4 Address: ", ipv4Address);
      setIp(ipv4Address);
    });
    startServer();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Vspacer size={20} />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ ...globalStyles.flexRow, gap: 10 }}>
          <Image
            source={{ uri: "https://img.icons8.com/color/48/rfid-signal.png" }}
            style={{ height: 40, width: 40 }}
          />
          <LabelText
            title="You are hosting a chat!"
            style={{ ...globalStyles.font20Semibold, fontSize: 24 }}
          />
        </View>
        <Vspacer size={20} />

        <View style={{ gap: 15 }}>
          <DetailsBox
            label="IP Address:"
            title={IP || "..."}
            onCopy={() => {}}
          />
          <DetailsBox label="Port:" title={PORT} onCopy={() => {}} />
          <DetailsBox
            label="Invite Code:"
            title={INVITE_CODE}
            onCopy={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

export default HostDetails;

const styles = StyleSheet.create({});
