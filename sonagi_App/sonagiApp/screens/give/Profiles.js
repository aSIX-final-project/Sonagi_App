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
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const Profiles = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState(null);
  const { userInfo } = route.params;
  console.log(userInfo);

  // 갤러리 이미지 선택
  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("갤러리 접근 권한이 허용되지 않았습니다.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      console.log(result.uri);
      // updateProfileImage(result.uri); // 선택된 이미지 URL을 전달하여 업데이트
    }
  };

  // 프로필 이미지 업데이트 요청
  // const updateProfileImage = async (selectedImageUrl) => {
  //   try {
  //     // 서버에 프로필 이미지 업데이트 요청 (fetch나 axios를 사용하여 서버에 요청)
  //     // 예시: fetch('/updateProfileImage', { method: 'POST', body: JSON.stringify({ userId: userInfo.id, profileImage: selectedImageUrl }) });
  //     const formData = new FormData();
  //     formData.append("file", {
  //       uri: selectedImageUrl,
  //       nameFile: userInfo.id,
  //       type: "image/jpg",
  //     });

  //     // 폼 데이터를 JSON 문자열로 변환하여 확인
  //     const jsonData = JSON.stringify(formData);
  //     console.log(jsonData);

  //     // 백엔드 서버로 POST 요청 보내기
  //     const response = await axios.post(
  //       // "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/member/files",
  //       "http://172.16.104.79:8888/boot/member/files",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     // 서버 요청 후에 프로필 이미지 업데이트가 성공하면, 프로필 이미지 상태 업데이트
  //     if (response.data && response.data.imageUrl) {
  //       setProfileImage(response.data.imageUrl); // 받아온 이미지 URL로 프로필 이미지 업데이트
  //     }
  //   } catch (error) {
  //     console.error("프로필 이미지 업데이트 실패:", error);
  //   }
  // };

  // // 이미지가 변경될 때마다 업데이트된 이미지 보여주기
  // useEffect(() => {
  //   // profileImage 값이 변경될 때마다 화면을 갱신할 수 있도록 처리
  //   // 예를 들어, 화면을 새로 고치거나, 상태를 업데이트하는 등의 로직 추가
  // }, [profileImage]);

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
              style={{ fontFamily: "Play-Bold", fontSize: 20, color: "white" }}
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
          <TouchableOpacity style={{}} onPress={openImagePicker}>
            <Image
              style={{ width: 90, height: 90, borderRadius:100 }}
              source={userInfo.profileImage ? { uri: userInfo.profileImage } : require("../../assets/profileedit.png")}
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

      {/* 중앙 부분 */ }

  {/* 고객센터 */ }
  <View
    style={{
      flexDirection: "row",
      marginTop: "10%",
      width: "88%",
      height: "10%",
      backgroundColor: "#E1F1FF",
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      style={{ width: 65, height: 65, marginRight: "7%", marginLeft: "0%" }}
      source={require("../../assets/call.png")}
      resizeMode="contain"
    />

    <Text
      style={{
        fontFamily: "Play-Bold",
        fontSize: 23,
        color: "#8B8E90",
        marginRight: "25%",
      }}
    >
      고객센터 연결
    </Text>

    <TouchableOpacity style={{}} onPress={CenterPhone}>
      <Image
        style={{ width: 35, height: 35 }}
        source={require("../../assets/next.png")}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>

  {/* 비밀번호 변경 */ }
  <View
    style={{
      flexDirection: "row",
      marginTop: "5%",
      width: "88%",
      height: "10%",
      backgroundColor: "#E1F1FF",
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      style={{ width: 65, height: 65, marginRight: "7%", marginLeft: "0%" }}
      source={require("../../assets/pwchange.png")}
      resizeMode="contain"
    />

    <Text
      style={{
        fontFamily: "Play-Bold",
        fontSize: 23,
        color: "#8B8E90",
        marginRight: "25%",
      }}
    >
      비밀번호 변경
    </Text>

    <TouchableOpacity
      style={{}}
      onPress={() =>
        navigation.navigate("ChangePw", { userInfo: userInfo })
      }
    >
      <Image
        style={{ width: 35, height: 35 }}
        source={require("../../assets/next.png")}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>

  {/* 시설 소개 */ }
  <View
    style={{
      flexDirection: "row",
      marginTop: "5%",
      width: "88%",
      height: "10%",
      backgroundColor: "#E1F1FF",
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      style={{ width: 65, height: 65, marginRight: "7%", marginLeft: "0%" }}
      source={require("../../assets/introduce2.png")}
      resizeMode="contain"
    />

    <Text
      style={{
        fontFamily: "Play-Bold",
        fontSize: 23,
        color: "#8B8E90",
        marginRight: "23%",
      }}
    >
      시설 정보 변경
    </Text>

    <TouchableOpacity
      style={{}}
      onPress={() =>
        navigation.navigate("ChangeInfo", { userInfo: userInfo })
      }
    >
      <Image
        style={{ width: 35, height: 35 }}
        source={require("../../assets/next.png")}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>
  {/* 마지막 라인(광고) */ }
  <Image
    style={{ width: "100%", height: "15%", marginTop: "22%" }}
    source={require("../../assets/ad.png")}
    resizeMode="contain"
  />
    </View >
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
export default Profiles;
