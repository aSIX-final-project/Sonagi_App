import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import BottomsheetMoDe from "./BottomsheetModDel";
import axios from "axios";

const ManageNotice = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isNotionModalVisible, setNotionModalVisible] = useState(false);
  const [isNotionModalVisible2, setNotionModalVisible2] = useState(false);


  const { userInfo, noticeListParam } = route.params;
  const [noticeList, setNoticeList] = useState({});
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setNoticeList(noticeListParam);
    console.log(noticeList);
  }, []);

  const renderNoticeItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedNotice(item);
        console.log("item : ", item);
        setNotionModalVisible2(true);
      }}
    >
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: "Play-Bold",
              fontSize: 20,
              color: "#656565",
              marginTop: "2%",
              zIndex:10,
            }}
          >
            [공지]{item.title}
          </Text>
          <TouchableOpacity
            style={{ marginLeft: "5%", marginTop: "2.5%", width: "7%", height: "80%" }}
            onPress={() => pressButton(item.textNum)}
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
          {item.noticeDate.substring(0, 16)}
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
  );

  const fetchData = async () => {
    let res = await axios.get(
      "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/notice/findAll"
    );
    setNoticeList(res.data);
  };
  const handleSubmit = () => {
    // title과 content에 접근 가능
    console.log(title, content);
    const fetchData2 = async () => {
      try {
        const formData = {
          id: 'admin',
          title: title,
          context: content,
          noticeIdentify: 0,
        };
        let response = await axios.post(
          "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/notice/regist",
          formData
        );
        // POST 요청이 성공적으로 끝난 후에 모달을 닫고 title과 content를 null로 설정합니다.
        setNotionModalVisible(false);
        setTitle(null);
        setContent(null);
        fetchData();
      } catch (error) {
        console.error("Cannot fetch data: ", error);
      }
    };
    fetchData2();
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("noticeList : ", noticeList);
  }, [noticeList]); // noticeList 상태가 변경될 때마다 로그를 출력

  // 삭제 수정 버튼 클릭
  const pressButton = (item) => {
    console.log("Button pressed");
    console.log(item);
    console.log("Button pressed");
    setSelectedItem(item);
    setModalVisible(true);
  };

  const asdf = () => {
    setNotionModalVisible(false);
    setTitle(null);
    setContent(null);
    fetchData();
  };

  // 게시판 모달 상태 

  // 게시판 버튼 클릭 핸들러
  const handleNotionButtonClick = () => {
    console.log("sucess");
    setNotionModalVisible(true);
  };

  // 게시판 모달 상태(게시글 들어가기)


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
                style={{ width: "10%", left: "48%" }}
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
                onChangeText={text => setTitle(text)}
                value={title}
              />

              {/* 선 긋기 */}
              <View style={styles.lineStyle} />

              <TextInput
                style={styles.inputtext2}
                placeholder="내용을 입력하세요."
                placeholderTextColor="#808080"
                multiline={true}
                numberOfLines={10}
                onChangeText={text => setContent(text)}
                value={content}
              />

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
                onPress={handleSubmit}
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
                  {selectedNotice ? selectedNotice.title : ''}
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
                {selectedNotice ? selectedNotice.noticeDate : ''}
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
                {selectedNotice ? selectedNotice.context : ''}
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
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: "10%",
          marginTop: "10%",
        }}
      >
        {/* 상단부분 */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#44A5FF",
            width: "100%",
            height: "100%",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: "6%", marginRight: "2%" }}
            onPress={() => navigation.navigate("ManagePage", { userInfo: userInfo })}
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
          marginRight: "35%",
        }}
      >
        총 {noticeList.length}건의 공지사항이 있습니다.
      </Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#7D7D7D",
          width: "89.5%",
          marginTop: "1.5%",
        }}
      />

      <FlatList
        data={noticeList}
        renderItem={renderNoticeItem}
        keyExtractor={(item, index) => index.toString()}
        style={{
          backgroundColor: "#FFFFFF",
          width: "89.5%",
          height: "80%",
        }}
      />



      {/* 바텀시트 view */}
      <View style={styles.rootContainer}>
        <BottomsheetMoDe
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
          item={selectedItem}
          onClose={asdf} // fetchData 함수를 onClose 이벤트 핸들러로 전달합니다.
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