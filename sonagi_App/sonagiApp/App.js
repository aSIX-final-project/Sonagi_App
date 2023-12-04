import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/give/Home";
import Login from "./screens/give/Login";
import Signup from "./screens/give/Signup";
import Donate from "./screens/give/Donate";
import Notice from "./screens/give/Notice";
import Profiles from "./screens/give/Profiles";
import KakaoMap from "./screens/give/KakaoMap";
import ChangePw from "./screens/give/ChangePw";
import ChangeInfo from "./screens/give/ChangeInfo";
import Mapadd from "./screens/give/Mapadd";
import Registgive from "./screens/give/Registgive";
import GiveReq from "./screens/give/GiveReq";
import ManagePage from "./screens/give/ManagePage";
import ManageNotice from "./screens/give/ManageNotice";
import ManageReq from "./screens/give/ManageReq";
import BottomsheetModDel from "./screens/give/BottomsheetModDel";
import GiveMapConnect from "./screens/give/GiveMapConnect";
import CrawlingNotice from "./screens/give/CrawlingNotice";
import CrawlingNaver from "./screens/give/CrawlingNaver";


// 피기부자
import Homep from "./screens/givep/Homep";
import Profilesp from "./screens/givep/Profilesp";
import ChangeInfop from "./screens/givep/ChangeInfop";
import ChangePwp from "./screens/givep/ChangePwp";
import Noticep from "./screens/givep/Noticep";
import Donatep from "./screens/givep/Donatep";
import KakaoMapP from "./screens/givep/KakaoMapP";
import Mapaddp from "./screens/givep/Mapaddp";
import SendReqp from "./screens/givep/SendReqp";


import { useState, useRef, useEffect } from "react";
// 폰트 관련 코드
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";

//stacknavigation 사용
export default function App() {
  // 폰트 관련 코드
  const [isFont, setIsFont] = useState(false);
  const Stack = createStackNavigator();
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // ✅ 알림 권한 설정
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const loadFont = async () => {
    await Font.loadAsync({
      "Play-Bold": require("./assets/fonts/Play-Bold.ttf"),
      "Play-Regular": require("./assets/fonts/Play-Regular.ttf"),
    });
    setIsFont(true);
    console.log(isFont);
  };

  if (!isFont) {
    return (
      <AppLoading
        startAsync={loadFont}
        onFinish={() => setIsFont(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GiveMapConnect"
          component={GiveMapConnect}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CrawlingNotice"
          component={CrawlingNotice}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CrawlingNaver"
          component={CrawlingNaver}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Donate"
          component={Donate}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notice"
          component={Notice}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profiles"
          component={Profiles}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="KakaoMap"
          component={KakaoMap}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="KakaoMapP"
          component={KakaoMapP}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SendReqp"
          component={SendReqp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePw"
          component={ChangePw}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangeInfo"
          component={ChangeInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Homep"
          component={Homep}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Registgive"
          component={Registgive}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profilesp"
          component={Profilesp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangeInfop"
          component={ChangeInfop}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePwp"
          component={ChangePwp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Noticep"
          component={Noticep}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Donatep"
          component={Donatep}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Mapadd"
          component={Mapadd}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GiveReq"
          component={GiveReq}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Mapaddp"
          component={Mapaddp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManagePage"
          component={ManagePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManageNotice"
          component={ManageNotice}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManageReq"
          component={ManageReq}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BottomsheetModDel"
          component={BottomsheetModDel}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
