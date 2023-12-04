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
  TextInput,
} from "react-native";
import axios from "axios";

import * as ImagePicker from "expo-image-picker";

const Donate = ({ navigation, route }) => {
  const { userInfo } = route.params;
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [donator, setDonator] = useState("");
  const [donatedDate, setDonatedDate] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContext, setReviewContext] = useState("");
  const [ReviewImage, setReviewImage] = useState("");

  const [isReviewModalVisible, setReviewModalVisible] = useState(false);

  // 모달 상태
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = {
          donatedProvider: userInfo.id,
        };
        let response = await axios.post(
          "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/donation/findByIdP",
          formData
        );

        const temp = response.data;

        // 각 donatedReceiver에 대한 adName을 가져와서 temp에 추가
        for (let i = 0; i < temp.length; i++) {
          const formData2 = {
            id: temp[i].donatedReceiver,
          };
          let response2 = await axios.post(
            "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/member/findById",
            formData2
          );
          temp[i].adName = response2.data[0].adName;
        }

        setData(temp);
      } catch (error) {
        console.error("Cannot fetch data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (item) => {
    console.log(
      `리시버 아이디: ${item.donatedReceiver}, 도네이트 아이디: ${item.donatedProvider}, 도네이트 데이트 : ${item.donatedDate}`
    );
    setSelectedItem(item);

    const formData1 = {
      id: item.donatedReceiver,
    };
    const response1 = await axios.post(
      "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/member/findById",
      formData1
    );

    const formData2 = {
      id: item.donatedProvider,
    };
    const response2 = await axios.post(
      "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/findById",
      formData2
    );

    const donatedReceiver = response1.data[0].adName;
    const donatedProvider = response2.data[0].adName;

    console.log(donatedReceiver);
    console.log(donatedProvider);

    let response3 = await axios.get(
      "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/review/findAll"
    );
    const matchedReviews = response3.data.filter(
      (review) =>
        review.receiver === donatedReceiver &&
        review.donator === donatedProvider &&
        review.reviewDate === item.donatedDate
    );

    console.log(matchedReviews);

    if (matchedReviews.length > 0) {
      setReceiver(matchedReviews[0].receiver);
      setDonator(matchedReviews[0].donator);
      setDonatedDate(matchedReviews[0].reviewDate);
      setReviewContext(matchedReviews[0].reviewContext);
      setReviewTitle(matchedReviews[0].reviewTitle);
      setReviewImage(matchedReviews[0].reviewImage);

      setModalVisible(true);
    }
  };

  // 카메라 버튼 클릭 핸들러
  const handleButtonClick = () => {
    console.log("sucess");
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* 기부내역 보기 모달 관련 코드 */}
      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <TouchableOpacity
              style={{ width: "10%", height: "10%", left: "48%" }}
              onPress={() => setModalVisible(false)}
            >
              <View style={{ marginBottom: "10%" }}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../assets/cancle.png")}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                marginBottom: "10%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Play-Bold",
                  fontSize: 25,
                  color: "#656565",
                }}
              >
                {reviewTitle}
              </Text>
              <Text
                style={{
                  fontFamily: "Play-Bold",
                  fontSize: 20,
                  color: "#656565",
                }}
              >
                {donatedDate}
              </Text>
            </View>

            {/* 선 긋기 */}
            <View style={styles.lineStyle} />

            <View style={{ width: "98%", height: "35%", marginTop: "5%" }}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri: ReviewImage }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: "Play-Regular",
                  fontSize: 20,
                  color: "#A9A9A9",
                  marginTop: "10%",
                }}
              >
                {reviewContext}
              </Text>

              <TouchableOpacity
                style={{
                  marginTop: "17%",
                  backgroundColor: "#44A5FF",
                  width: "100%",
                  height: "32%",
                  borderRadius: 16,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setModalVisible(false);
                  setTimeout(() => {
                    setReviewModalVisible(true);
                  }, 500); // 500ms 후에 실행
                }}
              >
                <Text
                  style={{
                    fontFamily: "Play-Regular",
                    fontSize: 21,
                    color: "#FFFFFF",
                  }}
                >
                  리뷰 보기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
            onPress={() => navigation.navigate("Home", { userInfo: userInfo })}
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
            기부 내역
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
          {userInfo.profileImage ? (
            <Image
              source={{ uri: userInfo.profileImage }}
              style={{
                width: 90,
                height: 90,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "#000",
              }}
            />
          ) : (
            <Image
              style={{
                width: 90,
                height: 90,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "#000",
              }}
              source={require("../../assets/profileremove.png")}
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
            {/* {" "} */}
            {userInfo.name}님
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
          marginRight: "40%",
        }}
      >
        총 {data.length}건의 기부한 내역이 있습니다.
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
        style={{ backgroundColor: "#FFFFFF", width: "89.5%", height: "80%" }}
      >
        {data.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleClick(item)}>
            <View>
              <Text
                style={{
                  fontFamily: "Play-Bold",
                  fontSize: 20,
                  color: "#656565",
                  marginTop: "2%",
                }}
              >
                [{item.adName}] {item.foodTitle}
              </Text>
              <Text
                style={{
                  fontFamily: "Play-Regular",
                  fontSize: 15,
                  color: "#8B8E90",
                  marginTop: "1%",
                }}
              >
                {item.donatedDate}
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
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
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
  modalView2: {
    width: "85%",
    height: "60%",
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

  lineStyle: {
    borderColor: "#DBDBDB",
    borderWidth: 1,
    width: "98%",
  },

  input: {
    width: "88%",
    height: 45,
    borderColor: "#B8DDFF",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    marginVertical: 5,
    borderRadius: 4,
    fontSize: 20,
  },
});
export default Donate;
