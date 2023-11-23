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
import Bottomsheetfood from "./Bottomsheetfood";

const Mapadd = ({ navigation, route }) => {
  const { userInfo } = route.params;
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

      <View
        style={{
          flexDirection: "row",
          width: "90%",
          height: "10%",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          marginTop: "30%",
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
            source={require("../../assets/profilep.png")}
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
            상호명:명륜 보육원
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
          marginTop: "1%",
        }}
      />

      {/* 밑줄 밑 시설소개 */}
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          height: "20%",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          marginTop: "0%",
          paddingRight: "40%",
        }}
      >
        <View style={{ marginTop: "1%" }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
              marginBottom: "5%",
            }}
          >
            시설소개
          </Text>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              fontFamily: "Play-Regular",
              width: "55%",
            }}
          >
            우리 OO 시설은 50명의 아동을 수용중이며 서울시에서 가장 큰 규모로
            운영중입니다.
          </Text>
        </View>
      </View>

      {/* 하단 버튼 */}
      <View
        style={{
          width: "90%",
          height: "30%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          marginTop: "0%",
          paddingRight: "0%",
          paddingRight: "0%",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "60%",
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
            보내기
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
export default Mapadd;
