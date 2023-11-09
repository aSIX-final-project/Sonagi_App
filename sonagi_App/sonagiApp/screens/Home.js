//홈화면
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';


const Home = () => {


  return (

    
    <View style={styles.container}>
      {/* 첫번째 라인 */}
      <Image
        style={{ width: '25%', height: '9%', justifyContent: 'flex-start', alignItems: 'center', bottom: '0%', backgroundColor: 'lightblue' }}
        source={require('../assets/blacklogo.png')}
        resizeMode="contain"
      />

      {/* 두번째 라인 */}

      <View style={{ flexDirection: 'row', width: '100%', height: '10%', justifyContent: 'flex-start', alignItems: 'center', bottom: '0%', backgroundColor: 'lightgreen' }}>
        <View style={{ marginLeft: '10%' }}>
          <Text style={{ color: 'blue', fontSize: 22}}>00 회사</Text>
          <Text style={{ fontSize: 32 }}>최광혁님</Text>
          <Text style={{ fontSize: 32 }}>감사합니다.</Text>
        </View>

        <View>
          <Image
            style={{ width: 70, height: 90, bottom: '0%', marginLeft: '55%' }}
            source={require('../assets/profile.png')}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* 세번째 라인 */}
      <View style={{ flexDirection: 'row', width: '100%', height: '17%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'lightyellow' }}>
          <View style={{flexDirection: 'row', left: '10%'}}>
            <Image
              style={{ width: 90, height: 90, top: '12%', marginRight: '7%' }}
              source={require('../assets/moneygage.png')}
              resizeMode="contain"
            />
            <View style={{ flexDirection: 'columm', left: '15%'}}>
              <Image
                style={{ width: 110, height: 50, bottom: '0%', marginLeft: '0%' }}
                source={require('../assets/lastmoney.png')}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 25 }}>100,000,000 원</Text>
              <Image
                style={{ width: 110, height: 50, bottom: '0%', marginLeft: '0%' }}
                source={require('../assets/last2money.png')}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 25 }}>100,000,000 원</Text>
            </View>
          </View>
        </View>

        {/* 네번째 라인 */}
        <View style={{ flexDirection: 'row', width: '100%', height: '20%', justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={{ width: '50%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', bottom: '0%', backgroundColor: 'lightblue' }}>

          </View>

          <View style={{ width: '50%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', bottom: '0%', backgroundColor: 'lightgreen' }}>

          </View>
        </View>

        {/* 다섯번째 라인 */}
        <View style={{ flexDirection: 'row', width: '100%', height: '20%', justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={{ width: '50%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', bottom: '0%', backgroundColor: 'lightpink' }}>

          </View>

          <View style={{ width: '50%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', bottom: '0%', backgroundColor: 'purple' }}>

          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFC'
  },
})



export default Home;