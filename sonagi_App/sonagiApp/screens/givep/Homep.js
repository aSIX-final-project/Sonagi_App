import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const components = [
  {
    name: "공지사항",
    icon: "notifications-outline",
    activeIcon: "notifications",
    route: "Noticep",
  },
  {
    name: "기부내역",
    icon: "bookmark-outline",
    activeIcon: "bookmark",
    route: "Donatep",
  },
  { name: "홈", icon: "home", activeIcon: "home-outline", route: "Homep" },
  {
    name: "기부받기",
    icon: "map-outline",
    activeIcon: "map",
    route: "KakaoMapP",
  },
  {
    name: "보낸요청",
    icon: "paper-plane-outline",
    activeIcon: "paper-plane",
    route: "SendReqp",
  },
];

const Homep = ({ navigation, route }) => {
  const { userInfo } = route.params;
  const [image, setImage] = useState(require("../../assets/policy.png"));
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    const timer = setInterval(() => {
      setImage((prevImage) =>
        prevImage === require("../../assets/policy.png")
          ? require("../../assets/policy2.png")
          : require("../../assets/policy.png")
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* 첫번째 라인 */}
      <View
        style={{
          width: "100%",
          height: "10%",
          backgroundColor: "#44A5FF",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Image
          style={{
            width: "30%",
            height: "70%",
            marginTop: "7%",
            marginLeft: "10%",
          }}
          source={require("../../assets/sonagilogo2.png")}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={{ marginTop: "7%", width: "8%", height: "35%", left: "90%" }}
          onPress={() =>
            navigation.navigate("Profilesp", { userInfo: userInfo })
          }
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/user2.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* 두번째 라인 */}
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          height: "10%",
          justifyContent: "flex-start",
          alignItems: "center",
          bottom: "0%",
        }}
      >
        <View style={{ marginLeft: "1%", marginTop: "5%" }}>
          <Text style={{ fontSize: 23, fontFamily: "Play-Regular" }}>
            {userInfo.managerName}님
          </Text>
          <Text style={{ fontSize: 23, fontFamily: "Play-Regular" }}>
            기부 받고 복 받아가세요!
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {/* 세번째 라인(기부하기) */}
        <ScrollView
          style={{ width: "95%", height: "95%" }}
          showsVerticalScrollIndicator={true} // 스크롤바 표시
          contentContainerStyle={{ paddingBottom: 530 }} // 공백 부분
        >
          <View style={styles.fifthOneContainer}>
            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={() =>
                navigation.navigate("KakaoMapP", { userInfo: userInfo })
              }
            >
              <View
                style={{
                  textAlign: "left",
                  width: "100%",
                  marginLeft: "2%",
                  marginBottom: "3%",
                  marginTop: "3%",
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "Play-Regular",
                    color: "#3D3D3D",
                    marginRight: "0%",
                  }}
                >
                  기부 받기
                </Text>
              </View>
              <Image
                style={{
                  width: "100%",
                  height: "75%",
                  borderRadius: 15,
                  marginBottom: "3%",
                }}
                source={require("../../assets/map.jpg")}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          {/* 네번째 라인 (기부 내역) */}
          <View
            style={{
              width: "94%",
              height: "30%",
              backgroundColor: "#D3EAFF",
              borderRadius: 15,
              margin: "3%",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Play-Regular",
                color: "#3D3D3D",
                marginRight: "0%",
                marginTop: "0%",
                width: "87%",
                textAlign: "left",
                marginBottom: "3%",
              }}
            >
              기부 받은 내역
            </Text>

            <TouchableOpacity
              style={{
                marginBottom: "2%",
                marginRight: "63%",
                borderRadius: 15,
                backgroundColor: "#FFFFFF",
                padding: "2%",
                paddingHorizontal: "5%",
              }}
              onPress={() =>
                navigation.navigate("Donatep", { userInfo: userInfo })
              }
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Play-Regular",
                  color: "#707070",
                }}
              >
                자세히 보기
              </Text>
            </TouchableOpacity>
          </View>

          {/* 다섯번째 라인 (공지사항) */}
          <View style={styles.fourthContainer}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Noticep", { userInfo: userInfo })
                }
              >
                <View style={styles.fourthOneContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "30%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontFamily: "Play-Regular",
                        color: "white",
                        marginRight: "14%",
                        marginLeft: "5%",
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
                      justifyContent: "center",
                      marginRight: "10%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        fontFamily: "Play-Bold",
                        color: "white",
                      }}
                    >
                      11월 첫째주 기부왕
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        fontFamily: "Play-Regular",
                        color: "white",
                      }}
                    >
                      2023.11.10
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* 다섯번째 라인 (기부 요청) */}
              <TouchableOpacity
                onPress={() => navigation.navigate("SendReqp",{userInfo:userInfo})}
              >
                <View style={styles.fourthTwoContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "30%",
                      marginTop: "18%",
                      left: "3.5%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontFamily: "Play-Regular",
                        color: "#6F6A6A",
                        marginRight: "17%",
                        marginLeft: "0%",
                      }}
                    >
                      보낸 요청
                    </Text>
                    <Image
                      style={{ width: 50, height: 25, left: "10%" }}
                      source={require("../../assets/sendreq.png")}
                      resizeMode="contain"
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      marginleft: "10%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        fontFamily: "Play-Bold",
                        color: "#3D3D3D",
                      }}
                    >
                      이모네밥 김치 200인분
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        fontFamily: "Play-Regular",
                        color: "#3D3D3D",
                      }}
                    >
                      2023.11.10
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* 여섯 번째 라인 광고*/}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "50%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          >
            <View style={styles.thirdContainer}>
              <Image
                source={image}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          width: "90%",
          height: "8%",
          backgroundColor: "white",
          bottom: 0,
          marginBottom: "15%",
          borderRadius: 16,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {components.map((component, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(component.route, {userInfo : userInfo})}
            onPressIn={() => setActiveIndex(index)}
            onPressOut={() => setActiveIndex(null)}
            style={{
              marginLeft: index === 0 ? 22 : 0,
              marginRight: index === components.length - 1 ? 22 : 0,
            }}
          >
            <Ionicons
              name={
                activeIndex === index ? component.activeIcon : component.icon
              }
              size={27}
              color="black"
              style={{ textAlign: "center" }}
            />
            <Text style={{ textAlign: "center", fontSize: 12 }}>
              {component.name}
            </Text>
          </TouchableOpacity>
        ))}
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

  thirdContainer: {
    width: "94%",
    height: "80%",
    borderRadius: 30,
    marginTop: 20,
    overflow: "hidden",
  },

  fourthContainer: {
    flexDirection: "row",
    width: "93.5%",
    height: "50%",
    justifyContent: "center", // 가로 방향으로 가운데 정렬
    alignItems: "center", // 세로 방향으로 가운데 정렬
    marginHorizontal: "3%",
  },

  fourthOneContainer: {
    width: "92%",
    height: "95%",
    backgroundColor: "#44A5FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4%",
    marginTop: "3%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  fourthTwoContainer: {
    width: "96%",
    height: "95%",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: "2%",
    marginTop: "3%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  fifthOneContainer: {
    width: "94%",
    height: "60%",
    padding: "4%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    margin: "3%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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

export default Homep;