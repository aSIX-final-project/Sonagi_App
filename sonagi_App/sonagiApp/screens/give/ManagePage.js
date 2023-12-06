//홈화면
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const ManagePage = ({ navigation, route }) => {
  const { userInfo } = route.params;
  const [dataList, setDataList] = useState([]);
  const [noticeList, setNoticeList] = useState({});
  const [latestNotice, setLatestNotice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/admin/findAll"
        );
        console.log(response.data);
        setDataList(response.data);
      } catch (error) {
        console.error("Cannot fetch data: ", error);
      }
    };

    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/notice/findAll"
          );
          const receivedList = response.data;
          console.log(receivedList);
          if (Array.isArray(receivedList)) {
            setNoticeList(receivedList);

            const sortedList = receivedList.sort(
              (a, b) => new Date(b.noticeDate) - new Date(a.noticeDate)
            );
            setLatestNotice(sortedList[0]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [])
  );


  return (
    <View style={styles.container}>
      <View
        style={{ width: "100%", height: "10%", backgroundColor: "#44A5FF" }}
      ></View>

      {/* 첫번째 라인 */}
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          height: "10%",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "30%",
          marginLeft: "8%",
        }}
      >
        <Image
          style={{ width: "35%", height: "60%", marginBottom: "1%" }}
          source={require("../../assets/logo.png")}
          resizeMode="contain"
        />
        <View style={{ marginLeft: "5%" }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              fontFamily: "Play-Bold",
            }}
          >
            ManagePage
          </Text>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              fontFamily: "Play-Regular",
            }}
          >
            관리자 페이지
          </Text>
        </View>
      </View>

      {/* 공지사항 */}
      <View style={styles.fourthContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ManageNotice", { userInfo: userInfo, noticeListParam: noticeList, })}>
          <View style={styles.fourthOneContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                top: "12%",
                left: "3%",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: "Play-Regular",
                  color: "white",
                  marginRight: "14%",
                }}
              >
                공지사항
              </Text>
              <Image
                style={{ width: 50, height: 25, left: "10%" }}
                source={require("../../assets/notice.png")}
                resizeMode="contain"
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                top: "45%",
                right: "5%",
                marginLeft: "2%",
              }}
            >

              {latestNotice && (
                <>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      fontFamily: "Play-Bold",
                      color: "white",
                    }}
                  >
                    {latestNotice.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      fontFamily: "Play-Regular",
                      color: "white",
                    }}
                  >
                    {latestNotice.noticeDate.substring(0, 10)}
                  </Text>
                </>
              )}

            </View>
          </View>
        </TouchableOpacity>

        {/* 사용자 요청 관리 */}
        <TouchableOpacity onPress={() => navigation.navigate("ManageReq", { userInfo: userInfo })}>
          <View style={styles.fourthTwoContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                top: "15%",
                left: "3%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Play-Regular",
                  color: "#6F6A6A",
                }}
              >
                사용자 요청 관리
              </Text>
              <Image
                style={{ width: 50, height: 25, left: "10%" }}
                source={require("../../assets/manage.png")}
                resizeMode="contain"
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                bottom: "5%",
                right: "1%",
              }}
            >
              <View style={{ marginTop: "29%" }}>
                <Image
                  style={{ width: 80, height: 80, left: "0%" }}
                  source={require("../../assets/circle.png")}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 60,
                    fontFamily: "Play-Bold",
                    color: "#ffffff",
                    textAlign: "center",
                    bottom: "50%",
                  }}
                >
                  {dataList.length}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* 네번째 라인 */}
      <TouchableOpacity onPress={() => navigation.navigate("KakaoMapA", { userInfo: userInfo })}>
        <View style={styles.thirdContainer}>
          <Image
            source={require("../../assets/map.jpg")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
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

  thirdContainer: {
    flexDirection: "row",
    width: "90%",
    height: "40%",
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    overflow: "hidden",
  },

  fourthContainer: {
    flexDirection: "row",
    marginTop: "10%",
    width: "90%",
    height: "19%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  fourthOneContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    bottom: "0%",
    backgroundColor: "#44A5FF",
    borderRadius: 30,
    marginRight: 15,
  },

  fourthTwoContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    bottom: "0%",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    marginLeft: 14,
    borderColor: "#44A5FF",
    borderWidth: 1,
  },

  fifthContainer: {
    flexDirection: "row",
    width: "90%",
    height: "25%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "5%",
  },

  fifthOneContainer: {
    width: "99%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    marginRight: 15,
    marginTop: 25,
  },

  fifthTwoContainer: {
    width: "84.5%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    marginLeft: 14,
    marginTop: 25,
    right: "1%",
  },

  lineStyle: {
    height: 1, // 선의 두께
    backgroundColor: "#44A5FF", // 선의 색상
    width: "100%", // 선의 길이
    marginBottom: "3%",
  },
});

export default ManagePage;