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
import axios from "axios";

const BottomsheetCancel = ({
  modalVisible,
  setModalVisible,
  navigation,
  receiverId,
  senderId,
  foodName,
  fetchFoodReq,
}) => {
  const handleCancel = async () => {
    try {
      const requestBody = {
        receiverId,
        senderId,
        foodName,
      };

      const response = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/foodReq/senderDelete",
        requestBody
      );

      if (response.status === 200) {
        // 요청이 성공했을 때 동작
        fetchFoodReq();
        console.log("요청 성공: ", response.data);
        closeModal();
      } else {
        // 요청이 실패했을 때 동작
        console.log("요청 실패: ", response.data);
      }
    } catch (e) {
      console.error(e);
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
    return new Promise((resolve) => {
      closeBottomSheet.start(() => {
        setModalVisible(false);
        resolve();
      });
    });
  };

  return (
    <View style={styles.container}>
      {/* 삭제하기, 수정하기 모달디자인 */}
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

                {/* 삭제 하기 */}
                <View
                  style={{ width: "100%", height: "30%", marginBottom: "4%" }}
                >
                  <TouchableOpacity
                    style={{ width: "100%", height: "100%" }}
                    onPress={handleCancel}
                  >
                    <Text
                      style={{
                        fontFamily: "Play-Regular",
                        fontSize: 23,
                        color: "#6F6A6A",
                        paddingLeft: "10%",
                        paddingTop: "2%",
                      }}
                    >
                      요청 취소
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
    height: "13%", // 올라오는 크기
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
    width: "80%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: "80%",
    justifyContent: "flex-start",
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
  lineStyle: {
    height: 2, // 선의 두께
    backgroundColor: "#E4E4E4", // 선의 색상
    width: "90%", // 선의 길이
    marginBottom: "3%",
  },
  inputtext: {
    width: "80%",
    paddingBottom: 10,
    borderColor: "#828282",
    left: "0%",
    fontSize: 20,
    marginBottom: 10,
    color: "#6F6A6A",
  },

  inputtext2: {
    width: "80%",
    height: "47%",
    paddingBottom: 25,
    borderColor: "#828282",
    marginTop: "38%",
    left: "0%",
    fontSize: 20,
    marginBottom: "7%",
    color: "#6F6A6A",
  },

  inputtext3: {
    width: "80%",
    height: "12%",
    paddingBottom: 25,
    borderColor: "#828282",
    fontSize: 20,
    marginBottom: "7%",
    color: "#6F6A6A",
  },
});

export default BottomsheetCancel;
