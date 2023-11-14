import React, { useState } from 'react';
import { Alert, Button, Linking, Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [showWebview, setShowWebview] = useState(false);

  const openKakaoNavi = () => {
    const scheme = Platform.OS === 'ios' ? 'https:kakaonavi-sdk://navigate' : 'kakaonavi://navigate';
    const url = `${scheme}?appkey=ef1cc0a4bb551f699f8fa932a5cae877&destination=37.402056,127.108212&name=카카오 판교오피스&coordType=wgs84`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          setShowWebview(true);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open KakaoNavi" onPress={openKakaoNavi} />
      {showWebview && (
        <WebView
          originWhitelist={['*']}
          source={{ uri: 'https://map.kakao.com/' }}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
}