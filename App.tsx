import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import UserName from './screens/UserName';
import ChatScreen from './screens/ChatScreen';

const AppNavigator = createStackNavigator({
  UserName: { screen: UserName },
  ChatScreen: { screen: ChatScreen }
}, {
    initialRouteName: 'UserName',
    headerMode: 'none',
});

const App = createAppContainer(AppNavigator);

export default App;