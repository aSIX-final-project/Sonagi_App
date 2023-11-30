import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Platform, Modal, ScrollView, TouchableWithoutFeedback, Keyboard, TextInput, KeyboardAvoidingView } from 'react-native';
import BottomsheetModDel from './BottomsheetModDel';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';


const Donatep = ({ navigation, route }) => {
  const [selectedValue, setSelectedValue] = useState("value1");
  const [donations, setDonations] = useState([]);
  const [image, setImage] = useState(null);
  const { userInfo } = route.params;

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('갤러리 접근 권한이 허용되지 않았습니다.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };






  // 바텀시트 (삭제, 수정)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  // 삭제 수정 버튼 클릭
  const pressButton = () => {
    setModalVisible(true);
  }

  return (

    <View style={styles.container}>

      {/* 글쓰기 모달 관련 코드 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible3}
      >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView3}>
            <View style={styles.modalView3}>
              {/* 게시판 모달 관련 코드 */}
              <TouchableOpacity style={{ marginTop: '5%', marginBottom: '2%', width: '10%', height: '5%', left: '45%', }} onPress={() => setModalVisible3(false)}>
                <View style={{ marginBottom: '0%' }}>
                  <Image
                    style={{ width: 20, height: 20, }}
                    source={require('../../assets/cancle.png')}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              <ScrollView style={{}}>
                {/* 제목 입력칸 */}
                <TextInput
                  style={styles.inputtext}
                  placeholder="제목을 입력하세요."
                  placeholderTextColor="#808080"
                ></TextInput>

                {/* 선 긋기 */}
                <View style={styles.lineStyle} />

                {/* 이미지 관련 코드 */}
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '10%' }}>
                  <TouchableOpacity style={{ marginBottom: '8%', width: '100%', height: '20%', marginRight: '1%' }} onPress={openImagePicker}>
                    <Image
                      source={image ? { uri: image } : require('../../assets/food4.png')}
                      style={{ width: 300, height: 150, borderRadius: 16 }}
                      resizeMode="fill"
                    />
                  </TouchableOpacity>
                </View>

                {/* 내가 기부받은 기부자 목록 찾기 피커 */}
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  style={{ width: 150, height: 50, marginTop: '20%' }}
                >
                  <Picker.Item label="선택1" value="value1" />
                  <Picker.Item label="선택2" value="value2" />
                </Picker>

                {/* 내용을 입력칸 */}
                <TextInput
                  style={styles.inputtext2}
                  placeholder="내용을 입력하세요."
                  placeholderTextColor="#808080"
                  multiline={true}
                  numberOfLines={10}
                ></TextInput>

                {/* 가격 입력칸 */}
                <TextInput
                  style={[styles.inputtext3, { marginBottom: 150 }]}
                  placeholder="가격을 입력하세요."
                  placeholderTextColor="#808080"
                  multiline={true}
                  keyboardType="numeric" // 숫자만 입력
                  maxLength={10} // 최대 숫자 개수를 10으로 지정
                ></TextInput>
              </ScrollView>
              {/* 등록 버튼 */}
              <TouchableOpacity style={{ width: '90%', height: '8%', borderRadius: 16, backgroundColor: '#44A5FF', alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 23, fontWeight: 'bold', fontFamily: 'Play-Regular', color: '#FFFFFF' }}>등록</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>


      {/* 기부내역 보기 모달 관련 코드 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <TouchableOpacity style={{ width: '10%', height: '10%', left: '48%' }} onPress={() => setModalVisible2(false)}>
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

      <View style={{ backgroundColor: '#44A5FF', width: '100%', height: '40%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        {/* 상단부분 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#44A5FF', width: '100%', height: '17%', marginTop: '10%' }}>
          <TouchableOpacity style={{ marginLeft: '6%', marginRight: '2%' }} onPress={() => navigation.navigate('Homep', { userInfo: userInfo })}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require('../../assets/backkey.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: 'white' }}>기부 받은 내역</Text>


          {/* 리뷰 글쓰기 */}
          <TouchableOpacity style={{ marginLeft: '35%', marginTop: '2%' }} onPress={() => setModalVisible3(true)}>
            <Image
              style={{ width: 35, height: 35 }}
              source={require('../../assets/writereview.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
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
          <Text style={{ fontFamily: 'Play-Regular', fontSize: 20, color: 'white', marginTop: '1%' }}>00 보육시설</Text>
        </View>
      </View>

      {/* 중앙 부분 */}
      <Text style={{ fontFamily: 'Play-Regular', fontSize: 18, color: '#8B8E90', marginTop: '5%', marginRight: '38%' }}>총 30건의 기부받은 내역이 있습니다.</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#7D7D7D', width: '89.5%', marginTop: '1.5%' }} />

      <ScrollView style={{ backgroundColor: '#FAFAFC', width: '89.5%', height: '80%' }}>
        {Object.keys(userInfo).map((key, index) => (
          <View key={index}>
            <View style={{ flexDirection: 'row' }}>
              <Text onPress={() => setModalVisible2(true)} style={{ fontFamily: 'Play-Bold', fontSize: 20, color: '#656565', marginTop: '2%', marginRight: '15%' }}>
                {key}: {userInfo[key]}
              </Text>
              <Image
                style={{ width: 20, height: 20, marginTop: '1.8%', marginLeft: '25%' }}
                source={require('../../assets/reviewon.png')}
                resizeMode="contain"
              />
              <TouchableOpacity style={{ marginLeft: '5%', marginTop: '2.5%' }} onPress={pressButton}>
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require('../../assets/motifydelete.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: 'Play-Regular', fontSize: 15, color: '#8B8E90', marginTop: '1%' }}>2023.11.06</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#DBDBDB', width: '100%', marginTop: '5%' }} />
          </View>
        ))}
      </ScrollView>


      {/* 마지막 라인(광고) */}
      <Image
        style={{ width: '100%', height: '6.4%', marginTop: '9%' }}
        source={require('../../assets/ad.png')}
        resizeMode="contain"
      />

      {/* 바텀시트 view */}
      <View style={styles.rootContainer}>
        <BottomsheetModDel
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
        />
      </View>
    </View>

  );
};
const styles = StyleSheet.create({

  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

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

  centeredView2: {
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

  lineStyle: {
    borderColor: '#DBDBDB',
    borderWidth: 1,
    width: '98%'
  },

  centeredView3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView3: {
    width: '85%',
    height: '80%',
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

  inputtext: {
    width: '80%',
    paddingBottom: 10,
    borderColor: '#828282',
    left: '0%',
    fontSize: 20,
    marginBottom: 10,
    color: '#6F6A6A',
  },

  inputtext2: {
    width: '100%',
    height: '30%',
    paddingBottom: 25,
    borderColor: '#828282',
    marginTop: '30%',
    paddingTop: '10%',
    left: '0%',
    fontSize: 20,
    marginBottom: '7%',
    marginTop: '38%',
    color: '#6F6A6A',
  },

  inputtext3: {
    width: '95%',
    height: '7%',
    paddingBottom: 25,
    borderColor: '#828282',
    fontSize: 20,
    marginBottom: '0%',
    color: '#6F6A6A',
  }
});
export default Donatep