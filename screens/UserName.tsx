import { StyleSheet, View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserNameScreen = (props: { navigation: any }) => {
    const [userName, setUserName] = React.useState('');
    
    return(
        <View style={styles.container}>
            <Text>Enter Screen Name</Text>
            <TextInput
                style={styles.userName}
                onChangeText={text => setUserName(text)}
                placeholder="Cuz" />
            <TouchableOpacity
                style={styles.enterButton}
                onPress={() => props.navigation.navigate('ChatScreen', { userName: userName })}>
                <Text>Enter</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userName: {
        margin: 15,
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center'
    },
    enterButton: {
        backgroundColor: 'gray',
        width: 250,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    }
});

export default UserNameScreen;