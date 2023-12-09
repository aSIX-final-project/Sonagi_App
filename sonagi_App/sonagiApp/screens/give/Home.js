//홈화면
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
import Carousel from "react-native-snap-carousel";
import { Linking } from "react-native";
import { Pagination } from 'react-native-snap-carousel';


const components = [
  {
    name: "공지사항",
    icon: require('../../assets/notice1.png'),
    activeIcon: require('../../assets/notice.png'),
    route: "Notice",
  },
  {
    name: "기부내역",
    icon: require('../../assets/card.png'),
    activeIcon: require('../../assets/card.png'),
    route: "Donate",
  },
  { 
    name: "홈", 
    icon: require('../../assets/home.png'),
    activeIcon: require('../../assets/home.png'),
    route: "Home" },
  
  {
    name: "기부요청",
    icon: require('../../assets/message.png'),
    activeIcon: require('../../assets/message.png'),
    route: "GiveReq",
  },
  {
    name: "기부하기",
    icon: require('../../assets/map1.png'),
    activeIcon: require('../../assets/map1.png'),
    route: "KakaoMap",
  },
];

const Home = ({ navigation, route }) => {
  const { userInfo } = route.params;
  const [activeIndex, setActiveIndex] = useState(null);
  const [noticeList, setNoticeList] = useState({});
  const [latestNotice, setLatestNotice] = useState(null);
  const [requestList, setRequestList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const callPhone = (phoneNum) => {
    // 카카오 네비게이션 API를 이용해 길찾기 실행
    const url = `tel:${phoneNum}`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const images = [

    { id: "1", url: require("../../assets/moneyCheck.png"), nav: "CrawlingNotice" },

    {
      id: "2",
      url: require("../../assets/callConsultation.png"),
      phone: "1357",
    },

    { id: "3", url: require("../../assets/naverCheck.png"), nav: "CrawlingNaver" },
    {
      id: "4",
      url: require("../../assets/checkQualification.png"),
      web: "https://www.semas.or.kr/web/SUP01/SUP0103/SUP010301.kmdc",
    },
    {
      id: "5",
      url: require("../../assets/naverBlog.png"),
      web: "https://cafe.naver.com/jangsin1004",
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeReviewSlide, setReviewActiveSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // 5초마다 다음 이미지로 넘어감
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
            setLatestNotice(sortedList[0]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();

      const fetchData2 = async () => {
        try {
          const response = await axios.post(
            "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/foodReq/findById",

            {
              receiverId: userInfo.id,
            }
          );
          setRequestList(response.data);
          console.log(requestList.length);
        } catch (error) {
          console.error("데이터를 가져오는데 실패했습니다:", error);
        }
      };

      fetchData2();

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
            navigation.navigate("Profiles", { userInfo: userInfo })
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
            {userInfo.name}님
          </Text>
          <Text style={{ fontSize: 23, fontFamily: "Play-Regular" }}>
            기부 하고 복 받아가세요!
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {/* 세번째 라인(기부하기) */}
        <ScrollView
          style={{ width: "95%", height: "95%" }}
          showsVerticalScrollIndicator={true} // 스크롤바 표시
          contentContainerStyle={{ paddingBottom: 850 }} // 공백 부분
        >
          <View style={styles.fifthOneContainer}>
            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={() =>
                navigation.navigate("KakaoMap", { userInfo: userInfo })
              }
            >
              <View
                style={{
                  textAlign: "left",
                  width: "100%",
                  marginLeft: "2%",
                  marginBottom: "3%",
                  marginTop: "1%",
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
                  기부 하기
                </Text>
              </View>
              <Image
                style={{
                  width: "100%",
                  height: "72%",
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
              height: "20%",
              backgroundColor: "#D3EAFF",
              borderRadius: 15,
              marginHorizontal: "3%",
              marginTop: '3%',
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
                marginTop: "2%",
                width: "87%",
                textAlign: "left",
                marginBottom: "3%",
              }}
            >
              기부 내역
            </Text>

            <TouchableOpacity
              style={{
                marginBottom: "2%",
                marginRight: "64%",
                borderRadius: 15,
                backgroundColor: "#FFFFFF",
                padding: "2%",
                paddingHorizontal: "5%",
              }}
              onPress={() =>
                navigation.navigate("Donate", { userInfo: userInfo })
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
                  navigation.navigate("Notice", {
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
                      marginBottom: "30%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontFamily: "Play-Regular",
                        color: "white",
                        marginRight: "7%",
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
                          {latestNotice.title.substring(0, 15)}...
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

              {/* 다섯번째 라인 (기부 요청) */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("GiveReq", { userInfo: userInfo })
                }
              >
                <View style={styles.fourthTwoContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontFamily: "Play-Regular",
                        color: "#6F6A6A",
                        marginRight: "30%",
                        marginTop: "20%",
                      }}
                    >
                      기부 요청
                    </Text>
                  </View>
                  <Image
                    style={{ width: "50%", height: "50%", marginTop: "6%" }}
                    source={require("../../assets/givereq.png")}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      position: "absolute",
                      top: 75,
                      right: 40,
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "#FF7070",
                      justifyContent: "center", // 자식 요소를 주 축을 따라 가운데에 위치시킵니다.
                      alignItems: "center", // 자식 요소를 수직 축을 따라 가운데에 위치시킵니다.
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        fontSize: "19",
                      }}
                    >
                      {requestList.length}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ width: '100%', height: '90%', alignItems: 'center', marginTop: -30,  }}>
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
              <View style={styles.thirdSecondContainer}>
                <Carousel
                  data={reviewList}
                  renderItem={({ item }) => (
                    <View>
                      <View style={{ width: '94%', height: "30%",}}>
                        <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'Play-Bold', fontSize: 17, marginTop: 2 }}>{item.regionCategory} - {item.donator}</Text>
                        <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'Play-Bold', fontSize: 14, marginTop: 1 }}> {item.receiver}님의 리뷰 : {item.reviewTitle} </Text>
                        <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'Play-Bold', fontSize: 13, marginTop: 1 }}> {item.reviewDate}</Text>
                      </View>

                      <View style={{ width: '90%', height: '70%', alignItems: 'center'}}>
                        <Image
                          source={{ uri: item.reviewImage }}
                          style={{ width: "90%", height: "100%", borderRadius: 30 }}
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
                data={images}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.nav) {
                        navigation.navigate(item.nav, { userInfo: userInfo });
                      } else if (item.web) {
                        Linking.openURL(item.web);
                      } else if (item.phone) {
                        callPhone(item.phone);
                      }
                    }}
                  >
                    <Image
                      source={item.url}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
                sliderWidth={Dimensions.get("window").width}
                itemWidth={Dimensions.get("window").width}
                onSnapToItem={(index) => setActiveSlide(index)}
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
              if (component.route === "Notice") {
                navigation.navigate(component.route, {
                  userInfo: userInfo,
                  noticeListParam: noticeList,
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
            <Image
              source={
                activeIndex === index ? component.activeIcon : component.icon
              }
              style={{ 
                width: component.name === "공지사항" ? 32 : component.name === "홈" ? 27 : component.name === "기부요청" ? 38 : component.name === "기부하기" ? 30 : 35, 
                height: component.name === "공지사항" ? 32 : component.name === "홈" ? 27 : component.name === "기부요청" ? 38 : component.name === "기부하기" ? 30 : 35, 
                marginTop: component.name === "홈" ? 3 : component.name === "기부내역" ? 0 : component.name === "기부하기" ? 4 : 1, 
                alignSelf: "center" 
              }}
            />
            <Text style={{
              textAlign: "center", 
              fontSize: 13,
              marginTop: component.name === "홈" ? 8 : component.name === "기부요청" ? 0 : component.name === "기부하기" ? 7 : 3 
            }}>
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
    backgroundColor: "#F8F8F8",
  },

  thirdContainer: {
    width: "94%",
    height: "90%",
    borderRadius: 30,
    marginTop: 25,
    overflow: "hidden",
  },


  thirdSecondContainer: {
    width: "94%",
    height: "80%",
    borderRadius: 30,
    overflow: "hidden",
  },



  fourthContainer: {
    flexDirection: "row",
    width: "93.5%",
    height: "60%",
    justifyContent: "center", // 가로 방향으로 가운데 정렬
    alignItems: "center", // 세로 방향으로 가운데 정렬
    marginHorizontal: "3%",
  },

  fourthOneContainer: {
    width: 190,
    height: "85%",
    backgroundColor: "#44A5FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4%",
    marginTop: "0%",
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
    height: "85%",
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: "2%",
    marginTop: "0%",
    borderRadius: 30,
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
    height: "40%",
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
    marginTop: 0,
    right: "1%",
  },

  lineStyle: {
    height: 1, // 선의 두께
    backgroundColor: "#44A5FF", // 선의 색상
    width: "100%", // 선의 길이
    marginBottom: "3%",
  },
});

export default Home;
