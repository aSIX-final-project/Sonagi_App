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

const BottomsheetAC = ({ modalVisible, setModalVisible, navigation, selectedItem }) => {
  const [dataList, setDataList] = useState([]);

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


  useEffect(() => {
    const fetchData = async () => {
      if (selectedItem != null) {
        console.log("asdasdasd", selectedItem.id);

        const formData = {
          id: selectedItem.id,
        };
        let res = await axios.post(
          "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/member/findById",
          formData
        );

        if (res.data.length < 1) {
          res = await axios.post(
            "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/findById",
            formData
          );
        }
        setDataList(res.data);

        console.log("qwerasdzxc", res.data);
      }
    };
    fetchData();
  }, [selectedItem]); // selectedItem이 변경될 때마다 fetchData가 실행됩니다.




  const acceptMethod = async () => {
    // 수락 버튼이 눌렸을 때 실행할 로직을 이곳에 작성합니다.
    console.log('수락하기 버튼이 눌렸습니다.');
    console.log(dataList);
    console.log(selectedItem);

    if (selectedItem.introduction != null) {// 시설 수정 -> 시설 이름, 시설 전화번호, 시설 주소, 시설 인원수, 시설 소개
      const formData1 = {
        id: dataList[0].id,
        password: dataList[0].password,
        adTel: selectedItem.adTel,
        adName: selectedItem.adName,
        address: selectedItem.address,
        totalHc: selectedItem.totalHc,
        introduction: selectedItem.introduction,
      };
      let res = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/member/modify",
        formData1
      );
      console.log("시설 수정 완료");
      const formData2 = {
        adName: selectedItem.adName,
        adTel: selectedItem.adTel,
        address: selectedItem.address,
        id: selectedItem.id,
        introduction: selectedItem.introduction,
        managerName: selectedItem.managerName,
        totalHc: selectedItem.totalHc,
      };
      res = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/admin/delete",
        formData2
      );
      console.log("삭제 완료");

    } else { // 식당 수정 -> 식당 주소, 식당 전화번호, 식당 이름
      const formData = {
        id: dataList[0].id,
        password: dataList[0].password,
        adTel: selectedItem.adTel,
        adName: selectedItem.adName,
        address: selectedItem.address,
      };
      console.log("formData : ", formData);
      let res = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/modifyPw",
        formData
      );
      console.log("수정 완료");
      const formData2 = {
        adName: selectedItem.adName,
        adTel: selectedItem.adTel,
        address: selectedItem.address,
        id: selectedItem.id,
        introduction: selectedItem.introduction,
        managerName: selectedItem.managerName,
        totalHc: selectedItem.totalHc,
      };
      res = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/admin/delete",
        formData2
      );
      console.log("삭제 완료");
    }


  };



  const acceptMethod2 = async () => {
    console.log('거절하기 버튼이 눌렸습니다.');
    console.log(selectedItem);

    const formData2 = {
      adName: selectedItem.adName,
      adTel: selectedItem.adTel,
      address: selectedItem.address,
      id: selectedItem.id,
      introduction: selectedItem.introduction,
      managerName: selectedItem.managerName,
      totalHc: selectedItem.totalHc,
    };
    res = await axios.post(
      "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/admin/delete",
      formData2
    );
    console.log("거절 완료");
  };


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

                {/* 수락 하기 */}
                <View style={{ width: "100%", height: "28%" }}>
                  <TouchableOpacity
                    style={{ width: "100%", height: "100%" }}
                    onPress={acceptMethod} // 수락하기 버튼을 눌렀을 때 acceptMethod를 실행
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
                      수락 하기
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* 거절 하기 */}
                <View style={{ width: "100%", height: "28%" }}>
                  <TouchableOpacity style={{ width: "100%", height: "100%" }} onPress={acceptMethod2}>
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
    width: "80%",
    height: "56%",
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
    height: "170%",
    paddingBottom: 25,
    borderColor: "#828282",
    marginTop: "4%",
    left: "0%",
    fontSize: 20,
    marginBottom: "7%",
    color: "#6F6A6A",
  },
});

export default BottomsheetAC;