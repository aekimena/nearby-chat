import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants/colors";
import { Vspacer } from "../../components/Vspacer";
import { LabelText } from "../../components/LabelText";
import { globalStyles } from "../../constants/styles";
import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import { useConnection } from "../../contexts/ConnectionContext";
import { useDispatch, useSelector } from "react-redux";
import { selectClientAccepted } from "../../storeServices/client/clientReducer";

const ClientDetails = () => {
  const [hostIp, setHostIp] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [port, setPort] = useState("");
  const clientAccepted = useSelector(selectClientAccepted);

  const dispatch = useDispatch();

  const { connectToServer } = useConnection();

  const onPressRequest = () => {
    dispatch({ type: "setAuthModalVisible", payload: true });
    return;
    if (!hostIp.trim()) {
      ToastAndroid.show("Host IP is required", ToastAndroid.BOTTOM);
      return;
    }
    if (!inviteCode.trim() || inviteCode.length < 4) {
      ToastAndroid.show("Invite code is required", ToastAndroid.BOTTOM);
      return;
    }

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
        />
        <Vspacer size={10} />
        <CustomInput
          onChangeText={setPort}
          placeholder="Enter Port"
          label="Port"
          style={{ borderRadius: 10 }}
        />
        {/* <Vspacer size={10} />
        <CustomInput
          onChangeText={setInviteCode}
          placeholder="Enter host invite code."
          label="Invite code"
          style={{ borderRadius: 10 }}
        /> */}
        <Vspacer size={15} />
        <CustomButton
          title="Request to join"
          onPress={onPressRequest}
          textStyle={{ ...globalStyles.font16Semibold }}
        />
      </View>
    </View>
  );
};

export default ClientDetails;

const styles = StyleSheet.create({});
