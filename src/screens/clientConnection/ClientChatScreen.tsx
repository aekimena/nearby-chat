import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LabelText } from "../../components/LabelText";
import { screenWidth } from "../../constants/constants";
import { MessageItem } from "../../components/chat/MessageItem";
import { useSelector } from "react-redux";
import { selectMessages } from "../../storeServices/messages/chatReducer";
import { useConnection } from "../../contexts/ConnectionContext";

// const messages = [
//   {
//     id: "1",
//     deviceId: "1",
//     name: "aeagbogu",
//     socket: "wgdw",
//     text: "This is crazy!!!",
//   },
//   {
//     id: "2",
//     deviceId: "2",
//     name: "Sammy",
//     socket: "wgdw",
//     text: "I really didnt want to come but she insisted on me coming...",
//   },
//   {
//     id: "3",
//     deviceId: "3",
//     name: "Wiston",
//     socket: "wgdw",
//     text: "This is crazy!!!",
//   },
//   {
//     id: "4",
//     deviceId: "1",
//     name: "aeagbogu",
//     socket: "wgdw",
//     text: "This is crazy!!!",
//   },
//   {
//     id: "5",
//     deviceId: "5",
//     name: "Jamie",
//     socket: "wgdw",
//     text: "This is crazy!!!",
//   },
//   {
//     id: "6",
//     deviceId: "7",
//     name: "aeagbogu",
//     socket: "wgdw",
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia accusantium, quidem corrupti laborum dolores nobis!",
//   },
// ];

const ClientChatScreen = () => {
  const insets = useSafeAreaInsets();
  const MESSAGES = useSelector(selectMessages);

  const { sendMessage } = useConnection();

  const [input, setInput] = useState("");

  const onPressSend = () => {
    if (!input.trim()) {
      return;
    }

    sendMessage(input);
    setInput("");
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.chatHeader}>
        <View style={{ flex: 1, ...globalStyles.flexRow, gap: 10 }}>
          <View style={{ height: 50, width: 50, borderRadius: 50 }}>
            <Image
              source={{ uri: "https://www.loremfaces.net/96/id/3.jpg" }}
              style={{ height: "100%", width: "100%", borderRadius: 100 }}
            />

            <Image
              source={{ uri: "https://www.loremfaces.net/96/id/2.jpg" }}
              style={styles.secondHeaderAvatar}
            />
          </View>

          <View style={{ flex: 1 }}>
            <LabelText
              title="Name user, second user and 1 other"
              style={{ ...globalStyles.font16Semibold }}
            />
            <LabelText
              title="Connected"
              style={{ color: colors.textSecondary, fontSize: 12 }}
            />
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={"height"}
        keyboardVerticalOffset={15 + insets.bottom}
      >
        <FlatList
          data={MESSAGES}
          renderItem={({ item }) => <MessageItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatlist}
        />
        <View
          style={{
            paddingBottom: insets.bottom + 15,
            ...styles.chatContainer,
          }}
        >
          <TextInput
            style={styles.textInput}
            placeholder="Start typing..."
            placeholderTextColor={colors.textSecondary}
            multiline
            onChangeText={setInput}
            value={input}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={onPressSend}>
            <FontAwesome name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ClientChatScreen;

const styles = StyleSheet.create({
  chatHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    ...globalStyles.flexRow,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
    gap: 15,
  },
  secondHeaderAvatar: {
    height: 30,
    width: 30,
    borderRadius: 30,
    position: "absolute",
    top: -5,
    right: -5,
  },
  chatContainer: {
    paddingTop: 15,
    paddingHorizontal: 20,
    width: "100%",
    // backgroundColor: "red",
    borderTopWidth: 0.5,
    borderColor: colors.border,
    ...globalStyles.flexRow,
    gap: 15,
  },
  textInput: {
    flex: 1,
    minHeight: 50,
    maxHeight: 200,
    borderRadius: 10,
    backgroundColor: colors.card,
    ...globalStyles.font14Medium,
    color: colors.textPrimary,
    paddingHorizontal: 10,
  },
  sendBtn: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colors.primary,
    ...globalStyles.allCenter,
  },
  flatlist: {
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 20,
    paddingBottom: 100,
  },
});
