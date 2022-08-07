import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const ws = new WebSocket('ws://10.0.0.51:9898');

const ChatScreen = (props: { navigation: any }) => {
    const [chat, updateChat] = React.useState([]);
    const [message, updateMessage] = React.useState('');

    React.useEffect(() => {
        ws.onopen = () => {
            console.log("Websocket Connected.");
        }
    });

    ws.onmessage = (response) => {
        let chat = JSON.parse(response.data);
        updateChat(chat);
    };

    const sendMessage = () => {
        var post = {
            id: props.navigation.state.params.userName,
            messageLength: message.length
        }

        updateMessage('');

        ws.send(JSON.stringify(post));
    };

    return (
        <View style={styles.container}>
            <Text>Chat Screen {props.navigation.state.params.userName}</Text>
            <FlatList
                data={chat}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item }) => <Text>{item.id}: {item.message}</Text>}
            />
            <View style={styles.bottomContainer}>
                <TextInput
                    style={styles.message}
                    onChangeText={text => updateMessage(text)}
                    value={message}
                    placeholder="message" />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => sendMessage()}>
                        <Text>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    message: {
        margin: 15,
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center'
    },
    sendButton: {
        backgroundColor: 'gray',
        height: 40
    }
});

export default ChatScreen;