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
  Alert,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

const Bottomsheetfoodp = ({
  modalVisible,
  setModalVisible,
  navigation,
  userInfo,
  adName,
  profileImage,
  foodGiver,
  foodName,
  foodId,
  foodPrice,
  foodAmount,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // 에러 메시지 상태를 추가합니다.
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const [isFoodReqSuccessModalVisible, setFoodReqSuccessModalVisible] =
    useState(false);

  const [isFoodReqFailedModalVisible, setFoodReqFailedModalVisible] =
    useState(false); // 모달 알림창의 상태

  const [modalMessage, setModalMessage] = useState("");

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

  // useEffect(() => {
  //   if (modalVisible) {
  //     resetBottomSheet.start();
  //   }
  //   // 값이 잘 받아왔는지 확인하기 위한 console.log
  //   console.log("adName:", adName);
  //   console.log("profileImage:", profileImage);
  //   console.log("foodGiver:", foodGiver);
  //   console.log("foodName:", foodName);
  //   console.log("foodId:", foodId);
  //   console.log("foodPrice:", foodPrice);
  //   console.log("userInfo:", userInfo);
  // }, [
  //   modalVisible,
  //   adName,
  //   profileImage,
  //   foodGiver,
  //   foodName,
  //   foodId,
  //   foodPrice,
  //   userInfo,
  // ]);

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

  //유효성 검사
  const validateInput = () => {
    if (!inputValue) {
      setModalMessage("인분 수를 설정해주세요!");
      setFoodReqFailedModalVisible(true);

      setTimeout(() => {
        setFoodReqFailedModalVisible(false);
      }, 2000);
      return false;
    }

    if (!Number.isInteger(Number(inputValue))) {
      setModalMessage("정확한 인분 수를 입력하세요.");
      setFoodReqFailedModalVisible(true);

      setTimeout(() => {
        setFoodReqFailedModalVisible(false);
      }, 2000);
      return false;
    }

    if (inputValue % 5 !== 0) {
      setModalMessage("인분 수를 5인분 단위로 설정해주세요!");
      setFoodReqFailedModalVisible(true);

      setTimeout(() => {
        setFoodReqFailedModalVisible(false);
      }, 2000);
      return false;
    }

    // 모든 검사를 통과하면 에러 메시지를 초기화하고 true를 반환합니다.
    return true;
  };

  const sendData = async () => {
    try {
      if (validateInput()) {
        console.log("들어왔다");
        const responseCheck = await axios.post(
          "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/foodReq/findByIdFoodNameSenderId",
          {
            receiverId: foodId,
            foodName: foodName,
            senderId: userInfo.id,
          }
        );
        console.log(responseCheck.data[0]);

        if (!responseCheck.data[0]) {
          console.log("들어왔는가?", foodAmount);
          console.log("들어왔는가?", inputValue);
          if (Number(foodAmount) >= Number(inputValue)) {
            const data = {
              sender: adName,
              senderImage: profileImage,
              receiver: foodGiver,
              foodName: foodName,
              serving: inputValue,
              foodPrice: foodPrice,
              receiverId: foodId,
              senderTel: userInfo.phoneNum,
              senderId: userInfo.id,
            };
            // console.log(data);

            const response = await fetch(
              "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/foodReq/regist",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );

            // 백엔드로부터 온 응답 처리
            if (response.status === 200) {
              console.log(
                foodName + " " + inputValue + "인분 요청이 완료되었습니다."
              );
              setFoodReqSuccessModalVisible(true);

              // 2초 후에 홈 화면으로 이동
              setTimeout(() => {
                setFoodReqSuccessModalVisible(false);
                navigation.navigate("KakaoMapP", { userInfo: userInfo });
              }, 2000);
            } else {
              console.log("요청 실패, 다시 시도해주세요.");
              setModalMessage("요청 실패, 다시 시도해주세요.");
              setFoodReqFailedModalVisible(true);

              // 2초 후에 홈 화면으로 이동
              setTimeout(() => {
                setFoodReqFailedModalVisible(false);
              }, 2000);
            }
          } else {
            console.log("요청 가능한 인분 수를 초과하였습니다.");
            setModalMessage("요청 가능한 인분 수를 초과하였습니다.");
            setFoodReqFailedModalVisible(true);

            // 2초 후에 홈 화면으로 이동
            setTimeout(() => {
              setFoodReqFailedModalVisible(false);
            }, 2000);
          }

          // Alert.alert(
          //   "요청 완료", // 제목
          //   `${foodName} ${inputValue}인분 요청이 완료되었습니다.`, // 메시지
          //   [{ text: "확인" }] // 버튼 배열
          // );
        } else {
          console.log("이미 등록된 요청이 있습니다.");
          setModalMessage("이미 등록된 요청이 있습니다.");
          setFoodReqFailedModalVisible(true);

          // 2초 후에 홈 화면으로 이동
          setTimeout(() => {
            setFoodReqFailedModalVisible(false);
          }, 2000);
        }
      }
    } catch (error) {
      console.error("에러:", error);
      setFoodReqFailedModalVisible(true);

      // 2초 후에 홈 화면으로 이동
      setTimeout(() => {
        setFoodReqFailedModalVisible(false);
      }, 2000);
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={"fade"}
      transparent
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            {/* 바텀 시트 구성 부분 */}
            <Text
              style={{
                width: 70,
                height: 40,
                marginBottom: "10%",
                marginTop: "5%",
              }}
            />

            {/* 음식 인분 설정하기 */}
            <View
              style={{
                flexDirection: "row",
                height: "7%",
                width: "90%",
                marginBottom: "0%",
                marginTop: "10%",
              }}
            >
              <Image
                style={{
                  width: 27,
                  height: 27,
                  marginBottom: "1%",
                  marginRight: "1%",
                }}
                source={require("../../assets/food.png")}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  fontFamily: "Play-Bold",
                  color: "#383838",
                  marginTop: "0.5%",
                }}
              >
                음식 양 설정하기
              </Text>
            </View>
            {/* 선 긋기 */}
            <View style={styles.lineStyle} />
            <View
              style={{
                flexDirection: "row",
                height: "15%",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
              }}
            >
              {/* 텍스트 입력 부분 */}
              <TextInput
                style={styles.inputtext}
                textAlign="center" // 가운데 정렬
                keyboardType="numeric" // 숫자만 입력
                maxLength={3} // 3자리수 까지 입력가능
                onChangeText={(text) => setInputValue(text)}
                value={inputValue}
              />
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  fontFamily: "Play-Regular",
                  color: "#6F6A6A",
                  marginTop: "8.5%",
                  marginLeft: "3%",
                }}
              >
                인분
              </Text>
              {/* 에러 메시지 표시 */}
              {errorMessage && (
                <Text style={{ color: "red", marginLeft: "5%" }}>
                  {errorMessage}
                </Text>
              )}
            </View>
            <View style={styles.lineStyle2} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: "Play-Bold",
                color: "#383838",
                marginRight: "32%",
                marginTop: "3%",
              }}
            >
              ※ 5인분 단위로 기부를 받을 수 있습니다.
            </Text>

            {/* 확인 버튼 */}
            <TouchableOpacity
              style={{
                width: 360,
                height: 55,
                borderRadius: 22,
                marginTop: "55%",
                marginBottom: "15%",
                backgroundColor: "#44A5FF",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setErrorMessage(null); // 버튼을 누를 때마다 에러 메시지를 초기화합니다.
                sendData();
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  fontFamily: "Play-Bold",
                  color: "#FFFFFF",
                }}
              >
                요청
              </Text>
            </TouchableOpacity>

            <Modal
              animationType="fade"
              transparent={true}
              visible={isFoodReqSuccessModalVisible}
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
                    {foodName +
                      " " +
                      inputValue +
                      "인분 요청이 완료되었습니다."}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setFoodReqSuccessModalVisible(false)}
                  ></TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="fade"
              transparent={true}
              visible={isFoodReqFailedModalVisible}
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
                    onPress={() => setFoodReqFailedModalVisible(false)}
                  ></TouchableOpacity>
                </View>
              </View>
            </Modal>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
    height: 2, // 선의 두께
    backgroundColor: "#E4E4E4", // 선의 색상
    width: "90%", // 선의 길이
    marginBottom: "3%",
  },

  lineStyle2: {
    height: 2, // 선의 두께
    backgroundColor: "#E4E4E4", // 선의 색상
    width: "90%", // 선의 길이
    marginTop: "3%",
  },

  inputtext: {
    width: "23%",
    height: "77%",
    borderColor: "#828282",
    fontSize: 45,
    color: "#6F6A6A",
    backgroundColor: "#E1F1FF",
    borderRadius: 22,
    color: "#393939",
    textAlign: "center",
  },

  inputtext2: {
    width: "100%",
    height: "77%",
    borderColor: "#828282",
    fontSize: 45,
    color: "#6F6A6A",
    backgroundColor: "#E1F1FF",
    borderRadius: 22,
    color: "#393939",
    textAlign: "center",
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

  modalView2: {
    width: "50%",
    height: "25%",
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
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
});

export default Bottomsheetfoodp;
