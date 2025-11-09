import {
  Alert,
  BackHandler,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { Vspacer } from "../../components/Vspacer";
import { LabelText } from "../../components/LabelText";
import { globalStyles } from "../../constants/styles";
import { useConnection } from "../../contexts/ConnectionContext";
import { useDispatch, useSelector } from "react-redux";
import {
  selectClients,
  selectInviteCode,
  selectPort,
} from "../../storeServices/host/hostReducer";
// import NetInfo from "@react-native-community/netinfo";
import { NetworkInfo } from "react-native-network-info";
import { DetailsBox } from "../../components/chat/DetailsBox";
import * as Clipboard from "expo-clipboard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const HostDetails = () => {
  const { startServer } = useConnection();

  // const { approveClient } = startServer();

  const PORT = useSelector(selectPort);
  const INVITE_CODE = useSelector(selectInviteCode);
  const CLIENTS = useSelector(selectClients);
  const [copiedText, setCopiedText] = useState("");

  const [IP, setIp] = useState("");

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const copyToClipboard = async (str: string) => {
    await Clipboard.setStringAsync(str);
    ToastAndroid.show("Copied to clipboard!", ToastAndroid.BOTTOM);
  };

  useEffect(() => {
    NetworkInfo.getIPAddress().then((ipv4Address) => {
      console.log("IPV4 Address: ", ipv4Address);
      setIp(ipv4Address);
    });
    startServer();
  }, []);

  const onPressLeave = () => {
    dispatch({ type: "resetHost", payload: {} });
    dispatch({ type: "clearChat", payload: {} });
    // disconnect
    navigation.goBack();
  };

  // --- reusable alert function
  const showLeaveAlert = (onConfirm) => {
    Alert.alert(
      "Leave this screen?",
      "Server is running. Leaving now will restart the server. Do you still want to continue?",
      [
        { text: "Stay", style: "cancel" },
        {
          text: "Leave",
          onPress: () => {
            // disconnectClient();
            if (onConfirm) onConfirm();
            else onPressLeave();
          },
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      // --- handle any navigation attempt (header back, swipe, navigate away)
      const navSub = navigation.addListener("beforeRemove", (e) => {
        // Prevent default action
        e.preventDefault();

        showLeaveAlert(() => {
          // Remove the listener temporarily so we can navigate after confirmation
          dispatch({ type: "resetHost", payload: {} });
          dispatch({ type: "clearChat", payload: {} });
          navigation.dispatch(e.data.action);
        });
      });

      // // cleanup when screen loses focus
      return () => {
        navSub();
      };
    }, [navigation])
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView>
        <Vspacer size={20} />
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ ...globalStyles.flexRow, gap: 10 }}>
            <Image
              source={{
                uri: "https://img.icons8.com/color/48/rfid-signal.png",
              }}
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
              onCopy={() => copyToClipboard(IP || "")}
            />
            <DetailsBox
              label="Port:"
              title={PORT}
              onCopy={() => copyToClipboard(PORT)}
            />
            <DetailsBox
              label="Invite Code:"
              title={INVITE_CODE}
              onCopy={() => copyToClipboard(INVITE_CODE)}
            />
          </View>
          {CLIENTS.length > 0 && (
            <>
              <Vspacer size={20} />
              <View>
                <LabelText
                  title="Connected Users"
                  style={{ ...globalStyles.font18SemiBold }}
                />
                <Vspacer size={10} />
                <View>
                  {CLIENTS.map((item, index) => (
                    <Pressable
                      key={index}
                      style={{ ...globalStyles.flexRow, gap: 15 }}
                    >
                      <View
                        style={{
                          height: 50,
                          width: 50,
                          borderRadius: 50,
                          backgroundColor: colors.card,
                        }}
                      ></View>
                      <View>
                        <LabelText
                          title={item?.name}
                          style={{ ...globalStyles.font16Semibold }}
                        />
                        <LabelText
                          title={item?.deviceId}
                          style={{
                            ...globalStyles.font12Medium,
                            color: colors.textSecondary,
                          }}
                        />
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HostDetails;

const styles = StyleSheet.create({});
