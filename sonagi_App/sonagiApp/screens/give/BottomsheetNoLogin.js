import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useForm } from "react-hook-form";
import axios from "axios";

const BottomSheetP = ({ modalVisible, setModalVisible, navigation }) => {
  const {
    watch, // 입력 값 감시
    setValue, // 입력 값 설정
    formState: { errors }, // 폼 상태와 에러
  } = useForm();

  // 로그인 완료 모달 표시 여부를 관리하는 상태 변수
  const [isSignupSuccessModalVisible, setSignupSuccessModalVisible] =
    useState(false);

  const handleSignupButtonClick = async () => {
    try {
      // POST 요청에 필요한 데이터
      const formData = {
        id: watch("id"),
        password: watch("password"),
        managerName: watch("managerName"),
        phoneNum: watch("phoneNum"),
        adTel: watch("adTel"),
        adName: watch("adName"),
        address: watch("address"),
        totalHc: watch("totalHc"),
        currHc: watch("currHc"),
        introduction: watch("introduction"),
      };

      // 폼 데이터를 JSON 문자열로 변환하여 확인
      const jsonData = JSON.stringify(formData);
      console.log(jsonData);

      // 실제로는 axios를 사용하여 서버에 요청을 보냅니다.
      const response = await axios.post(
        // localhost와 ip번호는 http, cloudtype주소는 https
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/member/regist",
        formData
      );

      console.log(response.data);

      if (response.data === 1) {
        console.log("회원 가입 완료!");
      } else {
        console.log("회원 가입 실패");
      }
    } catch (error) {
      console.error("에러:", error);
      // 에러 처리 로직
    }
  };

  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return evt.nativeEvent.locationY < 45;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return evt.nativeEvent.locationY < 45;
      },
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


      <Modal
        visible={modalVisible}
        animationType={"fade"}
        transparent
        statusBarTranslucent
      >
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.background} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={{
              ...styles.bottomSheetContainer,
              transform: [{ translateY: translateY }],
            }}
            {...panResponders.panHandlers}
          >
            <Image
              style={{ width: 70, height: 50, bottom: "0%" }}
              source={require("../../assets/bottomsheethandle.png")}
              resizeMode="contain"
            />

            <View
              style={{
                flexDirection: "row",
                height: "10%",
                width: "90%",
                marginBottom: "5%",
              }}
            >
              <Image
                style={{
                  width: 130,
                  height: 100,
                  top: "0%",
                  marginRight: "3%",
                }}
                source={require("../../assets/noLoginNanumLogo.png")}
                resizeMode="contain"
              />
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              style={{ width: "100%", height: "60%" }}
            >
              {/* ///////////////////////////////////////////////////////////// */}

              {/* 아이디 */}
              <Image
                style={{ width: 140, height: 60, top: "1.5%", right: "30%" }}
                source={require("../../assets/noLoginNanumAdName.png")}
                resizeMode="contain"
              />

              <TextInput
                style={styles.inputtext}
                placeholder="단체명"
                onChangeText={(text) => setValue("id", text)}
                placeholderTextColor="#808080"
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 비밀번호 */}
              <Image
                style={{ width: 125, height: 60, top: "1.5%", right: "32%" }}
                source={require("../../assets/noLoginNanumName.png")}
                resizeMode="contain"
              />

              <TextInput
                style={styles.inputtext}
                placeholder="대표자 이름"
                onChangeText={(text) => setValue("password", text)}
                placeholderTextColor="#808080"
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 이름 */}
              <Image
                style={{ width: 120, height: 60, top: "1.5%", right: "32%" }}
                source={require("../../assets/noLoginNanumPhoneNum.png")}
                resizeMode="contain"
              />

              <TextInput
                style={styles.inputtext}
                placeholder="대표자 전화번호"
                onChangeText={(text) => setValue("managerName", text)}
                placeholderTextColor="#808080"
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 전화번호 */}
              <Image
                style={{ width: 100, height: 60, top: "1.5%", right: "34%" }}
                source={require("../../assets/noLoginNanumIntroduce.png")}
                resizeMode="contain"
              />

              <TextInput
                style={styles.inputtext}
                placeholder="단체 소개"
                onChangeText={(text) => setValue("phoneNum", text)}
                placeholderTextColor="#808080"
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 시설 전화번호 */}
              <Image
                style={{ width: 100, height: 60, top: "1.5%", right: "34%" }}
                source={require("../../assets/noLoginNanumDay.png")}
                resizeMode="contain"
              />

              <TextInput
                style={styles.inputtext}
                placeholder="기부 원하는 날짜"
                onChangeText={(text) => setValue("adTel", text)}
                placeholderTextColor="#808080"
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 시설 이름 */}
              <Image
                style={{ width: 100, height: 60, top: "1.5%", right: "34%" }}
                source={require("../../assets/noLoginNanumTime.png")}
                resizeMode="contain"
              />

              <TextInput
                style={styles.inputtext}
                placeholder="나눔 진행 시간"
                onChangeText={(text) => setValue("adName", text)}
                placeholderTextColor="#808080"
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 시설 주소 */}
              <Image
                style={{ width: 90, height: 55, top: "1.5%", right: "35%" }}
                source={require("../../assets/noLoginNanumPersonnel.png")}
                resizeMode="contain"
              />

              <TextInput
                style={styles.inputtext}
                placeholder="나눔하는 인원 수"
                onChangeText={(text) => setValue("address", text)}
                placeholderTextColor="#808080"
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 총 인원 수 */}
              <Image
                style={{ width: 100, height: 60, top: "1.5%", right: "34%" }}
                source={require("../../assets/noLoginNanumNeedPlace.png")}
                resizeMode="contain"
              />

              <TextInput
                style={styles.inputtext}
                placeholder="나눔하는데 필요한 공간 (㎡)"
                onChangeText={(text) => setValue("totalHc", text)}
                placeholderTextColor="#808080"
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 현재 인원 수 */}
              <Image
                style={{ width: 100, height: 60, top: "1.5%", right: "34%" }}
                source={require("../../assets/noLoginNanumContent.png")}
                resizeMode="contain"
              />

              <TextInput
                style={styles.inputtext}
                placeholder="나눔하는 내용"
                onChangeText={(text) => setValue("currHc", text)}
                placeholderTextColor="#808080"
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* ///////////////////////////////////////////////////////////// */}


              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* ///////////////////////////////////////////////////////////// */}
            </ScrollView>

            <TouchableOpacity
              onPress={handleSignupButtonClick} // 가입 버튼 클릭 시 모달 표시
            >
              <Image
                style={{
                  width: 350,
                  height: 100,
                  top: "5%",
                  right: "0%",
                  marginRight: 10,
                }}
                source={require("../../assets/noLoginNanumSuccess.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/* 로그인으로 넘어가는 부분 */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                bottom: "0%",
                right: "1.5%",
                bottom: "5%",
                paddingTop: 0,
              }}
            >
              {/* 로그인 완료 모달 */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={isSignupSuccessModalVisible} // 상태 변수에 따라 모달 표시 여부 결정
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
                      source={require("../../assets/signupsucess.png")}
                      resizeMode="contain"
                    />
                    <TouchableOpacity
                      onPress={() => setSignupSuccessModalVisible(false)} // 모달 내부의 버튼 클릭 시 모달 숨김
                    ></TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // 바텀시트 올라왔을때 어두워짐
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: "80%", // 올라오는 크기
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 20, // 모서리 부분
    borderTopRightRadius: 20,
  },

  scrollViewContainer: {
    alignItems: "center",
    paddingTop: 0,
  },

  lineStyle: {
    height: 1, // 선의 두께
    backgroundColor: "#828282", // 선의 색상
    width: "100%", // 선의 길이
    bottom: "0%",
  },

  inputtext: {
    width: "100%",
    paddingBottom: 25,
    borderColor: "#828282",
    top: "2%",
    left: "6%",
    fontSize: 20,
    marginBottom: 10,
    color: "#6F6A6A",
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

export default BottomSheetP;
