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

const BottomsheetModDel = ({
  modalVisible,
  setModalVisible,
  navigation,
  item,
  onClose,
}) => {
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

  // 게시판 모달 상태(게시글 수정하기)
  const [isNotionModalVisible3, setNotionModalVisible3] = useState(false);


  // 수정 모달 상태(게시글 수정하기
  // 게시판 버튼 클릭 핸들러
  const handleNotionButtonClick2 = () => {
    closeModal().then(() => {
      setNotionModalVisible3(true);
    });
  };


  const handleNotionButtonClick3 = async () => {
    console.log("Click3");

    try {
      const formData = {
        textNum: item,
      };
      let response = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/notice/delete",
        formData
      );
    } catch (error) {
      console.error("Cannot fetch data: ", error);
    }

    closeModal(); // 추가
    setNotionModalVisible3(true);
    if (onClose) {
      onClose();
    }
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
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
              <TextInput
                style={styles.inputtext}
                placeholder="제목을 입력하세요."
                placeholderTextColor="#808080"
                onChangeText={text => setTitle(text)}
              // value={title}
              />

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              <TextInput
                style={styles.inputtext2}
                placeholder="내용을 입력하세요."
                placeholderTextColor="#808080"
                multiline={true}
                numberOfLines={10}
                onChangeText={text => setContent(text)}
              // value={content}
              />

              {/* 등록 버튼 */}
              <TouchableOpacity
                style={{
                  width: "95%",
                  height: "10%",
                  borderRadius: 18,
                  marginTop: "8%",
                  marginBottom: "15%",
                  backgroundColor: "#44A5FF",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              // onPress={handleSubmit}
              >
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    fontFamily: "Play-Bold",
                    color: "#FFFFFF",
                  }}
                >
                  수정하기
                </Text>
              </TouchableOpacity>
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

                {/* 수정 하기 */}
                <View style={{ width: "100%", height: "28%" }}>
                  <TouchableOpacity
                    style={{ width: "100%", height: "100%" }}
                    onPress={handleNotionButtonClick2}
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
                      수정
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* 삭제 하기 */}
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
                      삭제
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
    width: "75%",
    height: "70%",
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
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFC",
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

  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  inputtext: {
    width: "80%",
    paddingBottom: 10,
    borderColor: "#828282",
    marginTop: "10%",
    left: "0%",
    fontSize: 26,
    marginBottom: 10,
    color: "#6F6A6A",
  },

  inputtext2: {
    width: "80%",
    height: "55%",
    paddingBottom: 25,
    borderColor: "#828282",
    marginTop: "8%",
    left: "0%",
    fontSize: 26,
    marginBottom: "7%",
    color: "#6F6A6A",
  },
  lineStyle: {
    height: 2, // 선의 두께
    backgroundColor: "#E4E4E4", // 선의 색상
    width: "90%", // 선의 길이
    marginBottom: "3%",
  },
});

export default BottomsheetModDel;