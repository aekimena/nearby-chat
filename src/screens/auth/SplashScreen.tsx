import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { CustomButton } from "../../components/CustomButton";
import { globalStyles } from "../../constants/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setSplashSeen } from "../../storeServices/auth/actions";

const SplashScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  return (
    <ScreenLayout>
      <View style={{ flex: 1 }}>
        <ScrollView></ScrollView>
        <View
          style={{ paddingBottom: insets.bottom + 15, ...styles.btnContainer }}
        >
          <CustomButton
            title="Get started"
            onPress={() => {
              dispatch(setSplashSeen(true));
            }}
            textStyle={{ ...globalStyles.font16Medium }}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
});
