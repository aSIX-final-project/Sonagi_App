import React, { useState, useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import axios from "axios";
import {
  Linking,
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import BottomsheetMarker from "./BottomsheetMarker";
import BottomsheetMarker2 from "./BottomsheetMarkerP";
export default function App({ navigation, route }) {
  const { userInfo } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);

  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedMarkerId2, setSelectedMarkerId2] = useState(null);
  // testClick 클릭
  const testClick = () => {
    navigation.navigate("Mapadd", { userInfo: userInfo }); // 'Mapadd' 페이지로 이동합니다.
  };

  // 등록 버튼 클릭
  const handleFoodRegistClick = () => {
    navigation.navigate("Registgive", { userInfo: userInfo });
  };

  // 기부 요청목록 버튼 클릭
  const GiveReq = () => {
    navigation.navigate("GiveReq", { userInfo: userInfo });
  };
  const pressButton2 = () => {
    setModalVisible2(true);
  };
  const [locations, setLocations] = useState([]);
  const [foodLocations, setFoodLocations] = useState([]);
  const [resLocations, setResLocations] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [markerCoordinates, setMarkerCoordinates] = useState({
    x: null,
    y: null,
  });
  const [html, setHtml] = useState(""); // html 상태 변수 추가

  useEffect(() => {
    if (currentPosition && locations.length > 0) {
      const markersData = makeMarkersData();
      const html = generateHTML(markersData, "[]");
      setHtml(html);
    }
  }, [currentPosition, locations]);

  //렌더링 될 때 실행
  useEffect(() => {
    requestLocationPermission();
  }, []);

  //permissionStatus가 바뀔 때마다 실행
  useEffect(() => {
    if (permissionStatus !== null) {
      fetchData();
      fetchData2();
      fetchData3();
    }
  }, [permissionStatus]);

  //위치 권한 요청
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
    if (status === "granted") {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 100, //위치 정보 업데이트 거리 (10m)
        },
        updateCurrentPosition
      );
      setLocationSubscription(subscription);
    }
  };

  const kakaoMap = (x, y) => {
    // 카카오 네비게이션 API를 이용해 길찾기 실행
    const url = `kakaomap://route?&ep=${y},${x}&by=CAR`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const callPhone = (phoneNum) => {
    // 카카오 네비게이션 API를 이용해 길찾기 실행
    const url = `tel:${phoneNum}`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };
  //현재 위치 업데이트 하기
  const updateCurrentPosition = (location) => {
    setCurrentPosition({
      y: location.coords.latitude,
      x: location.coords.longitude,
    });
  };

  //데이터 가져오기
  const fetchData = async () => {
    const res = await axios.get(
      "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/member/findAll"
    ); //스프링 부트 : db에서 값 가져오기

    //마커 찍을 좌표값 가져오기
    const fetchPromises = res.data.map(async (item) => {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${item.address}`,
        {
          headers: {
            Authorization: "KakaoAK db06c51425b99419a11f3881f8491642",
          },
        }
      );
      const data = await response.json();
      console.log("123");
      console.log(data);
      const { x, y } =
        data.documents[0].road_address || data.documents[0].address;
      return { ...item, coordinates: { x, y } };
    });

    const locations = await Promise.all(fetchPromises);
    setLocations(locations);
  };

  //데이터 가져오기
  const fetchData2 = async () => {
    const res = await axios.get(
      "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/food/findAll"
    ); //스프링 부트 : db에서 값 가져오기
    //마커 찍을 좌표값 가져오기
    console.log(res.data.list);
    const fetchPromises = res.data.list.map(async (item) => {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${item.foodAddress}`,
        {
          headers: {
            Authorization: "KakaoAK db06c51425b99419a11f3881f8491642",
          },
        }
      );
      const data = await response.json();
      console.log("456");
      console.log(data);
      const { x, y } =
        data.documents[0].road_address || data.documents[0].address;
      return { ...item, coordinates: { x, y } };
    });

    const locations = await Promise.all(fetchPromises);
    setFoodLocations(locations);
  };

  //데이터 가져오기
  const fetchData3 = async () => {
    const res = await axios.get(
      "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/restaurant/findAll"
    ); //스프링 부트 : db에서 값 가져오기
    //마커 찍을 좌표값 가져오기
    console.log(res.data.list);
    const fetchPromises = res.data.list.map(async (item) => {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${item.address}`,
        {
          headers: {
            Authorization: "KakaoAK db06c51425b99419a11f3881f8491642",
          },
        }
      );
      const data = await response.json();
      console.log("789");
      console.log(data);
      const { x, y } =
        data.documents[0].road_address || data.documents[0].address;
      return { ...item, coordinates: { x, y } };
    });

    const locations = await Promise.all(fetchPromises);
    setResLocations(locations);
  };

  // 마커 데이터 생성
  const makeMarkersData = () => {
    let markersData = "";

    // Current position marker
    if (currentPosition) {
      markersData += `
  var imageSrcCurrent = 'https://i.postimg.cc/FsqzKNmz/sonagi-char.png';
  var imageSizeCurrent = new kakao.maps.Size(64, 69);
  var imageOptionCurrent = { offset: new kakao.maps.Point(27, 69) };
  var markerImageCurrent = new kakao.maps.MarkerImage(imageSrcCurrent, imageSizeCurrent, imageOptionCurrent);
  var currentMarkerPosition = new kakao.maps.LatLng(${currentPosition.y}, ${currentPosition.x}); 
  var currentMarker = new kakao.maps.Marker({ position: currentMarkerPosition, image: markerImageCurrent });
  currentMarker.setMap(map);

  var currentMarkerInfoWindow = new kakao.maps.InfoWindow({ content: '<div style="padding:5px;">현위치</div>' });
  kakao.maps.event.addListener(currentMarker, 'click', function() {
    window.ReactNativeWebView.postMessage('bottomSheet');
  });
`;
    }

    // Location markers
    locations.forEach((location, i) => {
      var phoneNum = location.phoneNum;
      phoneNum =
        phoneNum.slice(0, 3) +
        "-" +
        phoneNum.slice(3, 7) +
        "-" +
        phoneNum.slice(7);

      markersData += `
  var imageSrc${i} = '${location.profileImage}'; 
  var imageSize${i} = new kakao.maps.Size(54, 54);
  var imageOption${i} = { offset: new kakao.maps.Point(33, 95) };
  var markerImage${i} = new kakao.maps.MarkerImage(imageSrc${i}, imageSize${i}, imageOption${i});
  var markerPosition${i} = new kakao.maps.LatLng(${location.coordinates.y}, ${location.coordinates.x}); 
  var marker${i} = new kakao.maps.Marker({ position: markerPosition${i}, image: markerImage${i} });
  marker${i}.setMap(map);

  var overlayImageSrc${i} = 'https://i.postimg.cc/6QLKYDkd/marker01.png';  // 피기부자 마커 url
  var overlayContent${i} = document.createElement('div');
  overlayContent${i}.innerHTML = '<img src="' + overlayImageSrc${i} + '" style="width: 100px; height: 110px;">';


  var overlay${i} = new kakao.maps.CustomOverlay({
    position: markerPosition${i},
    content: overlayContent${i},
    yAnchor: 0.95, 
    xAnchor: 0.58  
  });

overlay${i}.setMap(map);

  var iwContent${i} = \`

  <div style="padding:10px; border: 2px solid #FF0000;">
    <div style="display: flex; align-items: center; width: 500px; height:250px;">
      <div style="float: left; width: 50%;">
        <img src="https://i.postimg.cc/d3LL1YD8/happy5.gif" style="width: 230px; height: auto;">
      </div>
        <div style="float: right; width: 50%;">
          <div class="info-title" style="font-size: 28px; text-align: center;">시설 이름: ${location.adName}</div>
          <div style="font-size: 28px; text-align: center;">시설장 이름: ${location.managerName}</div>
          <div style="font-size: 28px; text-align: center;">${phoneNum}</div>
        </div>
      </div>
      <div style="clear: both; text-align: center;">
      <button id="routeButton${i}" style="margin-top: -15px; width: 200px; height: 50px; font-size: 18px; padding: 10px;">길 찾기</button>
      <button id="callButton${i}" style="margin-top: -15px; width: 200px; height: 50px; font-size: 18px; padding: 10px;">전화 걸기</button>
      </div>
  </div>
  \`;

  var infowindow${i} = new kakao.maps.InfoWindow({ content: iwContent${i}, removable: true });

  (function(marker, infowindow, overlayContent, location) {
    var commonClickHandler = function() {
      infowindow.open(map, marker);

      document.getElementById('routeButton${i}').addEventListener('click', function() {
        window.ReactNativeWebView.postMessage('x: ${location.coordinates.x}, y: ${location.coordinates.y}, name: ${location.adName}');
      });

      
      document.getElementById('callButton${i}').addEventListener('click', function() {
        window.ReactNativeWebView.postMessage('phoneNum: ${location.phoneNum}');
      });

    };

    kakao.maps.event.addListener(marker, 'click', function() {
      window.ReactNativeWebView.postMessage('pId: ${location.id}');
    setSelectedMarkerId(location.id);
  });
  
  overlayContent.addEventListener('click', function() {
    window.ReactNativeWebView.postMessage('pId: ${location.id}');
    setSelectedMarkerId(location.id);
  });
  
  })(marker${i}, infowindow${i}, overlayContent${i}, location);
`;
    });

    // Location markers
    resLocations.forEach((location, i) => {
      var phoneNum = location.phoneNum;
      phoneNum =
        phoneNum.slice(0, 3) +
        "-" +
        phoneNum.slice(3, 7) +
        "-" +
        phoneNum.slice(7);

      markersData += `
  var imageSrc${i} = '${location.profileImage}'; 
  var imageSize${i} = new kakao.maps.Size(54, 54);
  var imageOption${i} = { offset: new kakao.maps.Point(33, 95) };
  var markerImage${i} = new kakao.maps.MarkerImage(imageSrc${i}, imageSize${i}, imageOption${i});
  var markerPosition${i} = new kakao.maps.LatLng(${location.coordinates.y}, ${location.coordinates.x}); 
  var marker${i} = new kakao.maps.Marker({ position: markerPosition${i}, image: markerImage${i} });
  marker${i}.setMap(map);

  var overlayImageSrc${i} = 'https://i.postimg.cc/3wgCh3tL/marker03.png';  // 음식 안올린 곳의 마커
  var overlayContent${i} = document.createElement('div');
  overlayContent${i}.innerHTML = '<img src="' + overlayImageSrc${i} + '" style="width: 100px; height: 110px;">';


  var overlay${i} = new kakao.maps.CustomOverlay({
    position: markerPosition${i},
    content: overlayContent${i},
    yAnchor: 0.95, 
    xAnchor: 0.58  
  });

overlay${i}.setMap(map);

  var iwContent${i} = \`

  <div style="padding:10px; border: 2px solid #FF0000;">
    <div style="display: flex; align-items: center; width: 500px; height:250px;">
      <div style="float: left; width: 50%;">
        <img src="https://i.postimg.cc/d3LL1YD8/happy5.gif" style="width: 230px; height: auto;">
      </div>
        <div style="float: right; width: 50%;">
          <div class="info-title" style="font-size: 28px; text-align: center;">식당 이름: ${location.adName}</div>
          <div style="font-size: 28px; text-align: center;">사장 이름: ${location.name}</div>
          <div style="font-size: 28px; text-align: center;">${phoneNum}</div>
        </div>
      </div>
      <div style="clear: both; text-align: center;">
      <button id="routeButton${i}" style="margin-top: -15px; width: 200px; height: 50px; font-size: 18px; padding: 10px;">길 찾기</button>
      </div>
  </div>
  \`;

  var infowindow${i} = new kakao.maps.InfoWindow({ content: iwContent${i}, removable: true });

  (function(marker, infowindow, overlayContent, location) {
    var commonClickHandler = function() {
      infowindow.open(map, marker);
      document.getElementById('routeButton${i}').addEventListener('click', function() {
        window.ReactNativeWebView.postMessage('x: ${location.coordinates.x}, y: ${location.coordinates.y}, name: ${location.adName}');
      });
    };

    kakao.maps.event.addListener(marker, 'click', function() {
      window.ReactNativeWebView.postMessage('id: ${location.id}');
    setSelectedMarkerId(location.id);
  });
  
  overlayContent.addEventListener('click', function() {
    window.ReactNativeWebView.postMessage('id: ${location.id}');
    setSelectedMarkerId(location.id);
  });
  
  })(marker${i}, infowindow${i}, overlayContent${i}, location);
`;
    });

    // Location markers
    foodLocations.forEach((location, i) => {
      var phoneNum = location.foodAddress;
      phoneNum =
        phoneNum.slice(0, 3) +
        "-" +
        phoneNum.slice(3, 7) +
        "-" +
        phoneNum.slice(7);

      markersData += `
  var imageSrc${i} = '${location.foodImage}'; 
  var imageSize${i} = new kakao.maps.Size(54, 54);
  var imageOption${i} = { offset: new kakao.maps.Point(33, 95) };
  var markerImage${i} = new kakao.maps.MarkerImage(imageSrc${i}, imageSize${i}, imageOption${i});
  var markerPosition${i} = new kakao.maps.LatLng(${location.coordinates.y}, ${location.coordinates.x}); 
  var marker${i} = new kakao.maps.Marker({ position: markerPosition${i}, image: markerImage${i} });
  marker${i}.setMap(map);

  var overlayImageSrc${i} = 'https://i.postimg.cc/k5d9NnpJ/marker02.png';  // 기부자 마커 url
  var overlayContent${i} = document.createElement('div');
  overlayContent${i}.innerHTML = '<img src="' + overlayImageSrc${i} + '" style="width: 100px; height: 110px;">';


  var overlay${i} = new kakao.maps.CustomOverlay({
    position: markerPosition${i},
    content: overlayContent${i},
    yAnchor: 0.95, 
    xAnchor: 0.58  
  });

  overlay${i}.setMap(map);

  var overlayImageSrc${i} = 'https://i.postimg.cc/4NyPt6Fg/image.png';
  var overlayContent${i} = document.createElement('div');
  overlayContent${i}.innerHTML = '<img src="' + overlayImageSrc${i} + '" style="width: 180px; height: 160px;">';


  var overlay${i} = new kakao.maps.CustomOverlay({
    position: markerPosition${i},
    content: overlayContent${i},
    yAnchor: 1.03, 
    xAnchor: 0.54  
  });

  overlay${i}.setMap(map);



  var iwContent${i} = \`

  <div style="padding:10px; border: 2px solid #FF0000;">
    <div style="display: flex; align-items: center; width: 500px; height:250px;">
      <div style="float: left; width: 50%;">
        <img src="https://i.postimg.cc/d3LL1YD8/happy5.gif" style="width: 230px; height: auto;">
      </div>
        <div style="float: right; width: 50%;">
          <div class="info-title" style="font-size: 28px; text-align: center;">식당 이름: ${location.foodGiver}</div>
          <div style="font-size: 28px; text-align: center;">사장 이름: ${location.name}</div>
          <div style="font-size: 28px; text-align: center;">${phoneNum}</div>
        </div>
      </div>
      <div style="clear: both; text-align: center;">
      <button id="routeButton${i}" style="margin-top: -15px; width: 200px; height: 50px; font-size: 18px; padding: 10px;">길 찾기</button>
      </div>
  </div>
  \`;

  var infowindow${i} = new kakao.maps.InfoWindow({ content: iwContent${i}, removable: true });

  (function(marker, infowindow, overlayContent, location) {
    var commonClickHandler = function() {
      infowindow.open(map, marker);
      document.getElementById('routeButton${i}').addEventListener('click', function() {
        window.ReactNativeWebView.postMessage('x: ${location.coordinates.x}, y: ${location.coordinates.y}, name: ${location.foodName}');
      });
    };

    kakao.maps.event.addListener(marker, 'click', function() {
      window.ReactNativeWebView.postMessage('foodid: ${location.id}');
    setSelectedMarkerId(location.id);
  });
  
  overlayContent.addEventListener('click', function() {
    window.ReactNativeWebView.postMessage('foodid: ${location.id}');
    setSelectedMarkerId(location.id);
  });
  
  })(marker${i}, infowindow${i}, overlayContent${i}, location);
`;
    });

    return markersData;
  };

  //HTML 생성
  const generateHTML = (markersData, linePathString, showEndRoute) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Kakao 지도 시작하기</title>
  <style>
  html, body {width:100%;height:100%;margin:0;padding:0;} 
  .map_wrap {position:relative;overflow:hidden;width:100%;height:100%;}
  .custom_typecontrol {position:absolute;top:90%;right:10px;overflow:hidden;width:auto;height:30px;margin:0;margin-right:70%;margin-left:30%;padding:0;z-index:1;font-size:30px;font-family:'Malgun Gothic', '맑은 고딕', sans-serif;}
  .custom_typecontrol span {display:block;width:65px;height:30px;float:left;text-align:center;line-height:30px;cursor:pointer;}  
  .radius_border{border:1px solid #919191;border-radius:10px;}
  .custom_typecontrol .selected_btn {width:200px;color:#fff;background:#425470;background:linear-gradient(#425470, #5b6d8a);}
  .custom_typecontrol .selected_btn:hover {color:#fff;} 
  
  .custom_zoomcontrol {position:absolute;top:150px;right:10px;width:36px;height:80px;overflow:hidden;z-index:1;margin-right:50px;background-color:#f5f5f5;} 
  .custom_zoomcontrol span {display:block;width:36px;height:40px;text-align:center;cursor:pointer;}     
  .custom_zoomcontrol span img {width:15px;height:15px;padding:12px 0;border:none;}             
  .custom_zoomcontrol span:first-child{border-bottom:1px solid #bfbfbf;}            
  
  #endRoute {
    display: ${showEndRoute ? "block" : "none"};
  }
  </style>
</head>
<body>
<div class="map_wrap">
  <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div> 
  
</div>
  <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=1d36d8e3148cff96991f68bd2f32c26a"></script>
  <script>
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(${
        currentPosition ? currentPosition.y : locations[0].coordinates.y
      }, ${currentPosition ? currentPosition.x : locations[0].coordinates.x}),
      maxLevel:3,
      minLevel:1,
      level: 1
    };
    var map = new kakao.maps.Map(container, options); //맵 생성
    ${markersData}
  </script>
</body>
</html>
`;

  if (!locations.length || permissionStatus === null) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#44A5FF",
          width: "100%",
          height: "12%",
        }}
      >
        {/* 상단부분 */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#44A5FF",
            width: "100%",
            height: "20%",
            marginTop: "13%",
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
          {/* 등록 버튼 */}
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 10,
              top: 5,
              width: "25%",
              height: "100%",
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleFoodRegistClick}
          >
            <Image
              style={{ width: 90, height: 70 }}
              source={require("../../assets/add.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={{ flex: 1 }}
        onMessage={(event) => {
          const message = event.nativeEvent.data;
          console.log(message);
          if (message.startsWith("phoneNum:")) {
            var phoneNum = message.split(": ")[1];
            callPhone(phoneNum);
          } else if (message.startsWith("foodid")) {
            const id = message.split(": ")[1];
            console.log(id);
            console.log(userInfo);
            navigation.navigate("Mapadd", { id: id, userInfo: userInfo });
          } else if (message.startsWith("id:")) {
            // 마커에서 전달된 id를 사용
            const id = message.split(": ")[1];
            console.log("기부자 Marker ID:", id);
            setSelectedMarkerId(id);
            setModalVisible(true);
          } else if (message.startsWith("pId:")) {
            // 마커에서 전달된 id를 사용
            const id = message.split(": ")[1];
            console.log("피기부자 Marker ID:", id);
            setSelectedMarkerId2(id);
            setModalVisible2(true);
          } else {
            const coordinateStrings = message.split(", ");
            const x = parseFloat(coordinateStrings[0].split(": ")[1]);
            const y = parseFloat(coordinateStrings[1].split(": ")[1]);

            kakaoMap(x, y); // 호출
          }
        }}
        onShouldStartLoadWithRequest={(request) => {
          if (request.url.startsWith("http") && request.url !== "about:blank") {
            Linking.openURL(request.url);
            return false;
          }
          return true;
        }}
      />
      <View style={styles.rootContainer}>
        <BottomsheetMarker
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
          id={selectedMarkerId}
        />
      </View>

      {/* 마커 클릭시 바텀시트2 view */}
      <View style={styles.rootContainer}>
        <BottomsheetMarker2
          modalVisible={modalVisible2}
          setModalVisible={setModalVisible2}
          navigation={navigation}
          id={selectedMarkerId2}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
