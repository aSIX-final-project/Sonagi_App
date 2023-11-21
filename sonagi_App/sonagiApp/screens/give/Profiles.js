import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Platform, Modal } from 'react-native';



const Profiles = ({ navigation }) => {

  // 고객센터 연결하기 기능
  const CenterPhone = () => {

  }

  // 로그아웃 버튼을 눌렀을때 값을 서버에 보냄
  const [isLogoutSuccessModalVisible, setLogoutSuccessModalVisible] = useState(false); // 모달 알림창의 상태

  const handleLogoutButtonClick = () => {
    setLogoutSuccessModalVisible(true); // 가입 버튼 클릭 시 모달 표시

    // 2초 후에 모달 숨김
    setTimeout(() => {
      setLogoutSuccessModalVisible(false);
      navigation.navigate('Login'); // 메인화면으로 이동
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* 로그인 완료 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLogoutSuccessModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{ width: 130, height: 130, bottom: '0.5%', right: '0%' }}
              source={require('../../assets/logoutsuccess.png')}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => setLogoutSuccessModalVisible(false)} // 모달 내부의 버튼 클릭 시 모달 숨김
            ></TouchableOpacity>
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
          <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: 'white' }}>프로필</Text>
          <TouchableOpacity style={{ marginTop: '2%', marginLeft: '36%', width: '25%', height: '70%', backgroundColor: '#6DB9FF', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }} onPress = { handleLogoutButtonClick }>
            <Text style={{ fontFamily: 'Play-Bold', fontSize: 20, color: 'white' }}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        {/* 프로필 부분 */}
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate('')}>
            <Image
              style={{ width: 90, height: 90 }}
              source={require('../../assets/profileedit.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: 'white', marginTop: '2%' }}>최광혁 님</Text>
          <Text style={{ fontFamily: 'Play-Regular', fontSize: 20, color: 'white', marginTop: '1%' }}>주식회사 야놀자</Text>

        </View>
      </View>

      {/* 중앙 부분 */}

      {/* 고객센터 */}
      <View style={{ flexDirection: 'row', marginTop: '10%', width: '88%', height: '10%', backgroundColor: '#E1F1FF', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 65, height: 65, marginRight: '7%', marginLeft: '0%' }}
          source={require('../../assets/call.png')}
          resizeMode="contain"
        />

        <Text style={{ fontFamily: 'Play-Bold', fontSize: 23, color: '#8B8E90', marginRight: '25%' }}>고객센터 연결</Text>

        <TouchableOpacity style={{}} onPress={CenterPhone}>
          <Image
            style={{ width: 35, height: 35 }}
            source={require('../../assets/next.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* 비밀번호 변경 */}
      <View style={{ flexDirection: 'row', marginTop: '5%', width: '88%', height: '10%', backgroundColor: '#E1F1FF', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 65, height: 65, marginRight: '7%', marginLeft: '0%' }}
          source={require('../../assets/pwchange.png')}
          resizeMode="contain"
        />

        <Text style={{ fontFamily: 'Play-Bold', fontSize: 23, color: '#8B8E90', marginRight: '25%' }}>비밀번호 변경</Text>

        <TouchableOpacity style={{}} onPress={() => navigation.navigate('ChangePw')}>
          <Image
            style={{ width: 35, height: 35 }}
            source={require('../../assets/next.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* 시설 소개 */}
      <View style={{ flexDirection: 'row', marginTop: '5%', width: '88%', height: '10%', backgroundColor: '#E1F1FF', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 65, height: 65, marginRight: '7%', marginLeft: '0%' }}
          source={require('../../assets/introduce2.png')}
          resizeMode="contain"
        />

        <Text style={{ fontFamily: 'Play-Bold', fontSize: 23, color: '#8B8E90', marginRight: '23%' }}>시설 정보 변경</Text>

        <TouchableOpacity style={{}} onPress={() => navigation.navigate('ChangeInfo')}>
          <Image
            style={{ width: 35, height: 35 }}
            source={require('../../assets/next.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {/* 마지막 라인(광고) */}
      <Image
        style={{ width: '100%', height: '15%', marginTop: '22%' }}
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
export default Profiles