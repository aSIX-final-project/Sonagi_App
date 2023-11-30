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
import { KeyboardAvoidingView } from "react-native";

const BottomsheetModDel = ({
  modalVisible,
  setModalVisible,
  navigation,
  route,
}) => {
  const { userInfo } = route.params;
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
    console.log("first");
    closeBottomSheet.start(() => {
      console.log("second");
      setModalVisible(false);
    });
  };

  // 게시판 모달 상태(게시글 수정하기)
  const [isNotionModalVisible3, setNotionModalVisible3] = useState(false);
  // 게시판 버튼 클릭 핸들러
  const handleNotionButtonClick3 = () => {
    console.log("Click3");
    closeModal(); // 추가
    setNotionModalVisible3(true);
  };

  return (
    <View style={styles.container}>
      {/* 공지 게시글 수정하기 모달 디자인 (아직 구현안됨<---)*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isNotionModalVisible3}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView2}>
            <View style={styles.modalView2}>
              {/* 게시판 모달 관련 코드 */}
              <TouchableOpacity
                style={{ width: "10%", left: "48%" }}
                onPress={() => setNotionModalVisible3(false)}
              >
                <View style={{ marginBottom: "10%" }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../../assets/cancle.png")}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              {/* 제목 입력칸 */}
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "Play-Bold",
                    fontSize: 20,
                    color: "#656565",
                    marginTop: "10%",
                  }}
                >
                  [공지]23시-03시 정기 점검 예정
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Play-Regular",
                  fontSize: 15,
                  color: "#8B8E90",
                  marginTop: "1%",
                }}
              >
                2023.11.06
              </Text>
              <View
                style={{
                  borderBottomColor: "#DBDBDB",
                  width: "100%",
                  marginTop: "5%",
                }}
              />

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* 내용을 입력칸 */}
              <Text
                style={{
                  width: "90%",
                  height: "60%",
                  fontSize: 20,
                  marginTop: "5%",
                }}
              >
                전체 앱 점검을 23시 ~ 03시까지 진행 할 예정이니 이용에 참고
                부탁드립니다.
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* 수락하기, 거절하기 모달디자인 */}
      <Modal
        visible={modalVisible}
        animationType={"fade"}
        transparent
        statusBarTranslucent
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.overlay}
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
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: "75%",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    style={{ marginLeft: "35%" }}
                    onPress={closeModal}
                  >
                    <Image
                      style={{ width: 22, height: 30 }}
                      source={require("../../assets/cancle.png")}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>

                {/* 수락 하기 */}
                <View style={{ width: "100%", height: "28%" }}>
                  <TouchableOpacity style={{ width: "100%", height: "100%" }}>
                    <Text
                      style={{
                        fontFamily: "Play-Regular",
                        fontSize: 23,
                        color: "#6F6A6A",
                        paddingLeft: "10%",
                        paddingTop: "2.5%",
                      }}
                    >
                      수락 하기
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* 거절 하기 */}
                <View style={{ width: "100%", height: "28%" }}>
                  <TouchableOpacity
                    style={{ width: "100%", height: "100%" }}
                    onPress={handleNotionButtonClick3}
                  >
                    <Text
                      style={{
                        fontFamily: "Play-Regular",
                        fontSize: 23,
                        color: "#6F6A6A",
                        paddingLeft: "10%",
                        paddingTop: "2.5%",
                      }}
                    >
                      거절 하기
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
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
    height: "18%", // 올라오는 크기
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFC",
  },
});

export default BottomsheetModDel;
