import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { Linking } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [locations, setLocations] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [locationSubscription, setLocationSubscription] = useState(null);

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
    const res = await axios.get('http://172.16.102.57:8888/boot/member/findAll'); //스프링 부트 : db에서 값 가져오기

    //마커 찍을 좌표값 가져오기
    const fetchPromises = res.data.list.map(async item => {
      const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${item.address}`, {
        headers: {
          Authorization: 'KakaoAK db06c51425b99419a11f3881f8491642'
        }
      });
      const data = await response.json();
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
      `;
    }
    locations.forEach((location, i) => {
      markersData += `
        var markerPosition${i} = new kakao.maps.LatLng(${location.coordinates.y}, ${location.coordinates.x}); 
        var marker${i} = new kakao.maps.Marker({ position: markerPosition${i} });
        marker${i}.setMap(map);
  
        var iwContent${i} = '<div style="padding:5px;">시설명: ${location.adName}</div><div>시설장 이름: ${location.managerName}</div><a href="${location.homepage}">${location.homepage}</a><div>${location.phoneNum}</div>';
        var infowindow${i} = new kakao.maps.InfoWindow({ content: iwContent${i}, removable: true });
  
        kakao.maps.event.addListener(marker${i}, 'click', function() {
          infowindow${i}.open(map, marker${i});  
        });
      `;
    });
    return markersData;
  };

  
  //HTML 생성
  const generateHTML = (markersData) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <title>Kakao 지도 시작하기</title>
    </head>
    <body>
      <div id="map" style="width:1000px;height:1000px;"></div>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=1d36d8e3148cff96991f68bd2f32c26a"></script>
      <script>
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(${currentPosition ? currentPosition.y : locations[0].coordinates.y}, ${currentPosition ? currentPosition.x : locations[0].coordinates.x}),
          level: 3
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

  const markersData = makeMarkersData();
  const html = generateHTML(markersData);

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html }}
      style={{ flex: 1 }}
      onShouldStartLoadWithRequest={(request) => {
        if (request.url.startsWith('http') && request.url !== 'about:blank') {
          Linking.openURL(request.url);
          return false;
        }
        return true;
      }}
    />
  );
}
