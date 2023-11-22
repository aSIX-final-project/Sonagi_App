import React, { useEffect, useState } from "react";
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
  FlatList,
} from "react-native";
import axios from "axios";

const Noticep = ({ navigation, route }) => {
  const { userInfo } = route.params;
  const [noticeList, setNoticeList] = useState({}); // 객체로 변환된 데이터를 담을 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://172.16.106.73:8888/boot/notice/findAll"
        );
        const receivedList = response.data;

        if (Array.isArray(receivedList)) {
          setNoticeList(receivedList); // 받은 배열의 첫 번째 객체를 상태로 설정
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 합니다.

  const renderNoticeItem = ({ item }) => (
    <View>
      <Text
        style={{
          fontFamily: "Play-Bold",
          fontSize: 20,
          color: "#656565",
          marginTop: "2%",
        }}
      >
        [{item.textNum}]{item.title}
      </Text>
      <Text
        style={{
          fontFamily: "Play-Regular",
          fontSize: 15,
          color: "#8B8E90",
          marginTop: "1%",
        }}
      >
        {item.noticeDate}
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
            공지사항
          </Text>
        </View>

        {/* 프로필 부분 */}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <TouchableOpacity style={{}} onPress={() => navigation.navigate("")}>
            <Image
              style={{ width: 90, height: 90 }}
              source={require("../../assets/profileremove.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
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
          marginRight: "45%",
        }}
      >
        총 {noticeList.length}건의 공지사항이 있습니다.
      </Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#7D7D7D",
          width: "89.5%",
          marginTop: "1.5%",
        }}
      />

      <FlatList
        data={noticeList}
        renderItem={renderNoticeItem}
        keyExtractor={(item, index) => index.toString()}
        style={{
          backgroundColor: "#FFFFFF",
          width: "89.5%",
          height: "80%",
        }}
      />

      {/* 마지막 라인(광고) */}
      <Image
        style={{ width: "100%", height: "7%", marginTop: "9%" }}
        source={require("../../assets/ad.png")}
        resizeMode="contain"
      />
    </View>
  );
};
const styles = StyleSheet.create({
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
});
export default Noticep;
