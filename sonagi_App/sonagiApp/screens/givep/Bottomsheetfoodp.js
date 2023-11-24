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

const Bottomsheetfoodp = ({ modalVisible, setModalVisible, navigation }) => {
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
                  음식 인분 설정하기
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
                  marginRight: "50%",
                }}
              >
                {/* 텍스트 입력 부분 */}
                <TextInput
                  style={styles.inputtext}
                  textAlign="center" // 가운데 정렬
                  keyboardType="numeric" // 숫자만 입력
                  maxLength={3} // 3자리수 까지 입력가능
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
              </View>
              <View style={styles.lineStyle2} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  fontFamily: "Play-Bold",
                  color: "#383838",
                  marginRight: "32%",
                  marginTop: "2%",
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
              >
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    fontFamily: "Play-Bold",
                    color: "#FFFFFF",
                  }}
                >
                  확인
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
});

export default Bottomsheetfoodp;
