import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Platform, Modal } from 'react-native';



const Thankyou = ({ navigation }) => {

  return (
    <View style={styles.container}>

      <View style={{ backgroundColor: '#44A5FF', width: '100%', height: '40%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        {/* 상단부분 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#44A5FF', width: '100%', height: '17%', marginTop: '10%' }}>
          <TouchableOpacity style={{ marginLeft: '6%', marginRight: '2%' }} onPress={() => navigation.navigate('Home')}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require('../assets/backkey.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: 'white' }}>고마운 분들</Text>

        </View>

        {/* 프로필 부분 */}
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate('')}>
            <Image
              style={{ width: 90, height: 90 }}
              source={require('../assets/profileremove.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: 'white', marginTop: '2%' }}>최광혁 대표님</Text>
          <Text style={{ fontFamily: 'Play-Regular', fontSize: 20, color: 'white', marginTop: '1%' }}>주식회사 야놀자</Text>
        </View>

        <View style={{ marginLeft: '5%', marginTop: '7%', borderRadius: 50, borderWidth: 2, borderColor: '#44A5FF', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '90%', height: '28%', backgroundColor: '#E1F1FF' }}>

          {/* 1등 랭킹 */}
          <View style={{ flexDirection: 'column', marginRight: '3%', marginLeft: '7%', }}>
            <Text style={{ fontFamily: 'Play-Regular', fontSize: 16, color: '#0085FF', marginLeft: '0%', marginBottom: '5%' }}>오늘의 집</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://ohou.se/')}>
              <Image
                style={{ width: 45, height: 45, marginLeft: '6%' }}
                source={require('../assets/todayhouse.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={{ borderLeftWidth: 1, borderLeftColor: '#C9E6FF', height: '70%' }} />

          {/* 2등 랭킹 */}
          <View style={{ flexDirection: 'column', marginRight: '1%', marginLeft: '7%', }}>
            <Text style={{ fontFamily: 'Play-Regular', fontSize: 16, color: '#0085FF', marginLeft: '0%', marginBottom: '5%' }}>배달의 민족</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.baemin.com/')}>
              <Image
                style={{ width: 45, height: 45, marginLeft: '10%' }}
                source={require('../assets/deliver.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={{ borderLeftWidth: 1, borderLeftColor: '#C9E6FF', height: '70%' }} />

          {/* 3등 랭킹 */}
          <View style={{ flexDirection: 'column', marginRight: '3%', marginLeft: '7%', }}>
            <Text style={{ fontFamily: 'Play-Regular', fontSize: 16, color: '#0085FF', marginLeft: '0%', marginBottom: '5%' }}>배달의 민족</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.yanolja.com/')}>
              <Image
                style={{ width: 45, height: 45, marginLeft: '10%' }}
                source={require('../assets/deliver.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

      </View>

      {/* 중앙 부분 */}

      {/* 1 */}
      <View style={{ marginTop: '23%', width: '88%', height: '8%', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => Linking.openURL('https://ohou.se/')}>
          <Image
            style={{ width: 350, height: 130 }}
            source={require('../assets/todayhousead.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* 2 */}
      <View style={{ marginTop: '5%', width: '88%', height: '8%', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.baemin.com/')}>
          <Image
            style={{ width: 350, height: 130 }}
            source={require('../assets/deliverad.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* 3 */}
      <View style={{ marginTop: '5%', width: '88%', height: '8%', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.yanolja.com/')}>
          <Image
            style={{ width: 350, height: 130 }}
            source={require('../assets/yanoljaad.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* 4 */}
      <View style={{ marginTop: '5%', width: '88%', height: '8%', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.zigbang.com/')}>
          <Image
            style={{ width: 350, height: 130 }}
            source={require('../assets/zigbangad.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* 마지막 라인(광고) */}
      <Image
        style={{ width: '100%', height: '7%', marginTop: '9%' }}
        source={require('../assets/ad.png')}
        resizeMode="contain"
      />
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFAFC'
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});
export default Thankyou