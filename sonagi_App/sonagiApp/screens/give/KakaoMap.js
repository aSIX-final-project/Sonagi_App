import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { Linking, View, TouchableOpacity, Image, Text, handleLogoutButtonClick, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import RegistGive from './Registgive';
// 바텀시트 (마커 클릭시 뜸)
import BottomsheetMarker from './BottomsheetMarker';

export default function App({ navigation }) {

  // 마커 클릭했을때 바텀시트
  const [modalVisible, setModalVisible] = useState(false);
  const pressButton = () => {
    setModalVisible(true);
  }


  // 등록 버튼 클릭
  const RegistGive = () => {
    navigation.navigate('RegistGive');
  }

  // 기부 요청목록 버튼 클릭
  const GiveReq = () => {
    navigation.navigate('GiveReq');
  }

  const [locations, setLocations] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [markerCoordinates, setMarkerCoordinates] = useState({ x: null, y: null });
  const [html, setHtml] = useState(''); // html 상태 변수 추가
  const [showEndRoute, setShowEndRoute] = useState(null);

  const fetchDirections = async () => {
    if (markerCoordinates.x !== null && markerCoordinates.y !== null) {
      const REST_API_KEY = 'db06c51425b99419a11f3881f8491642';
      const url = 'https://apis-navi.kakaomobility.com/v1/directions';

      const origin = `${currentPosition.x},${currentPosition.y}`;
      const destination = `${markerCoordinates.x},${markerCoordinates.y}`;

      const headers = {
        Authorization: `KakaoAK ${REST_API_KEY}`,
        'Content-Type': 'application/json'
      };

      const queryParams = new URLSearchParams({
        origin: origin,
        destination: destination
      });

      const requestUrl = `${url}?${queryParams}`;

      try {
        const response = await fetch(requestUrl, {
          method: 'GET',
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);


        const linePath = [];
        const routes = data.routes;
        routes.forEach(route => {
          const sections = route.sections;
          sections.forEach(section => {
            console.log(section);

            const roads = section.roads;
            roads.forEach(road => {
              for (let i = 0; i < road.vertexes.length; i += 2) {

                linePath.push({ x: road.vertexes[i], y: road.vertexes[i + 1] });
              }
            });
          });
          console.log(linePath.length);

          console.log(linePath);

          const summary = route.summary;
          console.log(summary);
        });

        // linePath를 JSON 문자열로 변환
        const showEndRoute = linePath.length > 0;
        if (linePath.length > 0) {
          setShowEndRoute(true);
        } else {
          setShowEndRoute(false);
        }
        const linePathString = JSON.stringify(linePath);

        // 마커 데이터 생성
        const markersData = makeMarkersData();
        // WebView HTML에 linePath 추가
        const html = generateHTML(markersData, linePathString, showEndRoute);
        setHtml(html);

      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    if (currentPosition && locations.length > 0) {
      const markersData = makeMarkersData();
      const html = generateHTML(markersData, "[]");
      setHtml(html);
    }
  }, [currentPosition, locations]);

  useEffect(() => {
    fetchDirections();
  }, [markerCoordinates]);


  //렌더링 될 때 실행
  useEffect(() => {
    requestLocationPermission();
  }, []);

  //permissionStatus가 바뀔 때마다 실행
  useEffect(() => {
    if (permissionStatus !== null) {
      fetchData();
    }
  }, [permissionStatus]);


  //위치 권한 요청
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
    if (status === 'granted') {
      const subscription = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 100, //위치 정보 업데이트 거리 (10m)
      }, updateCurrentPosition);
      setLocationSubscription(subscription);
    }
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
    const res = await axios.get('https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/member/findAll'); //스프링 부트 : db에서 값 가져오기
    console.log(res);
    //마커 찍을 좌표값 가져오기
    const fetchPromises = res.data.list.map(async item => {
      const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${item.address}`, {
        headers: {
          Authorization: 'KakaoAK db06c51425b99419a11f3881f8491642'
        }
      });
      const data = await response.json();
      console.log("123");
      console.log(data);
      const { x, y } = data.documents[0].road_address || data.documents[0].address;
      return { ...item, coordinates: { x, y } };
    });
    const locations = await Promise.all(fetchPromises);
    setLocations(locations);
  };


  //마커 데이터 생성
  const makeMarkersData = () => {
    let markersData = '';
    if (currentPosition) {
      markersData += `
        var currentMarkerPosition = new kakao.maps.LatLng(${currentPosition.y}, ${currentPosition.x}); 
        var currentMarker = new kakao.maps.Marker({ position: currentMarkerPosition });
        currentMarker.setMap(map);

        var currentMarkerInfoWindow = new kakao.maps.InfoWindow({ content: '<div style="padding:5px;">현위치</div>' });
        kakao.maps.event.addListener(currentMarker, 'click', function() {
          currentMarkerInfoWindow.open(map, currentMarker);
        });
      `;
    }
    locations.forEach((location, i) => {
      markersData += `
        var markerPosition${i} = new kakao.maps.LatLng(${location.coordinates.y}, ${location.coordinates.x}); 
        var marker${i} = new kakao.maps.Marker({ position: markerPosition${i} });
        marker${i}.setMap(map);

        var iwContent${i} = '<div style="padding:5px;">시설명: ${location.adName}</div><div>시설장 이름: ${location.managerName}</div><a href="${location.homepage}">${location.homepage}</a><div>${location.phoneNum}</div><button id="routeButton${i}" style="margin-top: 5px;">길 찾기</button>';
        
        var infowindow${i} = new kakao.maps.InfoWindow({ content: iwContent${i}, removable: true });

        kakao.maps.event.addListener(marker${i}, 'click', function() {
          infowindow${i}.open(map, marker${i});  
          document.getElementById('routeButton${i}').addEventListener('click', function() {
            window.ReactNativeWebView.postMessage('x: ${location.coordinates.x}, y: ${location.coordinates.y}');
          });
        });
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
        display: ${showEndRoute ? 'block' : 'none'};
      }
      </style>
    </head>
    <body>
    <div class="map_wrap">
      <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div> 
      <!-- 지도타입 컨트롤 div 입니다 -->
      <div class="custom_typecontrol radius_border">
        <span id="endRoute" class="selected_btn" onclick="endRoute()">길찾기 종료</span>
      </div>
      
      <!-- 지도 확대, 축소 컨트롤 div 입니다 -->
      <!-- <div class="custom_zoomcontrol radius_border"> 
          <span onclick="zoomIn()"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대"></span>  
          <span onclick="zoomOut()"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소"></span>
      </div> -->
    </div>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=1d36d8e3148cff96991f68bd2f32c26a"></script>
      <script>
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(${currentPosition ? currentPosition.y : locations[0].coordinates.y}, ${currentPosition ? currentPosition.x : locations[0].coordinates.x}),
          maxLevel:8,
          minLevel:0,
          level: 2
        };
        var map = new kakao.maps.Map(container, options); //맵 생성
        ${markersData}
        
        // linePath에 저장된 좌표를 바탕으로 Polyline 그리기
        var linePath = ${linePathString}.map(coord => new kakao.maps.LatLng(coord.y, coord.x));
        var polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 10,
          strokeColor: '#FF0000',
          strokeOpacity: 0.7,
          strokeStyle: 'solid'
        });
        polyline.setMap(map);

        document.getElementById('endRoute').addEventListener('click', function() {
          polyline.setMap(null);
          document.getElementById('endRoute').style.display = 'none'; // 추가된 코드
          window.ReactNativeWebView.postMessage('endRoute');
        });
        
        function zoomIn() {
          map.setLevel(map.getLevel() - 1);
        }
      
        // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
        function zoomOut() {
            map.setLevel(map.getLevel() + 1);
        }
      </script>
    </body>
    </html>
  `;

  if (!locations.length || permissionStatus === null) {
    return null;
  }


  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#44A5FF', width: '100%', height: '12%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        {/* 상단부분 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#44A5FF', width: '100%', height: '20%', marginTop: '13%' }}>
          <TouchableOpacity style={{ marginLeft: '6%', marginRight: '2%' }} onPress={() => navigation.navigate('Home')}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require('../../assets/backkey.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>


          {/* (마커 클릭했을때) */}
          <TouchableOpacity style={{ marginTop: '2%', marginRight: '13%', width: '25%', height: '100%', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }} onPress={pressButton}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require('../../assets/deliver.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* 기부요청 목록 */}
          <TouchableOpacity style={{ marginTop: '2%', marginRight: '2%', backgroundColor: '#68B7FF', marginLeft: '0%', width: '11%', height: '200%', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }} onPress={GiveReq}>
            <Image
              style={{ width: 35, height: 35 }}
              source={require('../../assets/star.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* 등록 버튼 */}
          <TouchableOpacity style={{ marginTop: '2%', marginLeft: '0%', width: '25%', height: '100%', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }} onPress={RegistGive}>
            <Image
              style={{ width: 90, height: 70 }}
              source={require('../../assets/add.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>


        </View>

      </View>

      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={{ flex: 1 }}
        onMessage={(event) => {
          const message = event.nativeEvent.data;
          console.log(message);
          if (message === 'endRoute') {
            setMarkerCoordinates({ x: null, y: null });
            setShowEndRoute(false);
          } else {
            const coordinateStrings = message.split(', ');
            const x = parseFloat(coordinateStrings[0].split(': ')[1]);
            const y = parseFloat(coordinateStrings[1].split(': ')[1]);
            setMarkerCoordinates({ x, y });
          }
        }}
        onShouldStartLoadWithRequest={(request) => {
          if (request.url.startsWith('http') && request.url !== 'about:blank') {
            Linking.openURL(request.url);
            return false;
          }
          return true;
        }}
      />

      {/* 마커 클릭시 바텀시트 view */}
      <View style={styles.rootContainer}>
        <BottomsheetMarker
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
      alignItems: 'center',
      backgroundColor: '#FFFFFF'
  },
  rootContainer: {
      justifyContent: "center",
      alignItems: "center",
  }
});