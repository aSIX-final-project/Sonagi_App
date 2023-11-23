import React, { useState } from "react";
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
import Bottomsheetfood from "./Bottomsheetfoodp";

const Mapaddp = ({ navigation }) => {
  // 바텀시트
  const [modalVisible, setModalVisible] = useState(false);
  const pressButton = () => {
    setModalVisible(true);
  };

  const heartCount = 3; // 원하는 숫자를 넣으세요.
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
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
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
            onPress={() => navigation.navigate("KakaoMap")}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/backkey.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "relative",
            marginRight: "6%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../assets/heart.png")}
            resizeMode="contain"
          />
          {/* 하트 부분 */}
          <Text
            style={{
              position: "absolute",
              color: "#44A5FF",
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            {heartCount}
          </Text>
        </View>
      </View>

      {/* 기부자가 올린 이미지 */}
      <Image
        style={{ width: "100%", height: "50%" }}
        source={require("../../assets/food3.png")}
        resizeMode="contain"
      />

      <View
        style={{
          flexDirection: "row",
          width: "90%",
          height: "10%",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          paddingRight: "50%",
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
            source={require("../../assets/yanoljalogo.png")}
            resizeMode="contain"
          />
        </View>

        <View style={{ marginTop: "1%" }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
            }}
          >
            상호명: 야놀자
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Play-Regular",
            }}
          >
            서울시 강남구
          </Text>
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
          height: "15%",
          alignItems: "center",
          backgroundColor: "#ffffff",
          paddingRight: "40%",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
              marginBottom: "2%",
            }}
          >
            잡채 50인분
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "Play-Regular",
              width: "55%",
            }}
          >
            13시에 조리가 완료된 잡채 50인분 가져가실 분 연락 부탁드립니다.
          </Text>
          <View style={{ flexDirection: "row", marginTop: "3%" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                fontFamily: "Play-Bold",
              }}
            >
              조리 완료 시간
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                fontFamily: "Play-Regular",
              }}
            >
              : 2023.11.06 13:00
            </Text>
          </View>
        </View>
      </View>

      {/* 하단 버튼 */}
      <View
        style={{
          width: "90%",
          height: "2%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          marginTop: "0%",
          paddingRight: "0%",
          paddingRight: "0%",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              marginBottom: "1%",
              marginRight: "1%",
            }}
            source={require("../../assets/food.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
              color: "#383838",
              marginRight: "10%",
            }}
            onPress={pressButton}
          >
            음식 설정하기
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "90%",
          height: "10%",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
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
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
              color: "#44A5FF",
            }}
          >
            도착
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
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
              color: "#FFFFFF",
            }}
          >
            받기
          </Text>
        </TouchableOpacity>
      </View>

      {/* 바텀시트 view */}
      <View style={styles.rootContainer}>
        <Bottomsheetfood
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
        />
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
export default Mapaddp;
