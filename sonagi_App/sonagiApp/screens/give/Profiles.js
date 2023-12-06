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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const Profiles = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState(route.params.userInfo);
  const [imageKey, setImageKey] = useState(Date.now());

  console.log(userInfo);

  // 이미지 업데이트
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUserInfo(route.params.userInfo);
      if (userInfo && userInfo.profileImage) {
        setProfileImage(userInfo.profileImage);
      }
    });

    return unsubscribe;
  }, [route.params, userInfo.profileImage]);

  // 갤러리 이미지 선택
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
        formData.append("nameFile", userInfo.id);
        // console.log(formData);
        formData.append("folderName", "restaurant");

        const response = await axios.post(
          "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/files",
          // "http://172.16.104.97:8888/boot/restaurant/files",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          setProfileImage(result.assets[0].uri);
          setImageKey(Date.now()); // 이미지 키 업데이트

          const formData = {
            id: userInfo.id,
            profileImage: response.data,
          };

          // 폼 데이터를 JSON 문자열로 변환하여 확인
          const jsonData = JSON.stringify(formData);
          console.log(jsonData);

          console.log(response.data);

          // 백엔드 서버로 POST 요청 보내기
          const data = await axios.post(
            "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/updateImageUrl",
            // "http://172.16.104.219:8888/boot/member/updateImageUrl",
            formData
          );

          const newProfileImage = response.data; // 새로운 이미지 URL
          userInfo.profileImage = newProfileImage; // userInfo 객체의 프로필 이미지 업데이트

          if (data.data === 1) {
            console.log(userInfo);

            // 이미지 url 업데이트 성공
            console.log("이미지 Url 업데이트 성공");
          }
          // console.log(response);
          console.log("이미지 업로드 성공");
        } else {
          console.error("이미지 업로드 실패");
        }
      } catch (error) {
        console.error("이미지 업로드 오류:", error);
      }
    }
  };

  // 고객센터 연결하기 기능
  const CenterPhone = () => { };

  // 로그아웃 버튼을 눌렀을때 값을 서버에 보냄
  const [isLogoutSuccessModalVisible, setLogoutSuccessModalVisible] =
    useState(false); // 모달 알림창의 상태

  const handleLogoutButtonClick = () => {
    setLogoutSuccessModalVisible(true); // 가입 버튼 클릭 시 모달 표시

    // 2초 후에 모달 숨김
    setTimeout(() => {
      setLogoutSuccessModalVisible(false);
      navigation.navigate("Login"); // 메인화면으로 이동
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* 로그인 완료 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLogoutSuccessModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{ width: 130, height: 130, bottom: "0.5%", right: "0%" }}
              source={require("../../assets/logoutsuccess.png")}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => setLogoutSuccessModalVisible(false)} // 모달 내부의 버튼 클릭 시 모달 숨김
            ></TouchableOpacity>
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
            onPress={() =>
              navigation.navigate("Home", { userInfo: userInfo })
            }
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
            프로필
          </Text>
          <TouchableOpacity
            style={{
              marginTop: "2%",
              marginLeft: "36%",
              width: "25%",
              height: "70%",
              backgroundColor: "#6DB9FF",
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleLogoutButtonClick}
          >
            <Text
              style={{
                fontFamily: "Play-Bold",
                fontSize: 20,
                color: "white",
              }}
            >
              로그아웃
            </Text>
          </TouchableOpacity>
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
          <TouchableOpacity onPress={openImagePicker}>
            <View style={{ position: "relative" }}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  style={{ width: 90, height: 90 }}
                  source={require("../../assets/profileedit.png")}
                  resizeMode="contain"
                />
              )}
              {/* Plus 이미지 */}
              <View
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  zIndex: 1,
                }}
              >
                <TouchableOpacity onPress={openImagePicker}>
                  <Image
                    source={require("../../assets/plus.png")}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Play-Bold",
              fontSize: 25,
              color: "white",
              marginTop: "2%",
            }}
          >
            {userInfo.name} 님
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

      <TouchableOpacity style={{ marginTop: '10%', width: '88%', height: '10%', backgroundColor: '#E1F1FF', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }} onPress={CenterPhone}>
        <View style={{ flexDirection: 'row', }}>
          <Image
            style={{ width: 65, height: 65, marginRight: '7%', marginLeft: '0%' }}
            source={require('../../assets/call.png')}
            resizeMode="contain"
          />

          <Text style={{ fontFamily: 'Play-Bold', fontSize: 23, color: '#8B8E90', marginRight: '25%', marginTop: '6%' }}>고객센터 연결</Text>
          <Image
            style={{ width: 35, height: 35, marginTop: '4%' }}
            source={require('../../assets/next.png')}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>


      {/* 비밀번호 변경 */}
      {/* 비밀번호 변경 */}
      <TouchableOpacity style={{ marginTop: '5%', width: '88%', height: '10%', backgroundColor: '#E1F1FF', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('ChangePw')}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 65, height: 65, marginRight: '7%', marginLeft: '0%' }}
            source={require('../../assets/pwchange.png')}
            resizeMode="contain"
          />

          <Text style={{ fontFamily: 'Play-Bold', fontSize: 23, color: '#8B8E90', marginRight: '25%', marginTop: '6%' }}>비밀번호 변경</Text>


          <Image
            style={{ width: 35, height: 35, marginTop: '4%' }}
            source={require('../../assets/next.png')}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {/* 시설 소개 */}
      <TouchableOpacity style={{ marginTop: '5%', width: '88%', height: '10%', backgroundColor: '#E1F1FF', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('ChangeInfo')}>
        <View style={{ flexDirection: 'row', }}>
          <Image
            style={{ width: 65, height: 65, marginRight: '7%', marginLeft: '0%' }}
            source={require('../../assets/introduce2.png')}
            resizeMode="contain"
          />

          <Text style={{ fontFamily: 'Play-Bold', fontSize: 23, color: '#8B8E90', marginRight: '23%', marginTop: '6%' }}>시설 정보 변경</Text>


          <Image
            style={{ width: 35, height: 35, marginTop: '4%' }}
            source={require('../../assets/next.png')}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFC",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#000",
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
export default Profiles;
