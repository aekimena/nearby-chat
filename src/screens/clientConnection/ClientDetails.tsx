import {
  Alert,
  BackHandler,
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
import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import { useConnection } from "../../contexts/ConnectionContext";
import { useDispatch, useSelector } from "react-redux";
import {
  selectClientAccepted,
  selectClientAuthenticated,
} from "../../storeServices/client/clientReducer";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const ClientDetails = () => {
  const [hostIp, setHostIp] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [port, setPort] = useState("");
  const clientAccepted = useSelector(selectClientAccepted);
  const clientAuthenticated = useSelector(selectClientAuthenticated);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { connectToServer } = useConnection();

  const onPressRequest = () => {
    // dispatch({ type: "setAuthModalVisible", payload: true });
    // return;
    if (!hostIp.trim()) {
      ToastAndroid.show("Host IP is required", ToastAndroid.BOTTOM);
      return;
    }
    // if (!inviteCode.trim() || inviteCode.length < 4) {
    //   ToastAndroid.show("Invite code is required", ToastAndroid.BOTTOM);
    //   return;
    // }

    if (!port.trim() || port.length < 4) {
      ToastAndroid.show("Port is required", ToastAndroid.BOTTOM);
      return;
    }

    if (clientAccepted == "true") {
      dispatch({ type: "setAuthModalVisible", payload: true });
      return;
    }

    connectToServer({ port: port.trim(), host: hostIp.trim() });
  };

  const onPressLeave = () => {
    dispatch({ type: "resetClient", payload: {} });
    dispatch({ type: "clearChat", payload: {} });

    // disconnect
    navigation.goBack();
  };

  // --- reusable alert function
  const showLeaveAlert = (onConfirm) => {
    Alert.alert(
      "Leave this screen?",
      "You’re currently connected. Leaving now will end your active connection. Do you still want to continue?",
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
        if (!clientAuthenticated) return; // allow normal behavior

        // Prevent default action
        e.preventDefault();

        showLeaveAlert(() => {
          // Remove the listener temporarily so we can navigate after confirmation
          dispatch({ type: "resetClient", payload: {} });
          dispatch({ type: "clearChat", payload: {} });
          navigation.dispatch(e.data.action);
        });
      });

      // cleanup when screen loses focus
      return () => {
        navSub();
      };
    }, [clientAuthenticated, navigation])
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Vspacer size={20} />
        <LabelText
          title="Enter Details"
          style={{ ...globalStyles.font20Semibold, fontSize: 22 }}
        />
        <Vspacer />

        <CustomInput
          onChangeText={setHostIp}
          placeholder="Enter host IP Address"
          label="IP Address"
          style={{ borderRadius: 10 }}
          disabled={clientAuthenticated}
        />
        <Vspacer size={10} />
        <CustomInput
          onChangeText={setPort}
          placeholder="Enter Port"
          label="Port"
          style={{ borderRadius: 10 }}
          disabled={clientAuthenticated}
        />
        {/* <Vspacer size={10} />
        <CustomInput
          onChangeText={setInviteCode}
          placeholder="Enter host invite code."
          label="Invite code"
          style={{ borderRadius: 10 }}
        /> */}

        <Vspacer size={15} />
        {!clientAuthenticated && (
          <CustomButton
            title="Request to join"
            onPress={onPressRequest}
            textStyle={{ ...globalStyles.font16Semibold }}
          />
        )}
      </View>
    </View>
  );
};

export default ClientDetails;

const styles = StyleSheet.create({});
