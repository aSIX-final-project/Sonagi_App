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
import * as ImagePicker from "expo-image-picker";

const GiveReq = ({ navigation }) => {
  {
    /* 카메라, 갤러리 모달 관리 */
  }
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("카메라 접근 권한이 허용되지 않았습니다.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      // 이곳에서 카메라의 url을 컨트롤 하면됨
    }
  };

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("갤러리 접근 권한이 허용되지 않았습니다.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      // 이곳에서 사진의 url을 컨트롤 하면됨
    }
  };

  // 카메라 모달 상태
  const [isCameraModalVisible, setCameraModalVisible] = useState(false);

  // 카메라 버튼 클릭 핸들러
  const handleCameraButtonClick = () => {
    console.log("sucess");
    setCameraModalVisible(true);
  };

  const heartCount = 3; // 원하는 숫자를 넣으세요.

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isCameraModalVisible}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            {/* 카메라 모달 관련 코드 */}
            <TouchableOpacity
              style={{ width: "10%", height: "10%", left: "40%" }}
              onPress={() => setCameraModalVisible(false)}
            >
              <View style={{ marginBottom: "10%" }}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../assets/cancle.png")}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={openCamera}>
              <View style={{ marginBottom: "10%" }}>
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../../assets/camara.png")}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            {/* 선 긋기 */}
            <View style={styles.lineStyle} />

            <TouchableOpacity onPress={openImagePicker}>
              <View style={{ marginBottom: "10%", marginTop: "8%" }}>
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../../assets/galally.png")}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

      {/* 기부 요청목록 */}
      <View
        style={{
          flexDirection: "row",
          height: "8%",
          width: "50%",
          marginBottom: "0%",
          marginTop: "0%",
          marginRight: "40%",
          backgroundColor: "yellow",
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
        >
          기부 요청 목록
        </Text>
      </View>

      {/* 선 긋기 */}
      <View style={styles.lineStyle} />
      <View
        style={{
          flex: 1,
          width: "90%",
          height: "70%",
          backgroundColor: "lightgreen",
        }}
      >
        {/* 목록 */}
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#E1F1FF",
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                marginBottom: "1%",
                marginRight: "1%",
              }}
              source={require("../../assets/profilep.png")}
              resizeMode="contain"
            />
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#E1F1FF",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: "80%",
                  height: "30%",
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
                  상호명
                </Text>
                <Text
                  style={{
                    fontSize: 23.5,
                    fontFamily: "Play-Regular",
                    color: "#383838",
                  }}
                >
                  : 명륜 보육원
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: "80%",
                  height: "30%",
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
                  후원
                </Text>
                <Text
                  style={{
                    fontSize: 23.5,
                    fontFamily: "Play-Regular",
                    color: "#383838",
                  }}
                >
                  : 잡채 50인분
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "yellow",
              }}
            >
              <Image
                style={{ width: 80, height: 80 }}
                source={require("../../assets/phone.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{ backgroundColor: "#44A5FF" }}
        ></TouchableOpacity>
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

  scrollViewContainer: {
    alignItems: "center",
    paddingTop: 0,
  },

  lineStyle: {
    height: 2, // 선의 두께
    backgroundColor: "#E4E4E4", // 선의 색상
    width: "90%", // 선의 길이
  },
});

export default GiveReq;
