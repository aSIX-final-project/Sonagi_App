//홈화면
import React from 'react';
import { View,Text } from 'react-native';
import KakaoMap from './KakaoMap';
import KakaoNavigation from './KakaoNavigation';


export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <KakaoMap />
    </View>
  );
}