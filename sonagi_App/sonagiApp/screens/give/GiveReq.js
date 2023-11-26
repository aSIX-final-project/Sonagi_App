import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const GiveReq = ({ navigation }) => {

    {/* 카메라, 갤러리 모달 관리 */ }
    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('카메라 접근 권한이 허용되지 않았습니다.');
            return;
        }
        const result = await ImagePicker.launchCameraAsync();
        if (!result.cancelled) {
            // 이곳에서 카메라의 url을 컨트롤 하면됨
        }
    };

    const openImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('갤러리 접근 권한이 허용되지 않았습니다.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            // 이곳에서 사진의 url을 컨트롤 하면됨
        }
    };

    // 카메라 모달 상태
    const [isCameraModalVisible, setCameraModalVisible] = useState(false);

    // 카메라 버튼 클릭 핸들러
    const handleCameraButtonClick = () => {
        console.log('sucess');
        setCameraModalVisible(true);
    };

    const heartCount = 3; // 원하는 숫자를 넣으세요.

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isCameraModalVisible}
            >
                <View style={styles.centeredView2}>
                    <View style={styles.modalView2}>
                        {/* 카메라 모달 관련 코드 */}
                        <TouchableOpacity style={{ width: '10%', height: '10%', left: '40%' }} onPress={() => setCameraModalVisible(false)}>
                            <View style={{ marginBottom: '10%' }}>
                                <Image
                                    style={{ width: 20, height: 20, }}
                                    source={require('../../assets/cancle.png')}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={openCamera}>
                            <View style={{ marginBottom: '10%' }}>
                                <Image
                                    style={{ width: 60, height: 60, }}
                                    source={require('../../assets/camara.png')}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableOpacity>

                        {/* 선 긋기 */}
                        <View style={styles.lineStyle} />

                        <TouchableOpacity onPress={openImagePicker}>
                            <View style={{ marginBottom: '10%', marginTop: '8%' }}>
                                <Image
                                    style={{ width: 60, height: 60, }}
                                    source={require('../../assets/galally.png')}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
            {/* 상단부분 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#44A5FF', width: '100%', height: '12%', paddingTop: '7%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '4%' }}>
                    <TouchableOpacity style={{ marginLeft: '6%', marginRight: '2%' }} onPress={() => navigation.navigate('KakaoMap')}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('../../assets/backkey.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'relative', marginRight: '6%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require('../../assets/heart.png')}
                        resizeMode="contain"
                    />
                    {/* 하트 부분 */}
                    <Text style={{ position: 'absolute', color: '#44A5FF', fontWeight: 'bold', fontSize: 25 }}>{heartCount}</Text>
                </View>
            </View>


            {/* 기부 요청 목록 */}
            <View style={{ flexDirection: 'row', height: '5%', width: '50%', marginBottom: '0%', marginTop: '25%', marginRight: '40%' }}>
                <Image
                    style={{ width: 32, height: 32, marginBottom: '1%', marginRight: '1%' }}
                    source={require('../../assets/food.png')}
                    resizeMode="contain"
                />
                <Text style={{ marginLeft: '1%', marginTop: '1%', fontSize: 30, fontWeight: 'bold', fontFamily: 'Play-Bold', color: '#383838' }}>기부 요청 목록</Text>
            </View>

            {/* 선 긋기 */}
            <View style={styles.lineStyle} />
            <View style={{ width: '90%', height: '50%', marginBottom: '10%'}} >
                {/* 목록 */}
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={{ width: '100%', height: '100%', backgroundColor: '#E1F1FF', flexDirection: 'row', borderRadius: 30, flexDirection: 'column'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{ width: 80, height: 80, borderTopLeftRadius: 30 }}
                                source={require('../../assets/profilep.png')}
                                resizeMode="contain"
                            />
                            <View style={{ width: '57%', height: '77%', backgroundColor: '#E1F1FF', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'column', width: '80%', height: '40%', backgroundColor: '#E1F1FF', flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 23.5, fontFamily: 'Play-Bold', color: '#383838' }}>상호명</Text>
                                    <Text style={{ fontSize: 23.5, fontFamily: 'Play-Regular', color: '#383838' }}>: 명륜 보육원</Text>
                                </View>
                                <View style={{ flexDirection: 'column', width: '80%', height: '40%', backgroundColor: '#E1F1FF', flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 23.5, fontFamily: 'Play-Bold', color: '#383838' }}>후원</Text>
                                    <Text style={{ fontSize: 23.5, fontFamily: 'Play-Regular', color: '#383838' }}>: 잡채 50인분</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={{ backgroundColor: '#44A5FF', width: '50%', height: '100%', borderBottomLeftRadius: 30 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                                    <Image
                                        style={{ width: 30, height: 30, borderTopLeftRadius: 30 }}
                                        source={require('../../assets/check.png')}
                                        resizeMode="contain"
                                    />
                                    <Text style={{ fontSize: 23.5, fontFamily: 'Play-Regular', color: '#ffffff', marginLeft: '3%' }}>확인</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#E1F1FF', width: '50%', height: '100%', borderBottomRightRadius: 30 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                                    <Image
                                        style={{ width: 22, height: 30, marginBottom: '2%' }}
                                        source={require('../../assets/cancle2.png')}
                                        resizeMode="contain"
                                    />
                                    <Text style={{ fontSize: 23.5, fontFamily: 'Play-Regular', color: '#44A5FF', marginLeft: '3%' }}>취소</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </ScrollView>
            </View>
            {/* 확인 버튼 */}
            <TouchableOpacity style={{ width: 360, height: 55, borderRadius: 22, backgroundColor: '#44A5FF', alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 32, fontWeight: 'bold', fontFamily: 'Play-Bold', color: '#FFFFFF' }}>확인</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },

    scrollViewContainer: {
        alignItems: 'center',
        paddingTop: 0,
        
    },

    lineStyle: {
        height: 2, // 선의 두께
        backgroundColor: "#E4E4E4", // 선의 색상
        width: '90%', // 선의 길이
        marginTop: '6%',
        marginBottom: '8%'
    },
    



});

export default GiveReq;
