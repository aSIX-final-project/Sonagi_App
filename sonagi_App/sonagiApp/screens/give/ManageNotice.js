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
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BottomsheetMoDe from "./BottomsheetModDel";

const ManageNotice = ({ navigation }) => {
  // 바텀시트 (삭제, 수정)
  const [modalVisible, setModalVisible] = useState(false);

  // 등록 버튼 클릭
  const RegistNotice = () => {
    navigation.navigate("RegistGive");
  };

  // 삭제 수정 버튼 클릭
  const pressButton = () => {
    setModalVisible(true);
  };

  // 게시판 모달 상태
  const [isNotionModalVisible, setNotionModalVisible] = useState(false);
  // 게시판 버튼 클릭 핸들러
  const handleNotionButtonClick = () => {
    console.log("sucess");
    setNotionModalVisible(true);
  };

  // 게시판 모달 상태(게시글 들어가기)
  const [isNotionModalVisible2, setNotionModalVisible2] = useState(false);
  // 게시판 버튼 클릭 핸들러
  const handleNotionButtonClick2 = () => {
    console.log("sucess");
    setNotionModalVisible2(true);
  };

  return (
    <View style={styles.container}>
      {/* 공지 게시글 등록하기 모달 디자인 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isNotionModalVisible}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView2}>
            <View style={styles.modalView2}>
              {/* 게시판 모달 관련 코드 */}
              <TouchableOpacity
                style={{ width: "10%", height: "%", left: "48%" }}
                onPress={() => setNotionModalVisible(false)}
              >
                <View style={{ marginBottom: "10%" }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../../assets/cancle.png")}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              {/* 제목 입력칸 */}
              <TextInput
                style={styles.inputtext}
                placeholder="제목을 입력하세요."
                placeholderTextColor="#808080"
              ></TextInput>

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* 내용을 입력칸 */}
              <TextInput
                style={styles.inputtext2}
                placeholder="내용을 입력하세요."
                placeholderTextColor="#808080"
                multiline={true}
                numberOfLines={10}
              ></TextInput>

              {/* 등록 버튼 */}
              <TouchableOpacity
                style={{
                  width: "95%",
                  height: "10%",
                  borderRadius: 18,
                  marginTop: "8%",
                  marginBottom: "15%",
                  backgroundColor: "#44A5FF",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    fontFamily: "Play-Bold",
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

      {/* 공지 게시글 보기 모달 디자인 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isNotionModalVisible2}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView2}>
            <View style={styles.modalView2}>
              {/* 게시판 모달 관련 코드 */}
              <TouchableOpacity
                style={{ width: "10%", left: "48%" }}
                onPress={() => setNotionModalVisible2(false)}
              >
                <View style={{ marginBottom: "10%" }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../../assets/cancle.png")}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              {/* 제목 입력칸 */}
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "Play-Bold",
                    fontSize: 20,
                    color: "#656565",
                    marginTop: "10%",
                  }}
                >
                  [공지]23시-03시 정기 점검 예정
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Play-Regular",
                  fontSize: 15,
                  color: "#8B8E90",
                  marginTop: "1%",
                }}
              >
                2023.11.06
              </Text>
              <View
                style={{
                  borderBottomColor: "#DBDBDB",
                  width: "100%",
                  marginTop: "5%",
                }}
              />

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              {/* 내용을 입력칸 */}
              <Text
                style={{
                  width: "90%",
                  height: "60%",
                  fontSize: 20,
                  marginTop: "5%",
                }}
              >
                전체 앱 점검을 23시 ~ 03시까지 진행 할 예정이니 이용에 참고
                부탁드립니다.
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
            onPress={() => navigation.navigate("ManagePage")}
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

          {/* 등록 버튼 */}
          <TouchableOpacity
            style={{
              marginTop: "2%",
              marginLeft: "0%",
              width: "25%",
              height: "100%",
              marginLeft: "33%",
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleNotionButtonClick}
          >
            <Image
              style={{ width: 90, height: 70 }}
              source={require("../../assets/add.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
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
        총 30건의 공지사항이 있습니다.
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
        <TouchableOpacity
          style={{ flexDirection: "column", paddingBottom: "5%" }}
          onPress={handleNotionButtonClick2}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Play-Bold",
                fontSize: 20,
                color: "#656565",
                marginTop: "2%",
              }}
            >
              [공지]23시-03시 정기 점검 예정
            </Text>

            <TouchableOpacity
              style={{
                marginLeft: "35%",
                marginTop: "2.5%",
                marginRight: 10,
                paddingTop: "2%",
                paddingBottom: "2%",
                marginTop: "1%",
                paddingHorizontal: "2%",
              }}
              onPress={pressButton}
            >
              <Image
                style={{ width: 18, height: 18 }}
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
            2023.11.06
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#DBDBDB",
            width: "100%",
            marginTop: "5%",
          }}
        />
      </ScrollView>

      {/* 바텀시트 view */}
      <View style={styles.rootContainer}>
        <BottomsheetMoDe
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

  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: "87%",
    height: "70%",
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

  inputtext: {
    width: "80%",
    paddingBottom: 10,
    borderColor: "#828282",
    marginTop: "10%",
    left: "0%",
    fontSize: 26,
    marginBottom: 10,
    color: "#6F6A6A",
  },

  inputtext2: {
    width: "80%",
    height: "55%",
    paddingBottom: 25,
    borderColor: "#828282",
    marginTop: "8%",
    left: "0%",
    fontSize: 26,
    marginBottom: "7%",
    color: "#6F6A6A",
  },
  lineStyle: {
    height: 2, // 선의 두께
    backgroundColor: "#E4E4E4", // 선의 색상
    width: "90%", // 선의 길이
    marginBottom: "3%",
  },
});
export default ManageNotice;
