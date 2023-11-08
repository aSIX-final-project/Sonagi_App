import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NurseySignUp from './screens/NurseySignUp';
import GiveSignUp from './screens/GiveSignUp';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';


//stacknavigation 사용
export default function App() {


  const Stack = createStackNavigator();

  return (


    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="NurseySignUp"
          component={NurseySignUp}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="GiveSignUp"
          component={GiveSignUp}
          options={{
            headerShown: false,
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
