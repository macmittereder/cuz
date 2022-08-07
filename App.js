import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-gesture-handler";

import UsernameScreen from "./screens/Username";
import ChatScreen from "./screens/ChatScreen";

const AppNavigator = createStackNavigator(
  {
    UsernameScreen: { screen: UsernameScreen },
    ChatScreen: { screen: ChatScreen },
  },
  {
    initialRouteName: "UsernameScreen",
    headerMode: "none",
  }
);

const App = createAppContainer(AppNavigator);

export default App;
