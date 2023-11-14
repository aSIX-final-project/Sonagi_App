import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NurseySignUp from './screens/NurseySignUp';
import GiveSignUp from './screens/GiveSignUp';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Donate from './screens/Donate';
import Notice from './screens/Notice';
import Profiles from './screens/Profiles';
import Thankyou from './screens/Thankyou';
import KakaoMap from './screens/KakaoMap';
import ChangePw from './screens/ChangePw'
import ChangeInfo from './screens/ChangeInfo';

import { useState } from 'react';
// 폰트 관련 코드
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

//stacknavigation 사용
export default function App() {

  // 폰트 관련 코드
  const [isFont, setIsFont] = useState(false);
  const Stack = createStackNavigator();

  const loadFont = async () => {
    await Font.loadAsync({
      "Play-Bold": require('./assets/fonts/Play-Bold.ttf'),
      "Play-Regular": require('./assets/fonts/Play-Regular.ttf')

    })
    setIsFont(true);
    console.log(isFont);
  };

  if (!isFont) {
    return <AppLoading startAsync={loadFont} onFinish={() => setIsFont(true)} onError={console.warn} />;
  }

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
        <Stack.Screen
          name="Donate"
          component={Donate}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="Notice"
          component={Notice}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="Profiles"
          component={Profiles}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="Thankyou"
          component={Thankyou}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="KakaoMap"
          component={KakaoMap}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="ChangePw"
          component={ChangePw}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="ChangeInfo"
          component={ChangeInfo}
          options={{
            headerShown: false,
          }} />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}
