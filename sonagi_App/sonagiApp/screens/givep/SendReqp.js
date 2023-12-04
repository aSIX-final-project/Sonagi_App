import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  Modal,
  ScrollView,
} from "react-native";
import BottomsheetCancel from "./BottomsheetCancel";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const SendReqp = ({ navigation, route }) => {
  const { userInfo } = route.params;
  console.log(userInfo);
  const [reqList, setReqList] = useState([]);
  //모달
  const [modalVisible, setModalVisible] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [foodName, setFoodName] = useState(null);
  const pressButton = (receiverId, senderId, foodName) => {
    setModalVisible(true);
    setReceiverId(receiverId);
    setSenderId(senderId);
    setFoodName(foodName);
  };

  const [fetchFoodReq, setFetchFoodReq] = useState(() => async () => {
    try {
      const response = await axios.post(
        "http://172.16.100.11:8888/boot/foodReq/findBySenderId",
        { senderId: userInfo.id }
      );

      // response 처리 로직
      console.log(response.data);
      const sortedList = response.data.sort(
        (a, b) => new Date(b.sendTime) - new Date(a.sendTime)
      );
      setReqList(response.data); // 모든 요청 리스트 설정
    } catch (error) {
      // 에러 처리 로직
      console.error(error);
    }
  });

  useFocusEffect(
    React.useCallback(() => {
      fetchFoodReq();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#44A5FF",
          width: "100%",
          height: "40%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        {/* 상단부분 */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#44A5FF",
            width: "100%",
            height: "17%",
            marginTop: "10%",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: "6%", marginRight: "2%" }}
            onPress={() => navigation.navigate("Homep", { userInfo: userInfo })}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/backkey.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text
            style={{ fontFamily: "Play-Bold", fontSize: 25, color: "white" }}
          >
            보낸 요청
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          {userInfo.profileImage ? (
            <Image
              source={{ uri: userInfo.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              style={{ width: 90, height: 90 }}
              source={require("../../assets/profileedit.png")}
              resizeMode="contain"
            />
          )}
          <Text
            style={{
              fontFamily: "Play-Bold",
              fontSize: 25,
              color: "white",
              marginTop: "2%",
            }}
          >
            {userInfo.managerName} 님
          </Text>
          <Text
            style={{
              fontFamily: "Play-Regular",
              fontSize: 20,
              color: "white",
              marginTop: "1%",
            }}
          >
            {userInfo.adName}
          </Text>
        </View>
      </View>

      {/* 중앙 부분 */}
      <Text
        style={{
          fontFamily: "Play-Regular",
          fontSize: 18,
          color: "#8B8E90",
          marginTop: "5%",
          marginRight: "30%",
        }}
      >
        총 {reqList.length}건의 보낸 요청이 있습니다.
      </Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#7D7D7D",
          width: "89.5%",
          marginTop: "1.5%",
        }}
      />

      <ScrollView
        style={{ backgroundColor: "white", width: "89.5%", height: "80%" }}
      >
        {reqList.map((item, index) => (
          <View key={index}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Play-Bold",
                  fontSize: 20,
                  color: "#656565",
                  marginTop: "2%",
                }}
              >
                [{item.receiver}] {item.foodName} {item.serving}인분
              </Text>

              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: 10 }}
                onPress={() =>
                  pressButton(item.receiverId, item.senderId, item.foodName)
                }
              >
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require("../../assets/motifydelete.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: "Play-Regular",
                fontSize: 15,
                color: "#8B8E90",
                marginTop: "1%",
              }}
            >
              {item.sendTime}
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#DBDBDB",
                width: "100%",
                marginTop: "5%",
              }}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.rootContainer}>
        <BottomsheetCancel
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
          receiverId={receiverId}
          senderId={senderId}
          foodName={foodName}
          fetchFoodReq={fetchFoodReq} // fetchFoodReq 함수 전달
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
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
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#000",
  },
});
export default SendReqp;
