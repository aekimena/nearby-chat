import { Image, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectApprovalModalVisible } from "../storeServices/host/hostReducer";
import { selectUser } from "../storeServices/auth/authReducer";
import { globalStyles } from "../constants/styles";
import { LabelText } from "../components/LabelText";
import { Vspacer } from "../components/Vspacer";
import { CustomButton } from "../components/CustomButton";
import { colors } from "../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ApprovalModal = () => {
  const user = useSelector(selectUser);
  const visible = useSelector(selectApprovalModalVisible);
  const dispatch = useDispatch();

  const onClose = () => {
    // reject client
    dispatch({ type: "setApprovalModalVisible", payload: false });
  };
  return (
    <Modal
      backdropColor={"rgba(0,0,0,0.05)"}
      visible={visible}
      onDismiss={onClose}
      onRequestClose={onClose}
      animationType="fade"
    >
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
      >
        <View
          style={{ padding: 20, borderRadius: 10, backgroundColor: "#fff" }}
        >
          <View style={{ ...globalStyles.allCenter }}>
            <Image
              source={{ uri: `data:image/png;base64,${user?.image}` }}
              style={{ height: 120, width: 120, borderRadius: 100 }}
            />
            <Vspacer size={5} />
            <LabelText
              title={`${user?.name}, ${user?.deviceId} wants to join`}
              style={{ ...globalStyles.font20Semibold, textAlign: "center" }}
            />
          </View>
          <Vspacer size={15} />
          <View style={{ ...globalStyles.flexRow, gap: 15 }}>
            <CustomButton
              title="Accept"
              onPress={() => {}}
              buttonStyle={{ flex: 1 }}
              icon={<Ionicons name="checkmark-sharp" size={20} color="#fff" />}
            />
            <CustomButton
              title="Reject"
              onPress={() => {}}
              buttonStyle={{ flex: 1, backgroundColor: colors.card }}
              textStyle={{ color: colors.textPrimary }}
              icon={
                <Ionicons name="close" size={20} color={colors.iconPrimary} />
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});
