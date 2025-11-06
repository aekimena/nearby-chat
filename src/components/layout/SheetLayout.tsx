import { BackHandler, StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useEffect, useState } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

export const SheetLayout = forwardRef(
  (
    {
      snapPoints,
      children,
      enableContentPanningGesture = true,
      enableHandlePanningGesture = true,
      enableOverDrag = true,
      enablePanDownToClose = true,
    }: {
      snapPoints: string[];
      children: React.ReactNode;
      enableOverDrag?: boolean;
      enablePanDownToClose?: boolean;
      enableContentPanningGesture?: boolean;
      enableHandlePanningGesture?: boolean;
    },
    ref
  ) => {
    const navigation = useNavigation();
    const [sheetIndex, setSheetIndex] = useState(-1);
    const CustomBackdrop = (props) => {
      return (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          // pressBehavior={'none'}
        />
      );
    };

    // 🔙 Handle Android hardware back button
    useEffect(() => {
      const handleBackPress = () => {
        if (sheetIndex > -1) {
          // closeJobSheet();
          ref.current?.dismiss();
          return true; // prevent default navigation
        }
        return false;
      };

      const backSub = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );
      return () => backSub.remove();
    }, [sheetIndex]);

    // 🧭 Handle navigation "goBack" (for iOS swipe or header back)
    useEffect(() => {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        if (sheetIndex > -1) {
          e.preventDefault(); // block navigation
          // closeJobSheet(); // close sheet instead
          ref.current?.dismiss();
        }
      });
      return unsubscribe;
    }, [navigation, sheetIndex]);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={CustomBackdrop}
        //   index={0}
        onChange={(index) => setSheetIndex(index)}
        enableOverDrag={enableOverDrag}
        enablePanDownToClose={enablePanDownToClose}
        enableContentPanningGesture={enableContentPanningGesture}
        enableHandlePanningGesture={enableHandlePanningGesture}
      >
        {children}
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({});
