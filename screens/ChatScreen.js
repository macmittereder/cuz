import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

// 10.0.2.2 is default android emulator localhost
const ws = new WebSocket("ws://10.0.2.2:9898");

const ChatScreen = (props) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Trying to connect...");
    ws.onopen = () => {
      console.log("Websocket Connected.");
    };
    console.log(ws);
  }, []);

  ws.onmessage = (response) => {
    let chat = JSON.parse(response.data);
    setChat(chat);
  };

  const sendMessage = () => {
    var post = {
      id: props.navigation.state.params.username,
      messageLength: message.length,
    };

    setMessage("");

    ws.send(JSON.stringify(post));
  };

  return (
    <View style={styles.container}>
      <Text>Chat Screen {props.navigation.state.params.username}</Text>
      <FlatList
        data={chat}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <Text>
            {item.id}: {item.message}
          </Text>
        )}
      />
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.message}
          onChangeText={(text) => setMessage(text)}
          value={message}
          placeholder="message"
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => sendMessage()}
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  message: {
    margin: 15,
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
  },
  sendButton: {
    backgroundColor: "gray",
    height: 40,
  },
});

export default ChatScreen;
