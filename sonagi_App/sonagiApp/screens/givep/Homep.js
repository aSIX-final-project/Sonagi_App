import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Linking } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';


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
  console.log("하이")
  console.log(userInfo)
  const [activeIndex, setActiveIndex] = useState(null);
  const [noticeList, setNoticeList] = useState({});
  const [latestNotice, setLatestNotice] = useState([]);
  const [reqList, setReqList] = useState([]);
  const [latestReqList, setLatestReqList] = useState([]);


  const [crawlingData, setCrawlingData] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/crawling/findAll');
        console.log("gdgd")
        console.log(response.data.list);
        setCrawlingData(response.data.list);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentItemIndex((prevIndex) => (prevIndex + 1) % (crawlingData.length || 1));
    }, 5000);
    console.log(timer)

    return () => clearInterval(timer);
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
            setLatestNotice(sortedList.slice(0, 3)); // 최근 공지 3개 선택
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchFoodReq = async () => {
        try {
          const response = await axios.post(
            "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/foodReq/findBySenderId",
            { senderId: userInfo.id }
          );

          // response 처리 로직
          console.log(response.data);
          const sortedList = response.data.sort(
            (a, b) => new Date(b.sendTime) - new Date(a.sendTime)
          );
          setReqList(response.data); // 모든 요청 리스트 설정
          setLatestReqList(sortedList.slice(0, 3));
        } catch (error) {
          // 에러 처리 로직
          console.error(error);
        }
      };

      fetchFoodReq();
    }, [])
  );

  const [activeReviewSlide, setReviewActiveSlide] = useState(0);
  const [reviewList, setReviewList] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData3 = async () => {
        try {
          const response = await axios.get(
            "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/review/findAll"
          );
          const receivedReviews = response.data;
          console.log(receivedReviews);
          if (Array.isArray(receivedReviews)) {
            const sortedReviews = receivedReviews.sort(
              (a, b) => new Date(b.reviewDate) - new Date(a.reviewDate)
            );
            const topFiveReviews = sortedReviews.slice(0, 5);
            setReviewList(topFiveReviews);
          }
        } catch (error) {
          console.error("리뷰 데이터를 가져오는데 실패했습니다:", error);
        }
      };


      fetchData3();
    }, [])
  );

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
            따뜻한 연말 보내세요!
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {/* 세번째 라인(기부하기) */}
        <ScrollView
          style={{ width: "95%", height: "95%" }}
          showsVerticalScrollIndicator={true} // 스크롤바 표시
          contentContainerStyle={{ paddingBottom: 950 }} // 공백 부분
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
                  navigation.navigate("Noticep", {
                    userInfo: userInfo,
                    noticeListParam: noticeList,
                  })
                }
              >
                <View style={styles.fourthOneContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "5%",
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
                    }}
                  >
                    {latestNotice &&
                      latestNotice.map((notice, index) => (
                        <View key={index}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "bold",
                              fontFamily: "Play-Bold",
                              color: "white",
                            }}
                          >
                            {notice.title.substring(0, 15)}
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              fontFamily: "Play-Regular",
                              color: "white",
                            }}
                          >
                            {notice.noticeDate.substring(0, 10)}
                          </Text>
                        </View>
                      ))}
                  </View>
                </View>
              </TouchableOpacity>

              {/* 다섯번째 라인 (기부 요청) */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SendReqp", {
                    userInfo: userInfo,
                    reqList: reqList,
                  })
                }
              >
                <View style={styles.fourthTwoContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "20%",
                      marginTop: "5%",
                      marginRight: "30%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontFamily: "Play-Regular",
                        color: "#6F6A6A",
                        marginRight: "7%",
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
                      marginRight: "30%",
                      marginBottom: "10%",
                    }}
                  >
                    {latestReqList && latestReqList.length > 0 ? (
                      latestReqList.map((req, index) => (
                        <View key={index}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "bold",
                              fontFamily: "Play-Bold",
                              color: "#3D3D3D",
                            }}
                          >
                            {req.foodName} {req.serving}인분
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              fontFamily: "Play-Regular",
                              color: "#3D3D3D",
                            }}
                          >
                            {req.sendTime.substring(0, 10)}
                          </Text>
                        </View>
                      ))
                    ) : (
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          fontFamily: "Play-Bold",
                          color: "#3D3D3D",
                        }}
                      >
                        보낸 요청이 없습니다.
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: '100%', height: '50%', alignItems: 'center', marginTop: 20 }}>
            <View
              style={{
                justifyContent: "center",
                height: "100%",
                width: '95%',
                backgroundColor: '#FFFFFF',
                borderRadius: 30,
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
              <View style={styles.thirdContainer}>
                <Carousel
                  data={reviewList}
                  renderItem={({ item }) => (
                    <View>
                      <View style={{ width: '94%', height: "30%" }}>
                        <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'Play-Bold', fontSize: 17, marginTop: 2 }}>{item.regionCategory} - {item.donator}</Text>
                        <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'Play-Bold', fontSize: 14, marginTop: 1 }}> {item.receiver}님의 리뷰 : {item.reviewTitle} </Text>
                        <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'Play-Bold', fontSize: 13, marginTop: 1 }}> {item.reviewDate}</Text>
                      </View>

                      <View style={{ width: '94%', height: '80%', alignItems: 'center' }}>
                        <Image
                          source={{ uri: item.reviewImage }}
                          style={{ width: "90%", height: "75%", borderRadius: 30 }}
                          resizeMode="cover"
                        />
                      </View>
                    </View>
                  )}
                  sliderWidth={Dimensions.get("window").width}
                  itemWidth={Dimensions.get("window").width}
                  onSnapToItem={(index) => setReviewActiveSlide(index)}
                />
                <Pagination
                  dotsLength={reviewList.length}
                  activeDotIndex={activeReviewSlide}
                  containerStyle={{ backgroundColor: 'transparent' }}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.92)'
                  }}
                  inactiveDotStyle={{
                    backgroundColor: 'gray'
                  }}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                />
              </View>
            </View>
          </View>
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
              <Carousel
                data={crawlingData}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.donorscamp.org/culSupportProgList_P.do')}>
                    <Image
                      source={{ uri: item.imageSrc }}
                      style={{ width: "100%", height: "100%", borderRadius: 30 }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
                sliderWidth={Dimensions.get("window").width}
                itemWidth={Dimensions.get("window").width}
                autoplay={true}
                loop={true}
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
            onPress={() => {
              if (component.route === "Noticep") {
                navigation.navigate(component.route, {
                  userInfo: userInfo,
                  noticeListParam: noticeList,
                });
              } else if (component.route === "SendReqp") {
                navigation.navigate(component.route, {
                  userInfo: userInfo,
                  reqList: reqList,
                });
              } else {
                navigation.navigate(component.route, { userInfo: userInfo });
              }
            }}
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
    width: "85%",
    height: "90%",
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
    width: "150px",
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
