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
  TouchableOpacity,
  Linking,
  Keyboard,
} from "react-native";

import axios from "axios";

const BottomsheetMarker = ({
  modalVisible,
  setModalVisible,
  navigation,
  id,
}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    console.log("asdsadasdas");
    console.log(id);
    const fetchData = async () => {
      try {
        if (id !== null) {
          const formData = {
            id: id,
          };
          let res = await axios.post(
            "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/member/findById",
            formData
          );
          if (res.data.length === 0) {
            res = await axios.post(
              "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/findById",
              formData
            );
          }
          if (isMounted) {
            console.log("Response:", res.data);
            setUserData(res.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

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

  const kakaoMap = async () => {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${
        userData && userData[0]?.address
      }`,
      {
        headers: {
          Authorization: "KakaoAK db06c51425b99419a11f3881f8491642",
        },
      }
    );
    const data = await response.json();
    console.log("123");
    console.log(data);
    const { x, y } =
      data.documents[0].road_address || data.documents[0].address;

    const url = `kakaomap://route?ep=${y},${x}&by=CAR`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const callPhone = (phoneNum) => {
    const url = `tel:${phoneNum}`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View style={styles.overlay}>
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
              {/* 상호명, 주소 */}
              <View
                style={{
                  marginTop: "30%",
                  flexDirection: "row",
                  width: "90%",
                  height: "8%",
                  alignItems: "center",
                  marginBottom: "3%",
                  paddingRight: "50%",
                }}
              >
                <View>
                  <Image
                    style={{
                      width: 43,
                      height: 43,
                      bottom: "0%",
                      marginLeft: "10%",
                      borderRadius: 60,
                    }}
                    source={{ uri: userData && userData[0]?.profileImage }}
                    resizeMode="contain"
                  />
                </View>

                <View style={{ marginTop: "1%" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      fontFamily: "Play-Bold",
                      width: "auto",
                    }}
                  >
                    {userData && userData[0]?.adName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      fontFamily: "Play-Regular",
                      width: "100%",
                      overflow: "visible",
                      whiteSpace: "normal",
                    }}
                  >
                    {userData && userData[0]?.address}
                  </Text>
                </View>
              </View>

              {/* 밑줄 */}
              <View
                style={{
                  borderBottomColor: "#7D7D7D",
                  borderBottomWidth: 1,
                  width: "90%",
                  marginTop: "5%",
                }}
              />

              {/* 총 인원, 연락처 */}
              <View
                style={{
                  flexDirection: "row",
                  marginRight: "35%",
                  marginTop: "2%",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    fontFamily: "Play-Regular",
                  }}
                >
                  연락처: {userData && userData[0]?.phoneNum}
                </Text>
              </View>

              {/* 시설소개 */}
              <View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  height: "17%",
                  alignItems: "center",
                  marginTop: "7%",
                  paddingRight: "40%",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      color: "#393939",
                      fontWeight: "bold",
                      fontFamily: "Play-Bold",
                      marginBottom: "1%",
                      fontSize: 20,

                      width: "100%",
                    }}
                  >
                    현재 등록된 음식이 없습니다!
                  </Text>
                </View>
              </View>

              {/* 하단 버튼 */}
              <View
                style={{
                  marginBottom: "25%",
                  width: "90%",
                  height: "20%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "48%",
                    height: "70%",
                    backgroundColor: "#E1F1FF",
                    borderRadius: 26,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => kakaoMap(/* provide your coordinates here */)}
                >
                  <Text
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      fontFamily: "Play-Bold",
                      color: "#44A5FF",
                    }}
                  >
                    길찾기
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: "48%",
                    height: "70%",
                    backgroundColor: "#44A5FF",
                    borderRadius: 26,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "4%",
                  }}
                  onPress={() => callPhone(userData && userData[0]?.phoneNum)}
                >
                  <Text
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      fontFamily: "Play-Bold",
                      color: "#FFFFFF",
                    }}
                  >
                    통화
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // 바텀시트 올라왔을때 어두워짐
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: "40%", // 올라오는 크기
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
    width: "90%", // 선의 길이
  },

  inputtext: {
    width: "20%",
    height: "100%",
    borderColor: "#828282",
    fontSize: 20,
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
  inputtext: {
    width: "23%",
    height: "77%",
    borderColor: "#828282",
    fontSize: 30,
    color: "#6F6A6A",
    backgroundColor: "#E1F1FF",
    borderRadius: 22,
    color: "#393939",
    textAlign: "center",
  },

  inputtext2: {
    width: "100%",
    height: "100%",
    borderColor: "#828282",
    fontSize: 25,
    color: "#6F6A6A",
    backgroundColor: "#E1F1FF",
    borderRadius: 22,
    color: "#393939",
    textAlign: "center",
  },
});

export default BottomsheetMarker;
