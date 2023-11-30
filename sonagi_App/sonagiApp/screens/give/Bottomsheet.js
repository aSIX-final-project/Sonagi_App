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

const BottomSheet = ({ modalVisible, setModalVisible, navigation }) => {
  const {
    watch, // 입력 값 감시
    setValue, // 입력 값 설정
    formState: { errors }, // 폼 상태와 에러
  } = useForm();

  // 로그인 완료 모달 표시 여부를 관리하는 상태 변수
  const [isSignupSuccessModalVisible, setSignupSuccessModalVisible] =
    useState(false);

  // 유효성 검사 라인 (아이디)
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);

  const isUsernameValid = /^[a-zA-Z0-9]{4,12}$/.test(username);
  const handleUsernameChange = (text) => {
    setUsername(text); // 아이디 입력값 업데이트
    setUsernameError(false); // 에러 표시 숨김
  };

  // 유효성 검사 라인 (비밀번호)
  const [password, setPassword] = useState(""); // 비밀번호 입력값을 상태 변수로 관리
  const [passwordError, setPasswordError] = useState(false);

  // 영문, 숫자, 특수문자를 포함한 8자 이상의 유효성 검사
  const isPasswordValid = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(
    password
  );
  const handlePasswordChange = (text) => {
    setPassword(text); // 비밀번호 입력값 업데이트
    setPasswordError(false); // 에러 표시 숨김
  };

  // 유효성 검사 라인 (이름)
  const [name, setName] = useState(""); // 이름 입력값을 상태 변수로 관리
  const [nameError, setNameError] = useState(false); // 이름 유효성 검사 에러 표시를 위한 상태 변수

  const isNameValid = name !== ""; // 이름이 비어있지 않은지 검사
  const handleNameChange = (text) => {
    setName(text); // 이름 입력값 업데이트
    setNameError(false); // 에러 표시 숨김
  };

  // 유효성 검사 라인 (전화번호)
  const [phoneNumber, setPhoneNumber] = useState(""); // 전화번호 입력값을 상태 변수로 관리
  const [phoneNumberError, setPhoneNumberError] = useState(false); // 전화번호 유효성 검사 에러 표시를 위한 상태 변수

  const isPhoneNumberValid = /^\d+$/.test(phoneNumber); // 전화번호가 숫자만으로 이루어져 있는지 검사
  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text); // 전화번호 입력값 업데이트
    setPhoneNumberError(false); // 에러 표시 숨김
  };

  // 유효성 검사 라인 (시설 이름)
  const [givername, setGivername] = useState(""); // 이름 입력값을 상태 변수로 관리
  const [givernameError, setGivernameError] = useState(false); // 이름 유효성 검사 에러 표시를 위한 상태 변수

  const isGivernameValid = givername !== ""; // 이름이 비어있지 않은지 검사
  const handleGivernameChange = (text) => {
    setGivername(text); // 이름 입력값 업데이트
    setGivernameError(false); // 에러 표시 숨김
  };

  // 유효성 검사 라인 (시설 전화번호)
  const [giveradTel, setGiverAdTel] = useState(""); // 전화번호 입력값을 상태 변수로 관리
  const [giveradTelError, setGiverAdTelError] = useState(false); // 전화번호 유효성 검사 에러 표시를 위한 상태 변수

  const isGiverAdTelValid = /^\d+$/.test(giveradTel); // 전화번호가 숫자만으로 이루어져 있는지 검사
  const handleGiverAdTelChange = (text) => {
    setGiverAdTel(text); // 전화번호 입력값 업데이트
    setGiverAdTelError(false); // 에러 표시 숨김
  };

  // 유효성 검사 라인 (시설 주소)
  const [giveraddress, setGiveraddress] = useState(""); // 주소 입력값을 상태 변수로 관리
  const [giveraddressError, setGiveraddressError] = useState(false); // 주소 유효성 검사 에러 표시를 위한 상태 변수

  const isGiveraddressValid = giveraddress !== ""; // 주소가 비어있지 않은지 검사
  const handleGiveraddressChange = (text) => {
    setGiveraddress(text); // 주소 입력값 업데이트
    setGiveraddressError(false); // 에러 표시 숨김
  };

  // 유효성 검사 라인 (사업자 등록 번호)
  const [businessNumber, setBusinessNumber] = useState(""); // 사업자 등록 번호 입력값을 상태 변수로 관리
  const [businessNumberError, setBusinessNumberError] = useState(false); // 사업자 등록 번호 유효성 검사 에러 표시를 위한 상태 변수

  const isBusinessNumberValid = /^\d{10}$/.test(businessNumber); // 사업자 등록 번호가 10자리의 숫자인지 검사
  const handleBusinessNumberChange = (text) => {
    setBusinessNumber(text); // 사업자 등록 번호 입력값 업데이트
    setBusinessNumberError(false); // 에러 표시 숨김
  };

  const handleSignupButtonClick = async () => {
    // 아이디 유효성 검사
    if (!isUsernameValid) {
      setUsernameError(true);
      return;
    }

    // 비밀번호 유효성 검사
    if (!isPasswordValid) {
      setPasswordError(true);
      return;
    }

    // 이름 유효성 검사
    if (!isNameValid) {
      setNameError(true);
      return;
    }

    // 전화번호 유효성 검사
    if (!isPhoneNumberValid) {
      setPhoneNumberError(true);
      return;
    }

    // 시설 이름 유효성 검사
    if (!isGivernameValid) {
      setGivernameError(true);
      return;
    }

    // 시설 전화번호 유효성 검사
    if (!isGiverAdTelValid) {
      handleGiverAdTelChange(true);
      return;
    }

    // 시설 주소 유효성 검사
    if (!isGiveraddressValid) {
      setGiveraddressError(true);
      return;
    }

    // 사업자 등록 번호 유효성 검사
    if (!isBusinessNumberValid) {
      setBusinessNumberError(true);
      return;
    }

    try {
      // POST 요청에 필요한 데이터
      const formData = {
        id: username,
        password: password,
        name: name,
        phoneNum: phoneNumber,
        adTel: giveradTel,
        adName: givername,
        address: giveraddress,
        bNum: businessNumber,
      };

      // 폼 데이터를 JSON 문자열로 변환하여 확인
      const jsonData = JSON.stringify(formData);
      console.log(jsonData);

      // 실제로는 axios를 사용하여 서버에 요청을 보냅니다.
      const response = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/regist",
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
                source={require("../../assets/signup3.png")}
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
                style={{ width: 50, height: 50, top: "1.2%", right: "38.5%" }}
                source={require("../../assets/id2.png")}
                resizeMode="contain"
              />

              <TextInput
                style={[
                  styles.inputtext,
                  !isUsernameValid && { borderColor: "red" },
                ]}
                placeholder="아이디를 입력하세요."
                placeholderTextColor="#808080"
                value={username}
                onChangeText={handleUsernameChange}
              />

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {usernameError && (
                <Text style={styles.errorText}>
                  4~12자리의 영문자 또는 숫자여야 합니다.
                </Text>
              )}

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 비밀번호 */}
              <Image
                style={{ width: 60, height: 60, top: "1.5%", right: "36.5%" }}
                source={require("../../assets/password2.png")}
                resizeMode="contain"
              />

              <TextInput
                style={[
                  styles.inputtext,
                  !isPasswordValid && { borderColor: "red" },
                ]}
                placeholder="비밀번호를 입력하세요."
                placeholderTextColor="#808080"
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange} // 텍스트 변경 시 비밀번호 유효성 검사 수행
              />

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />
              {passwordError && (
                <Text style={styles.errorText2}>
                  영문, 숫자, 특수문자를 포함한 8글자 이상이어야 합니다.
                </Text>
              )}
              {/* ///////////////////////////////////////////////////////////// */}

              {/* 이름 */}
              <Image
                style={{ width: 30, height: 50, top: "1.5%", right: "40.5%" }}
                source={require("../../assets/name.png")}
                resizeMode="contain"
              />

              <TextInput
                style={[
                  styles.inputtext,
                  !isNameValid && { borderColor: "red" }, // 이름 유효성 검사에 실패하면 테두리 색상을 빨간색으로 변경
                ]}
                placeholder="이름을 입력하세요."
                placeholderTextColor="#808080"
                value={name}
                onChangeText={handleNameChange} // 텍스트 변경 시 이름 유효성 검사 수행
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />
              {nameError && (
                <Text style={styles.errorText3}>이름을 입력하세요.</Text>
              )}
              {/* ///////////////////////////////////////////////////////////// */}

              {/* 전화번호 */}
              <Image
                style={{ width: 60, height: 60, top: "1.5%", right: "36.7%" }}
                source={require("../../assets/phonenumber.png")}
                resizeMode="contain"
              />

              <TextInput
                style={[
                  styles.inputtext,
                  !isPhoneNumberValid && { borderColor: "red" },
                ]}
                placeholder="전화번호를 입력하세요."
                placeholderTextColor="#808080"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />
              {phoneNumberError && (
                <Text style={styles.errorText4}>
                  전화번호는 숫자만 입력할 수 있습니다.
                </Text>
              )}

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 시설 이름 */}
              <Image
                style={{ width: 60, height: 60, top: "1.5%", right: "37%" }}
                source={require("../../assets/storename.png")}
                resizeMode="contain"
              />

              <TextInput
                style={[
                  styles.inputtext,
                  !isGivernameValid && { borderColor: "red" }, // 시설이름 유효성 검사
                ]}
                placeholder="시설 이름을 입력하세요."
                placeholderTextColor="#808080"
                value={givername}
                onChangeText={handleGivernameChange} // 텍스트 변경시 시설이름 유효성 검사 수행
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {givernameError && (
                <Text style={styles.errorText5}>시설 이름을 입력하세요.</Text>
              )}

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 시설 전화번호 */}
              <Image
                style={{ width: 90, height: 60, top: "1.5%", right: "33.5%" }}
                source={require("../../assets/storephonenumber.png")}
                resizeMode="contain"
              />

              <TextInput
                style={[
                  styles.inputtext,
                  !isGiverAdTelValid && { borderColor: "red" },
                ]}
                placeholder="시설 전화번호를 입력하세요."
                placeholderTextColor="#808080"
                value={giveradTel}
                onChangeText={handleGiverAdTelChange}
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />
              {giveradTelError && (
                <Text style={styles.errorText4}>
                  전화번호는 숫자만 입력할 수 있습니다.
                </Text>
              )}

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 시설 주소 */}
              <Image
                style={{ width: 60, height: 60, top: "1.5%", right: "37%" }}
                source={require("../../assets/storeaddress.png")}
                resizeMode="contain"
              />

              <TextInput
                style={[
                  styles.inputtext,
                  !isGiveraddressValid && { borderColor: "red" }, // 시설이름 유효성 검사
                ]}
                placeholder="시설 주소를 입력하세요."
                placeholderTextColor="#808080"
                value={giveraddress}
                onChangeText={handleGiveraddressChange} // 텍스트 변경시 시설이름 유효성 검사 수행
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {giveraddressError && (
                <Text style={styles.errorText5}>시설 주소를 입력하세요.</Text>
              )}

              {/* ///////////////////////////////////////////////////////////// */}

              {/* 사업자 등록 번호 */}
              <Image
                style={{ width: 100, height: 60, top: "1.5%", right: "32%" }}
                source={require("../../assets/storenumber.png")}
                resizeMode="contain"
              />

              <TextInput
                style={styles.inputtext}
                placeholder="사업자 등록번호를 입력하세요."
                placeholderTextColor="#808080"
                onChangeText={handleBusinessNumberChange}
                value={businessNumber}
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />
              {businessNumberError && (
                <Text style={styles.errorText6}>
                  올바른 사업자 등록번호를 입력하세요
                </Text>
              )}

              {/* ///////////////////////////////////////////////////////////// */}
            </ScrollView>

            <TouchableOpacity
              onPress={handleSignupButtonClick} // 가입 버튼 클릭 시 모달 표시
            >
              <Image
                style={{
                  width: 350,
                  height: 100,
                  top: "20%",
                  right: "0%",
                  marginRight: 10,
                }}
                source={require("../../assets/signupbutton.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/* 로그인으로 넘어가는 부분 */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                right: "1.5%",
                bottom: "10%",
                paddingTop: 0,
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
                source={require("../../assets/login2-2.png")}
                resizeMode="contain"
              />

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Image
                  style={{ width: 60, height: 90, bottom: "0%", left: "5%" }}
                  source={require("../../assets/login3-2.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* 로그인 완료 모달 */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={isSignupSuccessModalVisible} // 상태 변수에 따라 모달 표시 여부 결정
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity
                      onPress={() => setSignupSuccessModalVisible(false)} // 모달 내부의 버튼 클릭 시 모달 숨김
                    >
                      <Image
                        style={{
                          width: 120,
                          height: 120,
                          bottom: "0.5%",
                          margin: "5%",
                        }}
                        source={require("../../assets/signupsucess.png")}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
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

  errorText: {
    color: "red",
    fontSize: 15,
    marginTop: 1,
    marginRight: "29%",
  },

  errorText2: {
    color: "red",
    fontSize: 15,
    marginTop: 1,
    marginRight: "10%",
  },

  errorText3: {
    color: "red",
    fontSize: 15,
    marginTop: 1,
    marginRight: "66%",
  },

  errorText4: {
    color: "red",
    fontSize: 15,
    marginTop: 1,
    marginRight: "43%",
  },

  errorText5: {
    color: "red",
    fontSize: 15,
    marginTop: 1,
    marginRight: "60%",
  },

  errorText6: {
    color: "red",
    fontSize: 15,
    marginTop: 1,
    marginRight: "45%",
  },
});

export default BottomSheet;
