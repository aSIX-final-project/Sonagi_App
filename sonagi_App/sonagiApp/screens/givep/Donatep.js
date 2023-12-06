import React, { useState, useEffect, useCallback } from "react";
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
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import BottomsheetModDel from "./BottomsheetModDel";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const Donatep = ({ navigation, route }) => {
  const [selectedValue, setSelectedValue] = useState({
    adName: "",
    donatedProvider: "",
    donatedDate: "",
  });
  const [donations, setDonations] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [review, setReview] = useState("");
  // 바텀시트 (삭제, 수정)
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [donator, setDonator] = useState("");
  const [donatedDate, setDonatedDate] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContext, setReviewContext] = useState("");
  const [ReviewImage, setReviewImage] = useState("");

  const [donateInfo, setdonateInfo] = useState("");
  const [foodAdName, setfoodAdName] = useState("");
  const [foodImage, setfoodImage] = useState("");

  const { userInfo } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userInfo.id);

        const formData = {
          donatedReceiver: userInfo.id,
        };
        let response = await axios.post(
          "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/donation/findByIdR",
          formData
        );

        setdonateInfo(response.data);
        // donations에 adName 및 donatedDate 추가
        const donationsWithAdNameAndDonatedDate = await Promise.all(
          response.data.map(async (donation) => {
            const adName = await getAdName(donation.donatedProvider);
            return { ...donation, adName }; // 기존 donation에 adName 및 donatedDate 추가
          })
        );

        setDonations(donationsWithAdNameAndDonatedDate); // 데이터를 donations state에 저장합니다.
        console.log(donationsWithAdNameAndDonatedDate);
        setSelectedValue({
          adName: donationsWithAdNameAndDonatedDate[0].adName,
          donatedProvider: donationsWithAdNameAndDonatedDate[0].donatedProvider,
          donatedDate: donationsWithAdNameAndDonatedDate[0].donatedDate,
        });
      } catch (error) {
        console.error("Cannot fetch data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      //----------------------------------------------------------------------------//

      const formDataURI = new FormData();
      formDataURI.append("file", {
        uri: foodImage,
        type: "image/jpeg",
        name: `profile_${userInfo.id}.jpg`,
      });

      const filename =
        foodAdName + " " + userInfo.adName + " " + donateInfo[0].donatedDate;
      console.log(filename);

      // 'nameFile' 파라미터 추가
      formDataURI.append("nameFile", filename);
      // console.log(formData);
      formDataURI.append("folderName", "review");

      const responseURL = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/files",
        // "http://172.16.104.97:8888/boot/member/files",
        formDataURI,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //----------------------------------------------------------------------------//

      const formDataForAdName = {
        id: selectedValue.donatedProvider,
      };

      const responseForAdName = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/findById",
        formDataForAdName
      );

      console.log(responseForAdName.data); // 콘솔에 출력합니다.
      const adName = responseForAdName.data[0].adName;
      const address = responseForAdName.data[0].address;

      const firstPartOfAddress = address.split(" ")[0];

      console.log(firstPartOfAddress);
      console.log(title);
      console.log(content);
      console.log(adName);
      console.log(new Date());
      console.log(userInfo.adName);
      console.log(responseURL.data);

      const formData = {
        regionCategory: firstPartOfAddress, // 이 값을 적절하게 설정해 주세요.
        reviewTitle: title,
        reviewContext: content,
        donator: adName, // 이 값을 적절하게 설정해 주세요.
        receiver: userInfo.adName, // 이 값을 적절하게 설정해 주세요.
        reviewImage: responseURL.data, // 이미지 URI. 필요에 따라 적절한 값을 설정해 주세요.
      };

      const response = await axios.post(
        //  유효성 필요
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/review/regist",
        formData
      );

      const responseFood = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/food/findById",
        formDataForAdName
      );

      const foodName = responseFood.data[0].foodName;
      console.log(foodName);

      const formDataIs = {
        isReviewed: 1,
        donatedProvider: selectedValue.donatedProvider,
        foodTitle: foodName,
      };
      console.log(selectedValue.adName);
      console.log(formDataIs);

      const responseIs = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/donation/IsReviewed",
        formDataIs
      );

      if (responseIs.status === 200) {
        setModalVisible3(false);
        setfoodImage("");
        navigation.navigate("Donatep", { userInfo: userInfo });
      }
    } catch (error) {
      console.error("Cannot save data: ", error);
    }
  };

  const handleClick2 = async (donation) => {
    try {
      const formData = {
        id: userInfo.id,
      };
      let response = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/member/findById",
        formData
      );

      const donatorId = donation.donatedProvider;

      const formData2 = {
        id: donatorId,
      };
      let response2 = await axios.post(
        "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/findById",
        formData2
      );

      const receiver = response.data[0].adName;
      const donator = response2.data[0].adName;

      let response3 = await axios.get(
        // "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/review/findAll"
        "http://10.20.104.110:8888/boot/review/findAll"
      );
      const matchedReviews = response3.data.filter(
        (review) =>
          review.receiver === receiver &&
          review.donator === donator &&
          review.foodName === donation.foodTitle
      );

      console.log(matchedReviews);

      if (matchedReviews.length > 0) {
        setReceiver(matchedReviews[0].receiver);
        setDonator(matchedReviews[0].donator);
        setDonatedDate(matchedReviews[0].reviewDate);
        setReviewContext(matchedReviews[0].reviewContext);
        setReviewTitle(matchedReviews[0].reviewTitle);
        setReviewImage(matchedReviews[0].reviewImage);

        setModalVisible2(true);
      }
    } catch (error) {
      console.error("Cannot fetch data: ", error);
    }
  };

  const getAdName = async (donatedProvider) => {
    const formData = {
      id: donatedProvider,
    };
    let res = await axios.post(
      "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/findById",
      formData
    );
    console.log(res.data[0].adName); // "adName"만 추출하려면 이렇게 수정하면 됩니다.

    setfoodAdName(res.data[0].adName);
    return res.data[0].adName; // "adName" 값을 반환하도록 수정했습니다.
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

    setfoodImage("");
    setfoodImage(result.assets[0].uri);
  };

  // 삭제 수정 버튼 클릭
  const pressButton = () => {
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      {/* 글쓰기 모달 관련 코드 */}
      <Modal animationType="fade" transparent={true} visible={modalVisible3}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView3}>
            <View style={styles.modalView3}>
              {/* 게시판 모달 관련 코드 */}
              <TouchableOpacity
                style={{
                  marginTop: "5%",
                  marginBottom: "2%",
                  width: "10%",
                  height: "5%",
                  left: "45%",
                }}
                onPress={() => {
                  setModalVisible3(false);
                  setfoodImage("");
                }}
              >
                <View style={{ marginBottom: "0%" }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../../assets/cancle.png")}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              <ScrollView style={{}}>
                {/* 제목 입력칸 */}
                <TextInput
                  style={styles.inputtext}
                  placeholder="제목을 입력하세요."
                  placeholderTextColor="#808080"
                  onChangeText={setTitle}
                />

                {/* 선 긋기 */}
                <View style={styles.lineStyle} />

                {/* 이미지 관련 코드 */}
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      marginBottom: "8%",
                      width: "100%",
                      height: "20%",
                      marginRight: "1%",
                    }}
                    onPress={openImagePicker}
                  >
                    {foodImage ? (
                      <Image
                        source={{ uri: foodImage }}
                        style={{ width: 300, height: 150, borderRadius: 16 }}
                      />
                    ) : (
                      <Image
                        style={{ width: 300, height: 150, borderRadius: 16 }}
                        source={require("../../assets/galally.png")}
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>
                </View>

                {/* 내가 기부받은 기부자 목록 찾기 피커 */}
                <Picker
                  selectedValue={selectedValue.donatedProvider}
                  onValueChange={(itemValue, itemIndex) => {
                    const selectedDonation = donations.filter(
                      (donation) =>
                        !donation.isReviewed &&
                        donation.adName + "-" + donation.foodTitle === itemValue
                    )[0]; // 선택한 donation을 찾음
                    [itemIndex]; // 선택한 donation을 찾음
                    setSelectedValue({
                      adName: selectedDonation.adName,
                      donatedProvider: itemValue,
                    });
                  }}
                  style={{ width: 300, height: 50, marginTop: "20%" }}
                >
                  {donations
                    .filter((donation) => !donation.isReviewed)
                    .map((donation, index) => (
                      <Picker.Item
                        key={
                          donation.adName +
                          "-" +
                          donation.foodTitle +
                          "-" +
                          index
                        } // key 값을 adName, foodTitle, 인덱스의 조합으로 설정
                        label={donation.adName + "-" + donation.foodTitle}
                        value={donation.adName + "-" + donation.foodTitle}
                      />
                    ))}
                </Picker>

                {/* 내용을 입력칸 */}
                <TextInput
                  style={styles.inputtext2}
                  placeholder="내용을 입력하세요."
                  placeholderTextColor="#808080"
                  multiline={true}
                  numberOfLines={10}
                  onChangeText={setContent}
                />
              </ScrollView>
              {/* 등록 버튼 */}
              <TouchableOpacity
                style={{
                  width: "90%",
                  height: "8%",
                  borderRadius: 16,
                  backgroundColor: "#44A5FF",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: "bold",
                    fontFamily: "Play-Regular",
                    color: "#FFFFFF",
                  }}
                >
                  등록
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* 기부내역 보기 모달 관련 코드 */}
      <Modal animationType="fade" transparent={true} visible={modalVisible2}>
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <TouchableOpacity
              style={{ width: "10%", height: "10%", left: "48%" }}
              onPress={() => setModalVisible2(false)}
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
            기부 받은 내역
          </Text>

          {/* 리뷰 글쓰기 */}
          <TouchableOpacity
            style={{ marginLeft: "35%", marginTop: "2%" }}
            onPress={() => setModalVisible3(true)}
          >
            <Image
              style={{ width: 35, height: 35 }}
              source={require("../../assets/writereview.png")}
              resizeMode="contain"
            />
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
          marginRight: "38%",
        }}
      >
        총 {donations.length}건의 기부받은 내역이 있습니다.
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
        style={{ backgroundColor: "#FAFAFC", width: "89.5%", height: "80%" }}
      >
        {donations.map((donation, index) => (
          <View key={index}>
            <View style={{ flexDirection: "row" }}>
              <Text
                onPress={() => {
                  if (Number(donation.isReviewed) === 1) {
                    handleClick2(donation);
                  }
                }}
                style={{
                  fontFamily: "Play-Bold",
                  fontSize: 20,
                  color: "#656565",
                  marginTop: "2%",
                  marginRight: "15%",
                }}
              >
                {donation.foodTitle}
              </Text>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginTop: "1.8%",
                  marginLeft: "25%",
                }}
                source={
                  Number(donation.isReviewed) === 1
                    ? require("../../assets/reviewon.png")
                    : require("../../assets/reviewoff.png")
                }
                resizeMode="contain"
              />

              <TouchableOpacity
                style={{ marginLeft: "5%", marginTop: "2.5%" }}
                onPress={() => {
                  setSelectedDonation(donation); // 선택된 donation을 저장
                  pressButton();
                }}
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
              {donation.donatedDate}
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

      {/* 바텀시트 view */}
      <View style={styles.rootContainer}>
        <BottomsheetModDel
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
          selectedDonation={selectedDonation}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

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

  centeredView2: {
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

  lineStyle: {
    borderColor: "#DBDBDB",
    borderWidth: 1,
    width: "98%",
  },

  centeredView3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView3: {
    width: "85%",
    height: "80%",
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

  inputtext: {
    width: "80%",
    paddingBottom: 10,
    borderColor: "#828282",
    left: "0%",
    fontSize: 20,
    marginBottom: 10,
    color: "#6F6A6A",
  },

  inputtext2: {
    width: "100%",
    height: "30%",
    paddingBottom: 25,
    borderColor: "#828282",
    marginTop: "30%",
    paddingTop: "10%",
    left: "0%",
    fontSize: 20,
    marginBottom: "7%",
    marginTop: "38%",
    color: "#6F6A6A",
  },

  inputtext3: {
    width: "95%",
    height: "7%",
    paddingBottom: 25,
    borderColor: "#828282",
    fontSize: 20,
    marginBottom: "0%",
    color: "#6F6A6A",
  },
});
export default Donatep;
