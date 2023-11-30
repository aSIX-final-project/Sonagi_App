import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Platform, Modal, ScrollView } from 'react-native';
import BottomsheetDel from './BottomsheetDel';


const SendReqp = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const pressButton = () => {
        setModalVisible(true);
      }

  return (
    <View style={styles.container}>

      <View style={{ backgroundColor: '#44A5FF', width: '100%', height: '40%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        {/* 상단부분 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#44A5FF', width: '100%', height: '17%', marginTop: '10%' }}>
          <TouchableOpacity style={{ marginLeft: '6%', marginRight: '2%' }} onPress={() => navigation.navigate('Homep')}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require('../../assets/backkey.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: 'white' }}>보낸 요청</Text>

        </View>

        {/* 프로필 부분 */}
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate('')}>
            <Image
              style={{ width: 90, height: 90 }}
              source={require('../../assets/profileremove.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: 'white', marginTop: '2%' }}>최광혁 님</Text>
          <Text style={{ fontFamily: 'Play-Regular', fontSize: 20, color: 'white', marginTop: '1%' }}>OO 보육시설</Text>
        </View>
      </View>

      {/* 중앙 부분 */}
      <Text style={{ fontFamily: 'Play-Regular', fontSize: 18, color: '#8B8E90', marginTop: '5%', marginRight: '45%' }}>총 30건의 보낸 요청이 있습니다.</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#7D7D7D', width: '89.5%', marginTop: '1.5%' }} />

      <ScrollView style={{ backgroundColor: 'white', width: '89.5%', height: '80%' }}>
        <View style={{flexDirection: 'row'}} >
            <Text style={{ fontFamily: 'Play-Bold', fontSize: 20, color: '#656565', marginTop: '2%' }}>[이모네밥] 김치 200인분</Text>
            <TouchableOpacity style={{ marginLeft: '50%', marginTop: '2.5%' }} onPress={pressButton}>
                <Image
                    style={{ width: 15, height: 15 }}
                    source={require('../../assets/motifydelete.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
        <Text style={{ fontFamily: 'Play-Regular', fontSize: 15, color: '#8B8E90', marginTop: '1%' }}>2023.11.06</Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#DBDBDB', width: '100%', marginTop: '5%' }} />
      
      </ScrollView>

      {/* 마지막 라인(광고) */}
      <Image
        style={{ width: '100%', height: '6.4%', marginTop: '9%' }}
        source={require('../../assets/ad.png')}
        resizeMode="contain"
      />

      {/* 바텀시트 view */}
      <View style={styles.rootContainer}>
        <BottomsheetDel
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
    backgroundColor: 'white'
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

  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SendReqp