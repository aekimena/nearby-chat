import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthModalVisible,
  selectClientAccepted,
} from "../storeServices/client/clientReducer";
import { colors } from "../constants/colors";
import { globalStyles } from "../constants/styles";
import { LabelText } from "../components/LabelText";
import { Vspacer } from "../components/Vspacer";
import { CustomButton } from "../components/CustomButton";
import { CustomInput } from "../components/CustomInput";
import { useConnection } from "../contexts/ConnectionContext";

export const AuthenticationModal = () => {
  const clientAccepted = useSelector(selectClientAccepted);
  const visible = useSelector(selectAuthModalVisible);
  const { client } = useConnection();
  const [inviteCode, setInviteCode] = useState("");
  const dispatch = useDispatch();

  const onClose = () => {
    if (clientAccepted !== "true") {
      // disconnect
      dispatch({ type: "setAuthModalVisible", payload: false });
    }
  };

  const onProceed = () => {
    if (!inviteCode.trim() || inviteCode.length < 4) {
      return;
    }

    client.write(
      JSON.stringify({ code: inviteCode, type: "enter_code" }) + "\n"
    );
    // onClose();
    // dispatch({ type: "setAuthModalVisible", payload: false });
  };
  return (
    <Modal
      backdropColor={"rgba(0,0,0,0.05)"}
      visible={visible}
      onDismiss={() => {}}
      onRequestClose={() => {}}
      animationType="fade"
    >
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
      >
        <View
          style={{ padding: 20, borderRadius: 10, backgroundColor: "#fff" }}
        >
          {clientAccepted === "pending" && (
            <View style={{ ...globalStyles.flexRow, gap: 10 }}>
              <ActivityIndicator color={colors.primary} size={50} />
              <LabelText
                title="Awaiting approval..."
                style={{ ...globalStyles.font16Semibold }}
              />
            </View>
          )}

          {clientAccepted == "true" && (
            <>
              <LabelText
                title="Enter invite code"
                style={{ ...globalStyles.font18SemiBold }}
              />
              <Vspacer size={3} />
              <LabelText
                title="This is the invite code provided by the host"
                style={{ color: colors.textSecondary }}
              />
              <Vspacer size={15} />
              <CustomInput onChangeText={setInviteCode} />
              <Vspacer size={15} />
              <CustomButton title="Proceed" onPress={onProceed} />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});
