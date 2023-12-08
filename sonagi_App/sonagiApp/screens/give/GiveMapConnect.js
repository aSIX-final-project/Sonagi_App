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
// 바텀시트
import axios from "axios";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const GiveMapConnect = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [foodData, setFoodData] = useState(null);
  const { id, userInfo, foodName } = route.params;
  const [foodReqList, setFoodReqList] = useState([]);


  console.log("123");
  console.log(id, userInfo, foodName);
  useEffect(() => {
    if (foodData) {
      const fetchFoodReq = async () => {
        const formData = { receiverId: foodData[0].id, foodName: foodName };
        try {
          const foodReqRes = await axios.post(
            "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/foodReq/findByIdFoodName",
            formData
          );
          console.log("FoodReqResponse1:", foodReqRes);
          if (foodReqRes.data && foodReqRes.data.length > 0) {
            setFoodReqList(foodReqRes.data);
          }
        } catch (error) {
          console.error("Error fetching food request data:", error.message);
        }
      };
      fetchFoodReq();
    }
  }, [foodData]);


  useEffect(() => {
    let isMounted = true;

    const fetchUserDataAndFoodData = async () => {
      if (id !== null) {
        const formData = { id: id };
        const formDataFood = { id: id, foodName: foodName }
        try {
          const userRes = await axios.post(
            "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/findById",
            formData
          );
          const foodRes = await axios.post(
            "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/food/findByFoodName",
            formDataFood
          );
          if (isMounted) {
            console.log("UserResponse:", userRes);
            console.log("FoodResponse:", foodRes);
            setUserData(userRes.data);
            setFoodData(foodRes.data);
          }
        } catch (error) {
          console.error("Error fetching user and food data:", error.message);
        }
      }
    };

    fetchUserDataAndFoodData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const kakaoMap = async (address) => {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address
      )}`,
      {
        headers: {
          Authorization: "KakaoAK db06c51425b99419a11f3881f8491642",
        },
      }
    );
    const coordinates =
      response.data.documents[0].road_address ||
      response.data.documents[0].address;
    const addressX = parseFloat(coordinates.x);
    const addressY = parseFloat(coordinates.y);
    // 카카오 네비게이션 API를 이용해 길찾기 실행
    const url = `kakaomap://route?ep=${addressY},${addressX}&by=CAR`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const callPhone = (phoneNum) => {
    // 카카오 네비게이션 API를 이용해 길찾기 실행
    const url = `tel:${phoneNum}`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  // 바텀시트
  const [modalVisible, setModalVisible] = useState(false);
  const pressButton = () => {
    setModalVisible(true);
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
          paddingTop: "6%",
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
            onPress={() =>
              navigation.navigate("KakaoMap", { userInfo: userInfo })
            }
          >
            <Image
              style={{ width: 50, height: 50, marginTop: '10%'}}
              source={require("../../assets/backkey.png")}
              resizeMode="contain"
              
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 기부자가 올린 이미지 */}
      <Image
        style={{ width: "100%", height: "30%" }}
        source={{ uri: foodData ? foodData[0].foodImage : null }}
        resizeMode="cover"
      />

      <View
        style={{
          flexDirection: "row",
          width: "90%",
          height: "10%",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          paddingRight: "50%",
          marginRight: "5%",
        }}
      >
        <View>
          <Image
            style={{
              width: 60,
              height: 60,
              bottom: "0%",
              marginLeft: "10%",
              borderRadius: 60,
            }}
            source={{ uri: userData ? userData[0].profileImage : null }}
            resizeMode="contain"
          />
        </View>

        <View style={{ marginTop: "1%" }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
              width: "100%",
            }}
          >
            상호명: {foodData ? foodData[0].foodGiver : "로딩중..."}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "Play-Regular",
                width: "100%",
              }}
            >
              {foodData ? foodData[0].foodAddress.substring(5) : "로딩중..."}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: "10%",
            flexDirection: "row",
            justifyContent: "space-around",
            marginLeft: "5%",
            width: '80%',
            marginBottom: '6%'
            
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              width: "41%",
              padding: 5,
              borderColor: "#65C8FF",
              borderWidth: 3,
            }}
            onPress={() => callPhone(foodData[0].foodTel)}
          >
            <Ionicons name="call" size={25} color="#8BD5FF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => kakaoMap(foodData[0].foodAddress)}>
            <View
              style={{
                backgroundColor: "#44A5FF",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingTop: 8,
                paddingBottom: 8
                
              }}
            >
              <Feather name="corner-up-right" size={20} color="white" />
              <Text style={{ color: "white", fontSize: 13, marginTop: '10%' }}>길찾기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* 밑줄 */}
      <View
        style={{
          borderBottomColor: "#7D7D7D",
          borderBottomWidth: 1,
          width: "90%",
        }}
      />

      {/* 밑줄 밑 시설소개 */}

      <View
        style={{
          flexDirection: "row",
          width: "90%",
          height: "25%",
          alignItems: "center",
          paddingRight: "40%",
        }}
      >
        <View style={{ marginTop: "5%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom:20,
              width: "110%",
            }}
          >
            <Text
              style={{
                fontSize: 35,
                fontWeight: "bold",
                fontFamily: "Play-Bold",
              }}
            >
              {foodData ? foodData[0].foodName : "로딩중..."}{" "}
              {foodData ? foodData[0].foodAmount : "로딩중..."}인분
            </Text>



            {foodReqList.length > 0 &&
              <View
                style={{
                  backgroundColor: "#D0D0D0",
                  borderRadius: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  height: "70%",
                  marginLeft: "8%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>예약중</Text>
              </View>
            }


          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: "Play-Regular",
                width: "100%",
              }}
            >
              {foodData ? foodData[0].context : "로딩중..."}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: "3%" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                fontFamily: "Play-Bold",
              }}
            >
              마감 시간
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                fontFamily: "Play-Regular",
              }}
            >
              : {foodData ? foodData[0].deadline : "로딩중..."}
            </Text>
          </View>
        </View>
      </View>
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
});
export default GiveMapConnect;
