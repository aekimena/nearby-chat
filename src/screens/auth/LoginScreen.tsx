import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useState } from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { Vspacer } from "../../components/Vspacer";
import { CustomInput } from "../../components/CustomInput";
import { LabelText } from "../../components/LabelText";
import { globalStyles } from "../../constants/styles";
import { CustomButton } from "../../components/CustomButton";
import { colors } from "../../constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import { NAME_REGEX } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { setUser } from "../../storeServices/auth/actions";
import DeviceInfo from "react-native-device-info";

const PLACEHOLDER_AVATAR =
  "https://st4.depositphotos.com/14903220/22197/v/450/depositphotos_221970610-stock-illustration-abstract-sign-avatar-icon-profile.jpg";

const LoginScreen = () => {
  const deviceId = DeviceInfo.getDeviceId();
  const [name, setName] = useState("");
  const [image, setImage] = useState<any>();
  const dispatch = useDispatch();

  const launchImagePicker = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    });

    // console.log(result?.assets[0]?.base64);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const SignUpAsync = () => {
    if (!image || !image.base64) {
      ToastAndroid.show("Profile image is required", ToastAndroid.BOTTOM);
      return;
    }
    if (!NAME_REGEX.test(name)) {
      ToastAndroid.show("Please enter a valid name", ToastAndroid.BOTTOM);
      return;
    }

    dispatch(
      setUser({ name: name.trim(), image: image?.base64, deviceId: deviceId })
    );
  };
  return (
    <ScreenLayout>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={"height"}
          keyboardVerticalOffset={StatusBar.currentHeight || 20}
        >
          <ScrollView>
            <Vspacer size={50} />
            <View style={{ paddingHorizontal: 20 }}>
              <LabelText
                title="Sign up to get started"
                style={{ ...globalStyles.font20Bold, fontSize: 30 }}
              />
              <Vspacer size={30} />
              <View style={{ gap: 20 }}>
                <Pressable
                  onPress={launchImagePicker}
                  style={{
                    ...globalStyles.allCenter,
                    height: 150,
                    width: 150,
                    borderRadius: 120,
                    overflow: "hidden",
                    alignSelf: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: !image
                        ? PLACEHOLDER_AVATAR
                        : `data:image/png;base64,${image?.base64}`,
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 120,
                    }}
                  />
                  <View style={{ position: "absolute", zIndex: 3 }}>
                    <Entypo name="camera" size={30} color="#fff" />
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      backgroundColor: "rgba(0,0,0,0.13)",
                    }}
                  ></View>
                </Pressable>
                <CustomInput
                  placeholder="Ex. James Gunn"
                  onChangeText={setName}
                  style={{ borderRadius: 10 }}
                  label="Name"
                />
              </View>
              <Vspacer size={15} />
              <CustomButton
                title="Continue"
                onPress={() => SignUpAsync()}
                textStyle={{ ...globalStyles.font16Medium }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ScreenLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
