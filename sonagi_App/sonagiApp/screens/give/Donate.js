import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Platform, Modal, ScrollView, TextInput } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const Donate = ({ navigation }) => {

  const [isReviewModalVisible, setReviewModalVisible] = useState(false);

  // 모달 상태
  const [isModalVisible, setModalVisible] = useState(false);

  // 카메라 버튼 클릭 핸들러
  const handleButtonClick = () => {
    console.log('sucess');
    setModalVisible(true);
  };



  return (
    <View style={styles.container}>

      {/* 리뷰 보기 모달 관련 코드 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isReviewModalVisible}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            
            <TouchableOpacity style={{ width: '10%', height: '10%', left: '48%' }} onPress={() => setReviewModalVisible(false)}>
              <View style={{ marginBottom: '10%' }}>
                <Image
                  style={{ width: 20, height: 20, }}
                  source={require('../../assets/cancle.png')}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <View style={{ marginBottom: '10%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: '#656565' }}>두꺼비 식당 대표님 감사합니다.</Text>
              <Text style={{ fontFamily: 'Play-Bold', fontSize: 20, color: '#656565' }}>2023.11.06</Text>
            </View>

            {/* 선 긋기 */}
            <View style={styles.lineStyle} />

            <View style={{ width: '98%', height: '35%', marginTop: '5%' }}>
              <Image
                style={{ width: '100%', height: '100%', }}
                source={require('../../assets/donateimage.png')}
                resizeMode="contain"
              />
              <Text style={{ fontFamily: 'Play-Regular', fontSize: 20, color: '#A9A9A9', marginTop: '10%' }}>정말 맛있게 먹었어요.</Text>
            </View>
          </View>
        </View>
      </Modal>


      {/* 기부내역 보기 모달 관련 코드 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <TouchableOpacity style={{ width: '10%', height: '10%', left: '48%' }} onPress={() => setModalVisible(false)}>
              <View style={{ marginBottom: '10%' }}>
                <Image
                  style={{ width: 20, height: 20, }}
                  source={require('../../assets/cancle.png')}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <View style={{ marginBottom: '10%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: '#656565' }}>명륜 보육원 기부</Text>
              <Text style={{ fontFamily: 'Play-Bold', fontSize: 20, color: '#656565' }}>2023.11.06</Text>
            </View>


            {/* 선 긋기 */}
            <View style={styles.lineStyle} />

            <View style={{ width: '98%', height: '35%', marginTop: '5%' }}>
              <Image
                style={{ width: '100%', height: '100%', }}
                source={require('../../assets/donateimage.png')}
                resizeMode="contain"
              />
              <Text style={{ fontFamily: 'Play-Regular', fontSize: 20, color: '#A9A9A9', marginTop: '10%' }}>기부 내역 : 시금치 30인분</Text>

              <TouchableOpacity style={{ marginTop: '17%', backgroundColor: '#44A5FF', width: '100%', height: '32%', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}
               onPress={() => {
                  setModalVisible(false);
                  setTimeout(() => {
                  setReviewModalVisible(true);
                }, 500); // 500ms 후에 실행
              }}>
                <Text style={{ fontFamily: 'Play-Regular', fontSize: 21, color: '#FFFFFF'}}>리뷰 보기</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </Modal>


      <View style={{ backgroundColor: '#44A5FF', width: '100%', height: '40%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        {/* 상단부분 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#44A5FF', width: '100%', height: '17%', marginTop: '10%' }}>
          <TouchableOpacity style={{ marginLeft: '6%', marginRight: '2%' }} onPress={() => navigation.navigate('Home')}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require('../../assets/backkey.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: 'white' }}>기부 내역</Text>

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
          <Text style={{ fontFamily: 'Play-Regular', fontSize: 20, color: 'white', marginTop: '1%' }}>이모네밥 사장님</Text>
        </View>
      </View>

      {/* 중앙 부분 */}
      <Text style={{ fontFamily: 'Play-Regular', fontSize: 18, color: '#8B8E90', marginTop: '5%', marginRight: '40%' }}>총 30건의 기부한 내역이 있습니다.</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#7D7D7D', width: '89.5%', marginTop: '1.5%' }} />

      <ScrollView style={{ backgroundColor: '#FFFFFF', width: '89.5%', height: '80%' }}>
        <Text onPress={handleButtonClick} style={{ fontFamily: 'Play-Bold', fontSize: 20, color: '#656565', marginTop: '2%' }}>[명륜 보육원]100,000,000원</Text>
        <Text style={{ fontFamily: 'Play-Regular', fontSize: 15, color: '#8B8E90', marginTop: '1%' }}>2023.11.06</Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#DBDBDB', width: '100%', marginTop: '5%' }} />
      </ScrollView>

      {/* 마지막 라인(광고) */}
      <Image
        style={{ width: '100%', height: '6.4%', marginTop: '9%' }}
        source={require('../../assets/ad.png')}
        resizeMode="contain"
      />
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff'
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
  modalView2: {
    width: '85%',
    height: '60%',
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
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  lineStyle: {
    borderColor: '#DBDBDB',
    borderWidth: 1,
    width: '98%'
  },

  input: {
    width: '88%',
    height: 45,
    borderColor: '#B8DDFF',
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    marginVertical: 5,
    borderRadius: 4,
    fontSize: 20,
},
});
export default Donate