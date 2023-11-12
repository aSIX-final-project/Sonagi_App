import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Platform } from 'react-native';



const Profiles = () => {

  // 고객센터 연결하기 기능
  const CenterPhone = () => {
    
  }

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#44A5FF', width: '100%', height: '40%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
        {/* 상단부분 */}
        <View style={{flexDirection: 'row', alignItems: 'center',  backgroundColor: '#44A5FF', width: '100%', height: '17%', marginTop: '10%'}}>
          <TouchableOpacity style={{ marginLeft: '6%', marginRight: '2%'}} onPress={() => navigation.navigate('Profiles')}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require('../assets/backkey.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: 'white' }}>프로필</Text>
          <TouchableOpacity style={{ marginTop: '2%',marginLeft: '36%', width: '25%', height: '70%', backgroundColor: '#6DB9FF', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Profiles')}>
            <Text style={{ fontFamily: 'Play-Bold', fontSize: 20, color: 'white' }}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        {/* 프로필 부분 */}
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:'10%' }}>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate('Profiles')}>
              <Image
                style={{ width: 90, height: 90 }}
                source={require('../assets/profileedit.png')}
                resizeMode="contain"
              />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: 'white', marginTop: '2%' }}>최광혁 대표님</Text>
          <Text style={{ fontFamily: 'Play-Regular', fontSize: 20, color: 'white',  marginTop: '1%' }}>주식회사 야놀자</Text>

        </View>
      </View>
      
      {/* 중앙 부분 */}

      {/* 고객센터 */}
      <View style={{flexDirection: 'row', marginTop: '10%', width: '88%', height: '10%', backgroundColor: '#E1F1FF', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 65, height: 65, marginRight: '7%', marginLeft: '0%' }}
          source={require('../assets/call.png')}
          resizeMode="contain"
        />
        
        <Text style={{ fontFamily: 'Play-Bold', fontSize: 23, color: '#8B8E90', marginRight:'25%' }}>고객센터 연결</Text>
        
        <TouchableOpacity style={{ }} onPress={() => navigation.navigate('Profiles')}>
          <Image
            style={{ width: 35, height: 35 }}
            source={require('../assets/next.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* 비밀번호 변경 */}
      <View style={{flexDirection: 'row', marginTop: '5%', width: '88%', height: '10%', backgroundColor: '#E1F1FF', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 65, height: 65, marginRight: '7%', marginLeft: '0%' }}
          source={require('../assets/pwchange.png')}
          resizeMode="contain"
        />
        
        <Text style={{ fontFamily: 'Play-Bold', fontSize: 23, color: '#8B8E90', marginRight:'25%' }}>비밀번호 변경</Text>
        
        <TouchableOpacity style={{ }} onPress={() => navigation.navigate('Profiles')}>
          <Image
            style={{ width: 35, height: 35 }}
            source={require('../assets/next.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* 시설 소개 */}
      <View style={{flexDirection: 'row', marginTop: '5%', width: '88%', height: '10%', backgroundColor: '#E1F1FF', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 65, height: 65, marginRight: '7%', marginLeft: '0%' }}
          source={require('../assets/introduce2.png')}
          resizeMode="contain"
        />
        
        <Text style={{ fontFamily: 'Play-Bold', fontSize: 23, color: '#8B8E90', marginRight:'34%' }}>시설 소개</Text>
        
        <TouchableOpacity style={{ }} onPress={() => navigation.navigate('Profiles')}>
          <Image
            style={{ width: 35, height: 35 }}
            source={require('../assets/next.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFAFC'
  }
});
export default Profiles