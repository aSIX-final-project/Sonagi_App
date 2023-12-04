import React, { useEffect, useState } from "react";
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
  FlatList,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Notice = ({ navigation, route }) => {
  const { userInfo, noticeListParam } = route.params;
  const [noticeList, setNoticeList] = useState({});
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setNoticeList(noticeListParam);
    console.log(noticeList);
  }, []);

  const renderNoticeItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedNotice(item);
        setModalVisible(true);
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "Play-Bold",
            fontSize: 20,
            color: "#656565",
            marginTop: "2%",
          }}
        >
          [{item.textNum}]{item.title}
        </Text>
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

  return (
    <View style={styles.container}>
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
            공지사항
          </Text>
        </View>

        {/* 프로필 부분 */}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <Image
            style={{ width: 90, height: 90, borderRadius: 100, borderWidth: 1 }}
            source={
              userInfo && userInfo.profileImage
                ? { uri: userInfo.profileImage }
                : require("../../assets/profileremove.png")
            }
            resizeMode="cover"
          />
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
      <Text
        style={{
          fontFamily: "Play-Regular",
          fontSize: 18,
          color: "#8B8E90",
          marginTop: "5%",
          marginLeft: "10%",
          width: "100%",
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

      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView3}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                position: "absolute",
                right: "8%",
                top: "8%",
                marginBottom: "5%",
              }}
            >
              <MaterialCommunityIcons
                name="close-thick"
                size={20}
                color="black"
              />
            </TouchableOpacity>
            {selectedNotice && (
              <>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 23,
                    marginTop: "3%",
                  }}
                >
                  {selectedNotice.title}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#8B8E90",
                    marginTop: "3%",
                  }}
                >
                  {selectedNotice.noticeDate.substring(0, 16)}
                </Text>
                <Text style={{ marginTop: "7%" }}>
                  {selectedNotice.context}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  modalView3: {
    width: "70%",
    height: "30%",
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
});
export default Notice;
