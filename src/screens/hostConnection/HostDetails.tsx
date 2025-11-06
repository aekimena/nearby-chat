import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../../constants/colors";
import { Vspacer } from "../../components/Vspacer";
import { LabelText } from "../../components/LabelText";
import { globalStyles } from "../../constants/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useConnection } from "../../contexts/ConnectionContext";
import { useSelector } from "react-redux";
import {
  selectClients,
  selectInviteCode,
  selectPort,
} from "../../storeServices/host/hostReducer";

const DetailsBox = ({
  label,
  title,
  onCopy,
}: {
  label: string;
  title: string;
  onCopy: () => void;
}) => {
  return (
    <View style={{ gap: 10 }}>
      <LabelText title={label} />
      <View style={styles.box}>
        <LabelText title={title} style={{ ...globalStyles.font14Semibold }} />
        <Pressable onPress={onCopy}>
          <MaterialIcons
            name="file-copy"
            size={16}
            color={colors.iconPrimary}
          />
        </Pressable>
      </View>
    </View>
  );
};

const HostDetails = () => {
  const { startServer } = useConnection();

  const { server, approveClient } = startServer();

  const PORT = useSelector(selectPort);
  const INVITE_CODE = useSelector(selectInviteCode);
  const CLIENTS = useSelector(selectClients);

  // useEffect(() => {
  //   startServer();
  // }, []);

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
        {/* <View style={{ gap: 10 }}>
          <LabelText title="IP Address:" />
          <View style={styles.box}>
            <LabelText
              title="192.168.43.1"
              style={{ ...globalStyles.font14Semibold }}
            />
            <Pressable>
              <MaterialIcons
                name="file-copy"
                size={16}
                color={colors.iconPrimary}
              />
            </Pressable>
          </View>
        </View> */}
        <View style={{ gap: 15 }}>
          <DetailsBox
            label="IP Address:"
            title="192.168.43.1"
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

const styles = StyleSheet.create({
  box: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.card,
    ...globalStyles.flexRowBtw,
  },
});
