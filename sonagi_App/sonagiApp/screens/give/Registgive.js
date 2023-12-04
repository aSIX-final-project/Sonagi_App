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
import * as ImagePicker from "expo-image-picker";
import { useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import FastImage from "react-native-fast-image";

const RegistGive = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState(null);
  const { userInfo } = route.params;
  console.log(userInfo);

  const {
    watch, // 입력 값 감시
    setValue, // 입력 값 설정
    formState: { errors }, // 폼 상태와 에러
  } = useForm();

  // 수정 필요 함수 구현 다시 해야댐 Food DB에 값 추가할꺼임
  const handleFoodRegist = async () => {
    try {
      // POST 요청에 필요한 데이터
      const formData = {
        id: userInfo.id,
        foodName: watch("foodName"),
        foodAmount: watch("foodAmount"),
        foodPrice: watch("foodPrice"),
        foodTel: userInfo.adTel,
        foodAddress: userInfo.address,
        foodGiver: userInfo.adName,
        foodImage: profileImage,
        foodUploadTime: "",
        context: watch("context"),
        deadline: selectedPeriod + " " + selectedHour + ":" + selectedMinute,
      };

      // 폼 데이터를 JSON 문자열로 변환하여 확인
      const jsonData = JSON.stringify(formData);
      console.log(jsonData);

      // 실제로는 axios를 사용하여 서버에 요청을 보냅니다.
      const response = await axios.post(
        // "http://172.16.104.219:8888/boot/food/regist",
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/food/regist",
        formData
      );
      console.log(response.data);
      // 백엔드로부터 온 응답 처리
      if (response.status === 200) {
        // 음식 등록 성공
        console.log("음식 등록 성공"); // -> 음식 등록 성공 모달 필요

        // 2초 후에 홈 화면으로 이동
        setTimeout(() => {
          // setLoginSuccessModalVisible(false); --> 모달 사라지게 하는 코드
          navigation.navigate("KakaoMap", { userInfo: userInfo });
        }, 2000);
      } else {
        // 음식 등록 실패
        console.log("음식 등록 실패");
        // 에러 처리 로직
      }
    } catch (error) {
      console.error("에러:", error);
      // 에러 처리 로직
    }
  };

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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // console.log(result);
    if (!result.canceled) {
      try {
        const formData = new FormData();
        formData.append("file", {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: `profile_${userInfo.id}.jpg`,
        });

        // 'nameFile' 파라미터 추가
        formData.append("nameFile", watch("foodName"));
        // console.log(formData);

        // 'folderName' 파라미터 추가
        formData.append("folderName", "food");

        const response = await axios.post(
          "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/food/files",
          // "http://172.16.104.97:8888/boot/food/files",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProfileImage(null);
        setProfileImage(response.data);
        console.log("이미지 업로드 성공");
        setCameraModalVisible(false);
      } catch (error) {
        console.error("이미지 업로드 오류:", error);
      }
    }
  };

  // 카메라 모달 상태
  const [isCameraModalVisible, setCameraModalVisible] = useState(false);

  // 카메라 버튼 클릭 핸들러
  const handleCameraButtonClick = () => {
    console.log("sucess");
    setCameraModalVisible(true);
  };

  // 날짜 피커
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = Math.floor(now.getMinutes() / 10) * 10; // 10분 단위로 반올림

  const [selectedPeriod, setSelectedPeriod] = useState(
    currentHour >= 12 ? "오후" : "오전"
  );
  const [selectedHour, setSelectedHour] = useState(
    currentHour % 12 === 0
      ? "12"
      : currentHour % 12 < 10
        ? `0${currentHour % 12}`
        : `${currentHour % 12}`
  ); // 12시간제로 변환, 문자열로 변경
  const [selectedMinute, setSelectedMinute] = useState(
    currentMinute === 0 ? "00" : `${currentMinute}`
  );

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
            onPress={() =>
              navigation.navigate("KakaoMap", { userInfo: userInfo })
            }
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/backkey.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ flex: 1, marginTop: "20%", width: "90%" }}
          showsVerticalScrollIndicator={true} // 스크롤바 표시
          contentContainerStyle={{ paddingBottom: 550 }}
          keyboardShouldPersistTaps="always" // 키보드가 열려있어도 스크롤이됨
          scrollEnabled={true}
        >
          {/* 음식 이름 설정하기 */}
          <View
            style={{
              flexDirection: "row",
              height: "4%",
              width: "90%",
              marginBottom: "5%",
              marginTop: "0%",
            }}
          >
            <Image
              style={{
                width: 27,
                height: 27,
                marginBottom: "1%",
                marginRight: "1%",
              }}
              source={require("../../assets/food2.png")}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                fontFamily: "Play-Bold",
                color: "#383838",
                marginTop: "0.5%",
              }}
            >
              음식 이름 설정하기
            </Text>
          </View>
          {/* 선 긋기 */}
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: "row",
              height: "5%",
              width: "100%",
              marginTop: "3%",
              marginBottom: "7%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 텍스트 입력 부분 */}
            <TextInput
              style={{
                backgroundColor: "#E1F1FF",
                width: "98%",
                height: "100%",
                borderRadius: 15,
              }}
              textAlign="center" // 가운데 정렬
              maxLength={11} // 3자리수 까지 입력가능
              fontSize={30}
              fontWeight="bold"
              fontFamily="Play-Bold"
              onChangeText={(text) => setValue("foodName", text)}
            />
          </View>
          <View style={styles.lineStyle} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
              color: "#383838",
              marginRight: "52%",
              marginTop: "2%",
            }}
          >
            ※ 음식 이름을 입력하세요.
          </Text>

          {/* 음식 인분 설정하기 */}
          <View
            style={{
              flexDirection: "row",
              height: "4%",
              width: "90%",
              marginBottom: "5%",
              marginTop: "19%",
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
                marginTop: "0.5%",
              }}
            >
              음식 양 설정하기
            </Text>
          </View>
          {/* 선 긋기 */}
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: "row",
              height: "7%",
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              marginBottom: "3%",
            }}
          >
            {/* 카메라 부분 */}
            <TouchableOpacity
              style={{
                width: "23%",
                height: "80%",
                borderRadius: 22,
                borderWidth: 1,
                borderColor: "#C2C2C2",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10%",
              }}
              onPress={handleCameraButtonClick}
            >
              {profileImage ? (
                <Image
                  source={{
                    uri: profileImage,
                    priority: FastImage.priority.high,
                  }}
                  style={{ width: 100, height: 100 }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              ) : (
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/camara.png")}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>

            {/* 텍스트 입력 부분 */}
            <TextInput
              style={styles.inputtext}
              textAlign="center" // 가운데 정렬
              keyboardType="numeric" // 숫자만 입력
              maxLength={3} // 3자리수 까지 입력가능
              onChangeText={(text) => setValue("foodAmount", text)}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                fontFamily: "Play-Regular",
                color: "#6F6A6A",
                marginTop: "8.5%",
                marginLeft: "3%",
              }}
            >
              인분
            </Text>
          </View>
          <View style={styles.lineStyle} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
              color: "#383838",
              marginRight: "39%",
              marginTop: "2%",
            }}
          >
            ※ 5인분 단위로 요청할 수 있습니다.
          </Text>

          {/* 기부 가능 시간 설정하기 */}
          <View
            style={{
              flexDirection: "row",
              height: "6%",
              width: "90%",
              marginBottom: "0%",
              marginTop: "19%",
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
                marginTop: "0.5%",
              }}
            >
              기부 가능 시간 설정하기
            </Text>
          </View>
          {/* 선 긋기 */}
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: "row",
              height: "25%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 알람 설정 부분 */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "52%",
              }}
            >
              <Picker
                selectedValue={selectedPeriod}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue) => setSelectedPeriod(itemValue)}
              >
                <Picker.Item label="오전" value="오전" />
                <Picker.Item label="오후" value="오후" />
              </Picker>

              <Picker
                selectedValue={selectedHour}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue) => setSelectedHour(itemValue)}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((item) => (
                  <Picker.Item
                    key={item}
                    label={item < 10 ? `0${item}` : `${item}`}
                    value={item < 10 ? `0${item}` : `${item}`}
                  />
                ))}
              </Picker>

              <Picker
                selectedValue={selectedMinute}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue) => setSelectedMinute(itemValue)}
              >
                {Array.from({ length: 6 }, (_, i) => i * 10).map((item) => (
                  <Picker.Item
                    key={item}
                    label={item === 0 ? "00" : `${item}`}
                    value={item === 0 ? "00" : `${item}`}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.lineStyle3} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
              color: "#383838",
              marginRight: "30%",
              marginTop: "2%",
            }}
          >
            ※ 현 시간 기준 마감 시간을 입력하세요.
          </Text>

          {/* 음식 가격 설정하기 */}
          <View
            style={{
              flexDirection: "row",
              height: "6%",
              width: "90%",
              marginBottom: "0%",
              marginTop: "19%",
            }}
          >
            <Image
              style={{
                width: 27,
                height: 27,
                marginBottom: "1%",
                marginRight: "1%",
              }}
              source={require("../../assets/money.png")}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                fontFamily: "Play-Bold",
                color: "#383838",
                marginTop: "0.5%",
              }}
            >
              음식 가격 설정하기
            </Text>
          </View>
          {/* 선 긋기 */}
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: "row",
              height: "5%",
              width: "100%",
              marginTop: "3%",
              marginBottom: "7%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 텍스트 입력 부분 */}
            <TextInput
              style={{
                backgroundColor: "#E1F1FF",
                width: "98%",
                height: "100%",
                borderRadius: 15,
                marginRight: "1.5%",
              }}
              textAlign="center" // 가운데 정렬
              maxLength={11} // 3자리수 까지 입력가능
              fontSize={30}
              fontWeight="bold"
              fontFamily="Play-Bold"
              onChangeText={(text) => setValue("foodPrice", text)}
            />
          </View>
          <View style={styles.lineStyle} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
              color: "#383838",
              marginRight: "0%",
              marginTop: "2%",
            }}
          >
            ※ 음식 1인분 가격을 입력하세요.
          </Text>
          {/* 음식 설명 설정하기 */}
          <View
            style={{
              flexDirection: "row",
              height: "4%",
              width: "90%",
              marginBottom: "5%",
              marginTop: "20%",
            }}
          >
            <Image
              style={{
                width: 27,
                height: 27,
                marginBottom: "1%",
                marginRight: "1%",
              }}
              source={require("../../assets/food2.png")}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                fontFamily: "Play-Bold",
                color: "#383838",
                marginTop: "0.5%",
              }}
            >
              음식 설명 설정하기
            </Text>
          </View>
          {/* 선 긋기 */}
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: "row",
              height: "8%",
              width: "100%",
              marginTop: "3%",
              marginBottom: "7%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 텍스트 입력 부분 */}
            <TextInput
              style={{
                backgroundColor: "#E1F1FF",
                width: "98%",
                height: "100%",
                borderRadius: 15,
                padding: "5%",
              }}
              textAlign="center" // 가운데 정렬
              maxLength={100} // 3자리수 까지 입력가능
              fontSize={20}
              fontWeight="bold"
              fontFamily="Play-Bold"
              multiline
              onChangeText={(text) => setValue("context", text)}
            />
          </View>
          <View style={styles.lineStyle} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
              color: "#383838",
              marginRight: "52%",
              marginTop: "2%",
            }}
          >
            ※ 음식 이름을 입력하세요.
          </Text>
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* 확인 버튼 */}
      <TouchableOpacity
        style={{
          width: 360,
          height: 55,
          borderRadius: 22,
          marginTop: "10%",
          marginBottom: "15%",
          backgroundColor: "#44A5FF",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handleFoodRegist}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            fontFamily: "Play-Bold",
            color: "#FFFFFF",
          }}
        >
          확인
        </Text>
      </TouchableOpacity>
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
    height: "80%", // 올라오는 크기
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
    height: 2, // 선의 두께
    backgroundColor: "#E4E4E4", // 선의 색상
    width: "98%", // 선의 길이
    marginBottom: "3%",
  },

  lineStyle2: {
    height: 2, // 선의 두께
    backgroundColor: "#E4E4E4", // 선의 색상
    width: "90%", // 선의 길이
    marginTop: "3%",
  },

  lineStyle3: {
    height: 2, // 선의 두께
    backgroundColor: "#E4E4E4", // 선의 색상
    width: "98%", // 선의 길이
    marginBottom: "3%",
    marginTop: "-2%",
  },

  inputtext: {
    width: "23%",
    height: "77%",
    borderColor: "#828282",
    fontSize: 45,
    color: "#6F6A6A",
    backgroundColor: "#E1F1FF",
    borderRadius: 22,
    color: "#393939",
    textAlign: "center",
  },

  inputtext2: {
    width: "100%",
    height: "77%",
    borderColor: "#828282",
    fontSize: 45,
    color: "#6F6A6A",
    backgroundColor: "#E1F1FF",
    borderRadius: 22,
    color: "#393939",
    textAlign: "center",
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
    width: "50%",
    height: "25%",
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
});

export default RegistGive;
