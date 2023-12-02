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
  Linking,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const GiveReq = ({ navigation, route }) => {
  const { userInfo } = route.params;
  console.log(userInfo.id);

  const [requestList, setRequestList] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://172.16.102.43:8888/boot/foodReq/findById",
        {
          receiverId: userInfo.id,
        }
      );
      console.log("123", response.data);
      setRequestList(response.data);
    } catch (error) {
      console.error("데이터를 가져오는데 실패했습니다:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const callPhone = (phoneNum) => {
    // 카카오 네비게이션 API를 이용해 길찾기 실행
    const url = `tel:${phoneNum}`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View style={styles.container}>
      {/* 상단부분 */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#44A5FF",
          width: "100%",
          height: "12%",
          paddingTop: "7%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "4%",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: "6%", marginRight: "2%" }}
            onPress={() => navigation.navigate("Home", { userInfo: userInfo })}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/backkey.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 기부 요청 목록 */}
      <View
        style={{
          flexDirection: "row",
          height: "5%",
          width: "50%",
          marginBottom: "0%",
          marginTop: "25%",
          marginRight: "40%",
        }}
      >
        <Image
          style={{
            width: 32,
            height: 32,
            marginBottom: "1%",
            marginRight: "1%",
          }}
          source={require("../../assets/food.png")}
          resizeMode="contain"
        />
        <Text
          style={{
            marginLeft: "1%",
            marginTop: "1%",
            fontSize: 30,
            fontWeight: "bold",
            fontFamily: "Play-Bold",
            color: "#383838",
          }}
        >
          기부 요청 목록
        </Text>
      </View>

      {/* 선 긋기 */}
      <View style={styles.lineStyle} />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {requestList.map((item, index) => (
          <View
            key={index}
            style={{
              width: "100%",
              height: 101,
              backgroundColor: "#E1F1FF",
              flexDirection: "row",
              borderRadius: 30,
              flexDirection: "column",
              marginBottom: "10%",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ width: 80, height: 80, borderTopLeftRadius: 30 }}
                source={{ uri: item.senderImage }}
                resizeMode="contain"
              />
              <View
                style={{
                  width: "57%",
                  height: "60%",
                  backgroundColor: "#E1F1FF",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "4%",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    width: "80%",
                    height: "60%",
                    backgroundColor: "#E1F1FF",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 23.5,
                      fontFamily: "Play-Bold",
                      color: "#383838",
                    }}
                  >
                    시설명
                  </Text>
                  <Text
                    style={{
                      fontSize: 23.5,
                      fontFamily: "Play-Regular",
                      color: "#383838",
                    }}
                  >
                    : {item.sender}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    width: "80%",
                    height: "55%",
                    backgroundColor: "#E1F1FF",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 23.5,
                      fontFamily: "Play-Bold",
                      color: "#383838",
                    }}
                  >
                    요청
                  </Text>
                  <Text
                    style={{
                      fontSize: 23.5,
                      fontFamily: "Play-Regular",
                      color: "#383838",
                    }}
                  >
                    : {item.foodName} {item.serving}인분
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 20,
                  right: 25,
                  width: 30,
                  height: 30,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  padding: 5,
                  borderColor: "#65C8FF",
                  borderWidth: 3,
                }}
                onPress={() => callPhone(item.senderTel)}
              >
                <Ionicons name="call" size={14} color="#8BD5FF" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#44A5FF",
                  width: "49%",
                  height: "100%",
                  borderBottomLeftRadius: 30,
                }}
                onPress={async () => {
                  try {
                    const response1 = await axios.post(
                      "http://172.16.102.43:8888/boot/food/minus",
                      {
                        foodAmount: item.serving,
                        id: item.receiverId,
                      }
                    );
                    console.log("res", response1.data);

                    const response2 = await axios.post(
                      "http://172.16.102.43:8888/boot/donation/regist",
                      {
                        donatedProvider: item.receiverId,
                        donatedReceiver: item.senderId,
                        donatedAmount: item.serving,
                        donatedPrice: item.foodPrice,
                        foodTitle: item.foodName,
                      }
                    );
                    console.log(response2.data);

                    const response3 = await axios.post(
                      "http://172.16.102.43:8888/boot/foodReq/delete",
                      {
                        senderId: item.senderId,
                      }
                    );
                    console.log(response3.data);
                    fetchData();
                  } catch (error) {
                    console.error("데이터를 처리하는데 실패했습니다:", error);
                  }
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "2%",
                  }}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      borderTopLeftRadius: 30,
                      marginBottom: "2%",
                    }}
                    source={require("../../assets/check.png")}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Play-Regular",
                      color: "#ffffff",
                      marginLeft: "3%",
                    }}
                  >
                    확인
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#E1F1FF",
                  width: "50%",
                  height: "100%",
                  borderBottomRightRadius: 30,
                }}
                onPress={async () => {
                  try {
                    const response = await axios.post(
                      "http://172.16.102.43:8888/boot/foodReq/delete",
                      {
                        senderId: item.senderId,
                      }
                    );

                    console.log(response.data);
                    fetchData();
                  } catch (error) {
                    console.error("데이터를 삭제하는데 실패했습니다:", error);
                  }
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "2%",
                  }}
                >
                  <Image
                    style={{ width: 22, height: 30, marginBottom: "2%" }}
                    source={require("../../assets/cancle2.png")}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Play-Regular",
                      color: "#44A5FF",
                      marginLeft: "3%",
                    }}
                  >
                    취소
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  scrollViewContainer: {
    alignItems: "center",
    paddingTop: 0,
  },

  lineStyle: {
    height: 2, // 선의 두께
    backgroundColor: "#E4E4E4", // 선의 색상
    width: "90%", // 선의 길이
    marginTop: "6%",
    marginBottom: "8%",
  },
});

export default GiveReq;
