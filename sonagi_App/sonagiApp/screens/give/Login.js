import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const Login = ({ navigation }) => {
  // react-hook-form으로부터 필요한 메서드와 폼 상태를 가져옵니다.
  const {
    register, // 필드 등록
    handleSubmit, // 폼 제출 핸들러
    watch, // 입력 값 감시
    setValue, // 입력 값 설정
    formState: { errors }, // 폼 상태와 에러
  } = useForm();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handlePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  // 비밀번호 입력 필드에 대한 참조 생성
  const passwordRef = useRef(null);

  // 현재 username 입력값 감시
  const username = watch("username", "");

  // 로그인 성공 시 모달 표시 여부 상태
  const [isLoginSuccessModalVisible, setLoginSuccessModalVisible] =
    useState(false);

  // 로그인 실패
  const [isLoginFailedModalVisible, setLoginFailedModalVisible] =
    useState(false); // 모달 알림창의 상태

  async function registerForPushNotificationsAsyncExpo() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          experienceId: "@nahollo/sonagiApp",
          projectId: "8912d4db-0e0b-4d3c-b650-4f40bce2e116",
        })
      ).data;

      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
  const handleLoginButtonClick = async () => {
    try {
      // 사용자 이름과 비밀번호 폼 데이터 가져오기
      const formData = {
        id: watch("username"),
        password: watch("password"),
      };

      // 폼 데이터를 JSON 문자열로 변환하여 확인
      // const jsonData = JSON.stringify(formData);
      // console.log(jsonData);

      // 백엔드 서버로 POST 요청 보내기
      const responseR = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/login",
        // "http://172.16.104.219:8888/boot/restaurant/login",
        formData
      );
      const userInfoR = responseR.data[0];

      // 백엔드 서버로 POST 요청 보내기
      const responseM = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/member/login",
        // "http://172.16.104.219:8888/boot/member/login",
        formData
      );
      const userInfoM = responseM.data[0];

      // console.log(userInfoR);
      // console.log(userInfoM);

      // 이름이 일치할 경우
      if (userInfoR && userInfoR.id === watch("username")) {
        // 로그인 성공
        console.log("로그인 성공", userInfoR);

        var expoToken = await registerForPushNotificationsAsyncExpo();

        console.log("tokenExpo : ", expoToken);

        const formData = {
          id: userInfoR.id,
          fcmToken: "fcmtoken",
          expotoken: expoToken,
        };

        // 폼 데이터를 JSON 문자열로 변환하여 확인
        const jsonData = JSON.stringify(formData);
        console.log(jsonData);

        // 백엔드 서버로 POST 요청 보내기
        const responseR = await axios.post(
          "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/token",
          formData
        );

        // 모달 표시
        setLoginSuccessModalVisible(true);

        // 2초 후에 홈 화면으로 이동
        setTimeout(() => {
          setLoginSuccessModalVisible(false);
          navigation.navigate("Home", { userInfo: userInfoR });
        }, 2000);
      } else if (userInfoM && userInfoM.id === watch("username")) {
        // 로그인 성공
        // console.log("로그인 성공", userInfoM);

        var expoToken = await registerForPushNotificationsAsyncExpo();

        console.log("tokenExpo : ", expoToken);

        const formData = {
          id: userInfoM.id,
          fcmtoken: "fcmtoken",
          expotoken: expoToken,
        };

        // 폼 데이터를 JSON 문자열로 변환하여 확인
        const jsonData = JSON.stringify(formData);
        console.log(jsonData);

        // 백엔드 서버로 POST 요청 보내기
        const responseM = await axios.post(
          "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/member/token",
          formData
        );

        // 모달 표시
        setLoginSuccessModalVisible(true);

        // 2초 후에 홈 화면으로 이동
        setTimeout(() => {
          setLoginSuccessModalVisible(false);
          navigation.navigate("Homep", { userInfo: userInfoM });
        }, 2000);
      } else {
        // 사용자 정보가 없는 경우
        console.log("로그인 실패: 사용자 정보 없음");

        // 모달 표시
        setLoginFailedModalVisible(true);

        // 2초 후에 홈 화면으로 이동
        setTimeout(() => {
          setLoginFailedModalVisible(false);
        }, 2000);
      }
    } catch (error) {
      // 에러 발생 시 처리
      console.error("로그인 실패", error);
    }
  };

  // 사용자 이름 필드에 대한 유효성 검사 및 등록
  React.useEffect(() => {
    register("username", {
      required: "아이디는 필수입니다",
      minLength: { value: 4, message: "아이디는 4자 이상이어야 합니다" },
      maxLength: { value: 12, message: "아이디는 12자 이하여야 합니다" },
    });
    if (username.length >= 4 && username.length <= 12) {
      // username 필드의 유효성 검사가 통과되면
      register("password", { required: "비밀번호는 필수입니다" }); // password 필드를 등록
    }
  }, [register, username]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* 로그인 완료 모달 */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isLoginSuccessModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                style={{ width: 130, height: 130, bottom: "0.5%", right: "0%" }}
                source={require("../../assets/loginsuccess.png")}
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={() => setLoginSuccessModalVisible(false)} // 모달 내부의 버튼 클릭 시 모달 숨김
              ></TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 로그인 실패 모달 */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isLoginFailedModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                style={{ width: 130, height: 130, bottom: "0.5%", right: "0%" }}
                source={require("../../assets/loginfailed.png")}
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={() => setLoginFailedModalVisible(false)}
              ></TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 로그인 글씨 */}
        <Image
          style={{ width: 100, height: 100, bottom: "0.5%", right: "32%" }}
          source={require("../../assets/login.png")}
          resizeMode="contain"
        />

        {/* id */}
        <Image
          style={{
            width: 65,
            height: 65,
            bottom: "0%",
            top: "3%",
            right: "36%",
          }}
          source={require("../../assets/id.png")}
          resizeMode="contain"
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={(text) => setValue("username", text)}
          returnKeyType="next"
          clearButtonMode="while-editing"
          onSubmitEditing={() => passwordRef.current?.focus()}
          name="username"
        />

        {/* password */}
        <Image
          style={{ width: 80, height: 40, bottom: "0%", right: "33.3%" }}
          source={require("../../assets/password.png")}
          resizeMode="contain"
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={styles.inputpw}
            ref={passwordRef}
            onChangeText={(text) => setValue("password", text)}
            secureTextEntry={isPasswordHidden}
            name="password"
          />
          <TouchableOpacity onPress={handlePasswordVisibility}>
            <Image
              style={{ width: 30, height: 30, bottom: "0%", right: "60%" }}
              source={require("../../assets/lookpwd.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* 아이디 비밀번호 유효성 검사 */}
        {errors.username && (
          <Text style={{ alignSelf: "flex-start", left: "6%", color: "white" }}>
            {errors.username.message}
          </Text>
        )}
        {username.length >= 4 && username.length <= 12 && errors.password && (
          <Text style={{ alignSelf: "flex-start", left: "6%", color: "white" }}>
            {errors.password.message}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            bottom: "0%",
            right: "6.6%",
          }}
        >
          <Image
            style={{
              width: 150,
              height: 150,
              bottom: "0%",
              right: "0%",
              marginRight: 10,
            }}
            source={require("../../assets/signup1.png")}
            resizeMode="contain"
          />

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Image
              style={{ width: 60, height: 90, bottom: "0%", right: "0%" }}
              source={require("../../assets/signup2.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* 로그인 버튼 (기부자)(피기부자) */}
        <View style={{ flexDirection: "row", marginLeft: "70%" }}>
          <TouchableOpacity onPress={handleLoginButtonClick}>
            <Image
              style={{ width: 70, height: 100 }}
              source={require("../../assets/login1.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#44A5FF",
  },
  input: {
    width: "88%",
    height: 45,
    borderColor: "white",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderRadius: 4,
    fontSize: 20,
  },
  inputpw: {
    width: "88%",
    height: 45,
    borderColor: "white",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderRadius: 4,
    left: "25%",
    fontSize: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Login;
