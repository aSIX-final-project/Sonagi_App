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
    Keyboard,
} from 'react-native';

import { KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const BottomsheetMarker = ({ modalVisible, setModalVisible, navigation }) => {

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

    const [isCameraModalVisible, setCameraModalVisible] = useState(false);

    const handleCameraButtonClick = () => {
        console.log('sucess');
        setCameraModalVisible(true);
    };

    const pressButton = () => {
        console.log('click');
        navigation.navigate('SetupFood');
    }

    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;


    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => {
            return evt.nativeEvent.locationY < 45;
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            return evt.nativeEvent.locationY < 45;
        },
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;


    useEffect(() => {
        if (modalVisible) {
            resetBottomSheet.start();
        }
    }, [modalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(() => {
            setModalVisible(false);
        })
    }

    return (
        <View style={styles.overlay}>
            <Modal
                visible={modalVisible}
                animationType={"fade"}
                transparent
                statusBarTranslucent
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback
                            onPress={closeModal}
                        >
                            <View style={styles.background} />
                        </TouchableWithoutFeedback>
                        <Animated.View
                            style={{ ...styles.bottomSheetContainer, transform: [{ translateY: translateY }] }}
                            {...panResponders.panHandlers}
                        >

                            {/* 상호명, 주소 */}
                            <View style={{ marginTop: '30%', flexDirection: 'row', width: '90%', height: '8%', alignItems: 'center', marginBottom: '3%', paddingRight: '50%' }}>
                                <View>
                                    <Image
                                        style={{ width: 43, height: 43, bottom: '0%', marginLeft: '10%', borderRadius: 60 }}
                                        source={require('../../assets/chlogo.png')}
                                        resizeMode="contain"
                                    />
                                </View>

                                <View style={{ marginTop: '1%',  }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Play-Bold' }}>상호명:춘천 닭갈비</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Play-Regular' }}>서울시 강남구</Text>
                                </View>
                            </View>

                            {/* 밑줄 */}
                            <View style={{ borderBottomColor: '#7D7D7D', borderBottomWidth: 1, width: '90%', marginTop: '1%' }} />

                            {/* 총 인원, 연락처 */}
                            <View style={{ flexDirection: 'row', marginLeft: '50%', marginTop: '2%',  alignItems: 'flex-end', justifyContent: 'flex-end', }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Play-Regular' }}>연락처 : 010-0000-0000</Text>
                            </View>

                            {/* 시설소개 */}
                            <View style={{ flexDirection: 'row', width: '90%', height: '17%', alignItems: 'center', marginTop: '10%', paddingRight: '40%' }}>
                                <View>
                                    <Text style={{ fontSize: 25, color: '#393939', fontWeight: 'bold', fontFamily: 'Play-Bold', marginBottom: '1%' }}>시설소개</Text>
                                    <Text style={{ fontSize: 18, color: '#6F6A6A', fontWeight: 'bold', fontFamily: 'Play-Regular', width: '55%' }}>우리 OO 식당은 서울시에서 가장 큰 규모로 운영중입니다.</Text>
                                </View>
                            </View>

                           


                            {/* 하단 버튼 */}
                            <View style={{ width: '90%', height: '7%', alignItems: 'center', justifyContent: 'center', marginTop: '5%', paddingRight: '0%', paddingRight: '0%' }}>

                                
                            </View>
                            <View style={{ marginBottom: '25%', width: '90%', height: '20%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', width: '48%', height: '70%', backgroundColor: '#E1F1FF', borderRadius: 26, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('Login')}>
                                    <Image
                                        style={{ width: 30, height: 30, bottom: '0%', marginRight: '5%', borderRadius: 60 }}
                                        source={require('../../assets/findroute.png')}
                                        resizeMode="contain"
                                    />
                                    <Text style={{ fontSize: 25, fontWeight: 'bold', fontFamily: 'Play-Bold', color: '#44A5FF', marginTop: '1%' }}>길찾기</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ flexDirection: 'row', width: '48%', height: '70%', backgroundColor: '#44A5FF', borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginLeft: '4%' }} onPress={() => navigation.navigate('Login')}>
                                    <Image
                                        style={{ width: 30, height: 30, bottom: '0%', marginRight: '5%', borderRadius: 60 }}
                                        source={require('../../assets/phonelogo.png')}
                                        resizeMode="contain"
                                    />
                                    <Text style={{ fontSize: 25, fontWeight: 'bold', fontFamily: 'Play-Bold', color: '#FFFFFF', marginTop: '1%' }}>통화</Text>
                                </TouchableOpacity>
                            </View>

                        </Animated.View>
                    </View>
                    
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.2)" // 바텀시트 올라왔을때 어두워짐
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        height: '40%', // 올라오는 크기
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 20, // 모서리 부분
        borderTopRightRadius: 20,
    },

    scrollViewContainer: {
        alignItems: 'center',
        paddingTop: 0,

    },

    lineStyle: {
        height: 1, // 선의 두께
        backgroundColor: "#828282", // 선의 색상
        width: '90%', // 선의 길이
    },


    inputtext: {
        width: '20%',
        height: '100%',
        borderColor: '#828282',
        fontSize: 20,
        color: '#6F6A6A',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
    inputtext: {
        width: '23%',
        height: '77%',
        borderColor: '#828282',
        fontSize: 30,
        color: '#6F6A6A',
        backgroundColor: '#E1F1FF',
        borderRadius: 22,
        color: '#393939',
        textAlign: 'center',
    },

    inputtext2: {
        width: '100%',
        height: '100%',
        borderColor: '#828282',
        fontSize: 25,
        color: '#6F6A6A',
        backgroundColor: '#E1F1FF',
        borderRadius: 22,
        color: '#393939',
        textAlign: 'center',
    },

})

export default BottomsheetMarker;