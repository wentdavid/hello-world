import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
/* import { createStackNavigator } from "@react-navigation/stack";*/
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Start from "./Start";
import Chat from "./Chat";

const Tab = createBottomTabNavigator();
/* const Stack = createStackNavigator();
 */
export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Start">
          <Tab.Screen name="Start" component={Start} />
          <Tab.Screen name="Chat" component={Chat} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

