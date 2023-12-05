import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm } from "react-hook-form";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

const ChangeInfo = ({ navigation, route }) => {
  const { userInfo } = route.params;

  // 로그아웃 버튼을 눌렀을때 값을 서버에 보냄
  const [isLogoutSuccessModalVisible, setLogoutSuccessModalVisible] =
    useState(false); // 모달 알림창의 상태

  const [isChangeSuccessModalVisible, setChangeSuccessModalVisible] =
    useState(false);

  const [isChangeFailedModalVisible, setChangeFailedModalVisible] =
    useState(false); // 모달 알림창의 상태

  const [modalMessage, setModalMessage] = useState("");

  const {
    watch, // 입력 값 감시
    setValue, // 입력 값 설정
    formState: { errors }, // 폼 상태와 에러
  } = useForm();

  // 유효성 검사 함수
  const validateInput = () => {
    // 시설 주소
    if (!watch("Changeadd")) {
      console.log("시설 주소를 입력하세요.");
      setModalMessage("시설 주소를 입력하세요.");
      setChangeFailedModalVisible(true);

      setTimeout(() => {
        setChangeFailedModalVisible(false);
      }, 2000);
      return false;
    }

    // 시설 전화번호
    if (!watch("Changenum") || isNaN(watch("Changenum"))) {
      console.log("시설 전화번호를 입력하세요.");
      setModalMessage("시설 전화번호를 입력하세요.");
      setChangeFailedModalVisible(true);

      setTimeout(() => {
        setChangeFailedModalVisible(false);
      }, 2000);
      return false;
    }

    // 시설 이름
    if (!watch("Changename")) {
      console.log("시설 이름을 입력하세요.");
      setModalMessage("시설 이름을 입력하세요.");
      setChangeFailedModalVisible(true);

      setTimeout(() => {
        setChangeFailedModalVisible(false);
      }, 2000);
      return false;
    }

    // 모든 검사를 통과하면 에러 메시지를 초기화하고 true를 반환합니다.
    return true;
  };

  const handleInfoChange = async () => {
    try {
      if (validateInput()) {
        // POST 요청에 필요한 데이터
        const formData = {
          id: userInfo.id,
          adName: watch("Changename"),
          adTel: watch("Changenum"),
          managerName: userInfo.name,
          address: watch("Changeadd"),
          totalHc: 0,
          introduction: null,
        };

        // 폼 데이터를 JSON 문자열로 변환하여 확인
        const jsonData = JSON.stringify(formData);
        console.log(jsonData);

        // 실제로는 axios를 사용하여 서버에 요청을 보냅니다.
        const response = await axios.post(
          "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/admin/requestAdmin",
          formData
        );
        console.log(response.data);
        // 백엔드로부터 온 응답 처리
        if (response.status === 200) {
          console.log("시설 정보 변경 요청 성공");
          setChangeSuccessModalVisible(true);

          // 2초 후에 홈 화면으로 이동
          setTimeout(() => {
            setChangeSuccessModalVisible(false);
            navigation.navigate("Profiles", { userInfo: userInfo });
          }, 2000);
        } else {
          console.log("시설 정보 변경 요청 실패");
          setModalMessage("시설 정보 변경 요청 실패");
          setChangeFailedModalVisible(true);

          setTimeout(() => {
            setChangeFailedModalVisible(false);
          }, 2000);
        }
      } else {
        console.log("다시 적어주세요.");
      }
    } catch (error) {
      console.error("에러:", error);
      setChangeFailedModalVisible(true);

      setTimeout(() => {
        setChangeFailedModalVisible(false);
      }, 2000);
    }
  };

  const handleLogoutButtonClick = () => {
    setLogoutSuccessModalVisible(true); // 가입 버튼 클릭 시 모달 표시

    // 2초 후에 모달 숨김
    setTimeout(() => {
      setLogoutSuccessModalVisible(false);
      navigation.navigate("Login"); // 메인화면으로 이동
    }, 2000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          {/* 로그인 완료 모달 */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={isLogoutSuccessModalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={{
                    width: 130,
                    height: 130,
                    bottom: "0.5%",
                    right: "0%",
                  }}
                  source={require("../../assets/logoutsuccess.png")}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  onPress={() => setLogoutSuccessModalVisible(false)} // 모달 내부의 버튼 클릭 시 모달 숨김
                ></TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View
            style={{
              backgroundColor: "#44A5FF",
              width: "100%",
              height: "40%",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            {/* 상단부분 */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#44A5FF",
                width: "100%",
                height: "17%",
                marginTop: "10%",
              }}
            >
              <TouchableOpacity
                style={{ marginLeft: "6%", marginRight: "2%" }}
                onPress={() =>
                  navigation.navigate("Profiles", { userInfo: userInfo })
                }
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/backkey.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "Play-Bold",
                  fontSize: 25,
                  color: "white",
                }}
              >
                프로필
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: "2%",
                  marginLeft: "36%",
                  width: "25%",
                  height: "70%",
                  backgroundColor: "#6DB9FF",
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleLogoutButtonClick}
              >
                <Text
                  style={{
                    fontFamily: "Play-Bold",
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  로그아웃
                </Text>
              </TouchableOpacity>
            </View>

            {/* 프로필 부분 */}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10%",
              }}
            >
              <TouchableOpacity>
                {userInfo.profileImage ? (
                  <Image
                    source={{ uri: userInfo.profileImage }}
                    style={styles.profileImage}
                  />
                ) : (
                  <Image
                    style={{ width: 90, height: 90 }}
                    source={require("../../assets/profileedit.png")}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "Play-Bold",
                  fontSize: 25,
                  color: "white",
                  marginTop: "2%",
                }}
              >
                {userInfo.name} 님
              </Text>
              <Text
                style={{
                  fontFamily: "Play-Regular",
                  fontSize: 20,
                  color: "white",
                  marginTop: "1%",
                }}
              >
                {userInfo.adName}
              </Text>
            </View>
          </View>

          {/* 중앙 부분 */}

          {/* 시설정보 변경 */}
          <View
            style={{
              marginTop: "5%",
              width: "88%",
              height: "47%",
              backgroundColor: "#E1F1FF",
              marginLeft: "5%",
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginTop: "0%",
                width: "88%",
                height: "15%",
                backgroundColor: "#C3E2FF",
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 43,
                  height: 43,
                  marginRight: "0%",
                  marginLeft: "0%",
                }}
                source={require("../../assets/introduce2.png")}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                fontFamily: "Play-Bold",
                fontSize: 23,
                color: "#393939",
                marginRight: "55%",
                marginTop: "7%",
              }}
            >
              시설 주소 수정
            </Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={(text) => setValue("Changeadd", text)}
              clearButtonMode="while-editing"
              placeholder="Enter address"
              name="Changeadd"
            />
            <Text
              style={{
                fontFamily: "Play-Bold",
                fontSize: 23,
                color: "#393939",
                marginRight: "46%",
                marginTop: "2%",
              }}
            >
              시설 전화번호 수정
            </Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={(text) => setValue("Changenum", text)}
              clearButtonMode="while-editing"
              placeholder="Enter number"
              name="Changenum"
            />
            <Text
              style={{
                fontFamily: "Play-Bold",
                fontSize: 23,
                color: "#393939",
                marginRight: "55%",
                marginTop: "2%",
              }}
            >
              시설 이름 수정
            </Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={(text) => setValue("Changename", text)}
              clearButtonMode="while-editing"
              placeholder="Enter name"
              name="Changename"
            />
            <TouchableOpacity
              style={{
                marginTop: "2%",
                width: "88%",
                height: "10%",
                backgroundColor: "#E1F1FF",
                borderColor: "#62B4FF",
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleInfoChange}
            >
              <Text
                style={{
                  fontFamily: "Play-Regular",
                  fontSize: 22,
                  color: "#69B7FF",
                }}
              >
                변경 신청
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isChangeSuccessModalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.circle}>
                  <Icon
                    name="check"
                    size={55}
                    color="#698FF1"
                    style={styles.iconStyle}
                  />
                </View>
                <Text
                  style={{
                    marginTop: "5%",
                    fontFamily: "Play-Bold",
                    fontSize: 20,
                  }}
                >
                  시설 정보 변경 요청 성공
                </Text>
                <TouchableOpacity
                  onPress={() => setChangeSuccessModalVisible(false)}
                ></TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={isChangeFailedModalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.failCircle}>
                  <Icon
                    name="times"
                    size={55}
                    color="#FF0000"
                    style={styles.failIconStyle}
                  />
                </View>
                <Text
                  style={{
                    marginTop: "5%",
                    fontFamily: "Play-Bold",
                    fontSize: 20,
                  }}
                >
                  {modalMessage}
                </Text>
                <TouchableOpacity
                  onPress={() => setChangeFailedModalVisible(false)}
                ></TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFC",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#000",
  },

  input: {
    width: "88%",
    height: 45,
    borderColor: "#B8DDFF",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    marginVertical: 5,
    borderRadius: 4,
    fontSize: 20,
  },
  failCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFCCCC",
    alignSelf: "center",
    marginBottom: 10,
    justifyContent: "center", // 여기
    alignItems: "center", // 그리고 여기
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#C2E9FF",
    alignSelf: "center",
    marginBottom: 10,
  },
  iconStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }], // 아이콘의 절반 크기만큼 이동
  },
  failIconStyle: {
    position: "absolute",
    top: "50%",
    left: "55%",
    transform: [{ translateX: -27.5 }, { translateY: -27.5 }], // 아이콘의 절반 크기만큼 이동
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default ChangeInfo;
