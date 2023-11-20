//홈화면
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';


const Home = ({ navigation }) => {

  const [image, setImage] = useState(require('../../assets/policy.png'));
  useEffect(() => {
    const timer = setInterval(() => {
      setImage(prevImage => prevImage === require('../../assets/policy.png')
        ? require('../../assets/policy2.png')
        : require('../../assets/policy.png'));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* 첫번째 라인 */}
      <Image
        style={{ width: '20%', height: '9%', justifyContent: 'flex-start', alignItems: 'center', marginTop: '6%' }}
        source={require('../../assets/logo.png')}
        resizeMode="contain"
      />

      {/* 두번째 라인 */}
      <View style={{ flexDirection: 'row', width: '90%', height: '10%', justifyContent: 'flex-start', alignItems: 'center', bottom: '0%' }}>
        <View style={{ marginLeft: '5%' }}>
          <Text style={{ color: 'blue', fontSize: 22, fontFamily: 'Play-Regular' }}>00 회사</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', fontFamily: 'Play-Bold' }}>최광혁님</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', fontFamily: 'Play-Bold' }}>감사합니다.</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Profiles')}>
            <Image
              style={{ width: 70, height: 90, bottom: '0%', marginLeft: '54%' }}
              source={require('../../assets/profile.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 세번째 라인(기부하기) */}

      <View style={styles.fifthContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('KakaoMap')}>
          <View style={styles.fifthOneContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', top: '12%', left: '3%' }}>
              <Text style={{ fontSize: 22, fontFamily: 'Play-Regular', color: '#6F6A6A', marginRight: '14%' }}>기부 하기</Text>
              <Image
                style={{ width: 50, height: 25, left: '10%' }}
                source={require('../../assets/give.png')}
                resizeMode="contain"
              />
            </View>
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', top: '15%', right: '10%' }}>
              <Image
                style={{ width: 140, height: 145, left: '10%', borderRadius: 30, }}
                source={require('../../assets/map.jpg')}
                resizeMode="cover"
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* 세번째 라인(기부 내역) */}
        <TouchableOpacity onPress={() => navigation.navigate('Donate')}>
          <View style={styles.fifthTwoContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', top: '12%', left: '3%' }}>
              <Text style={{ fontSize: 22, fontFamily: 'Play-Regular', color: '#6F6A6A', marginRight: '40%' }}>기부 내역</Text>
            </View>

            <View style={{ justifyContent: 'flex-start', alignItems: 'center', top: '22%', right: '10%' }}>
              <Image
                style={{ width: 100, height: 100, left: '10%', borderRadius: 30, }}
                source={require('../../assets/givemoneylist.png')}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>


      {/* 네번째 라인 (공지사항) */}
      <View style={styles.fourthContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
          <View style={styles.fourthOneContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', top: '12%', left: '3%' }}>
              <Text style={{ fontSize: 22, fontFamily: 'Play-Regular', color: 'white', marginRight: '14%' }}>공지사항</Text>
              <Image
                style={{ width: 50, height: 25, left: '10%' }}
                source={require('../../assets/notice.png')}
                resizeMode="contain"
              />
            </View>

            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', top: '45%', right: '5%', marginLeft: '2%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Play-Bold', color: 'white' }}>11월 첫째주 기부왕</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Play-Regular', color: 'white' }}>2023.11.10</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* 네번째 라인 (고마운 분들) */}
        <TouchableOpacity onPress={() => navigation.navigate('Thankyou')}>
          <View style={styles.fourthTwoContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', top: '12%', left: '3%' }}>
              <Text style={{ fontSize: 22, fontFamily: 'Play-Regular', color: '#6F6A6A', marginRight: '30%' }}>고마운 분들</Text>
            </View>

            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', bottom: '5%', right: '1%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', top: '40%', right: '5%' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Play-Bold', color: '#6F6A6A', marginRight: '8%' }}>경기</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Play-Regular', color: '#6F6A6A' }}>배달의 민족</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', top: '40%', right: '5%' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Play-Bold', color: '#6F6A6A', marginRight: '8%' }}>서울</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Play-Regular', color: '#6F6A6A' }}>SK 하이닉스</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', top: '40%', right: '5%' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Play-Bold', color: '#6F6A6A', marginRight: '8%' }}>충남</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Play-Regular', color: '#6F6A6A' }}>후라이드참···</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* 다섯번째 라인 */}
      <View style={styles.thirdContainer}>
        <Image source={image} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      </View>


      {/* 마지막 라인(광고) */}
      <Image
        style={{ width: '100%', height: '15%' }}
        source={require('../../assets/ad.png')}
        resizeMode="contain"
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFAFC'
  },

  thirdContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '17%',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },

  fourthContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '19%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  fourthOneContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    bottom: '0%',
    backgroundColor: '#44A5FF',
    borderRadius: 30,
    marginRight: 15,
  },

  fourthTwoContainer: {
    width: '90%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    bottom: '0%',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginLeft: 14,
  },

  fifthContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '25%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '5%'
  },

  fifthOneContainer: {
    width: '99%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginRight: 15,
    marginTop: 25
  },

  fifthTwoContainer: {
    width: '84.5%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginLeft: 14,
    marginTop: 25,
    right: '1%'
  },

  lineStyle: {
    height: 1, // 선의 두께
    backgroundColor: "#44A5FF", // 선의 색상
    width: '100%', // 선의 길이
    marginBottom: '3%'
  }

})



export default Home;