import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import GiveSignUp from './screens/give/GiveSignUp';
import Home from './screens/give/Home';
import Login from './screens/give/Login';
import Signup from './screens/give/Signup';
import Donate from './screens/give/Donate';
import Notice from './screens/give/Notice';
import Profiles from './screens/give/Profiles';
import Thankyou from './screens/give/Thankyou';
import KakaoMap from './screens/give/KakaoMap';
import ChangePw from './screens/give/ChangePw';
import ChangeInfo from './screens/give/ChangeInfo';
import Mapadd from './screens/give/Mapadd';
import RegistGive from './screens/give/Registgive';
import GiveReq from './screens/give/GiveReq';

// 피기부자 
import Homep from './screens/givep/Homep';
import Profilesp from './screens/givep/Profilesp';
import ChangeInfop from './screens/givep/ChangeInfop';
import ChangePwp from './screens/givep/ChangePwp';
import Thankyoup from './screens/givep/Thankyoup';
import Noticep from './screens/givep/Noticep';
import Donatep from './screens/givep/Donatep';
import KakaoMapp from './screens/givep/KakaoMapp';
import GiveReqp from './screens/givep/GiveReqp';
import Mapaddp from './screens/givep/Mapaddp';

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
        <Stack.Screen
          name="Homep"
          component={Homep}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="Profilesp"
          component={Profilesp}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="ChangeInfop"
          component={ChangeInfop}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="ChangePwp"
          component={ChangePwp}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="Thankyoup"
          component={Thankyoup}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="Noticep"
          component={Noticep}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="Donatep"
          component={Donatep}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="Mapadd"
          component={Mapadd}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="RegistGive"
          component={RegistGive}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="GiveReq"
          component={GiveReq}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="KakaoMapp"
          component={KakaoMapp}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="GiveReqp"
          component={GiveReqp}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="Mapaddp"
          component={Mapaddp}
          options={{
            headerShown: false,
          }} />
        
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}
