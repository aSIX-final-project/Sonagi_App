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

const BottomSheet = ({ modalVisible, setModalVisible, navigation }) => {
    // 로그인 완료 모달 표시 여부를 관리하는 상태 변수
    const [isSignupSuccessModalVisible, setSignupSuccessModalVisible] = useState(false);

    const handleSignupButtonClick = () => {
        setSignupSuccessModalVisible(true); // 가입 버튼 클릭 시 모달 표시

        // 3초 후에 모달 숨김
        setTimeout(() => {
            setSignupSuccessModalVisible(false);
        }, 3000);
    };



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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Modal
                visible={modalVisible}
                animationType={"fade"}
                transparent
                statusBarTranslucent
            >

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

                        <Image
                            style={{ width: 70, height: 50, bottom: '0%' }}
                            source={require('../assets/bottomsheethandle.png')}
                            resizeMode="contain"
                        />

                        <Image
                            style={{ width: 130, height: 100, top: '0%', right: '29%' }}
                            source={require('../assets/signup3.png')}
                            resizeMode="contain"
                        />




                        <ScrollView contentContainerStyle={styles.scrollViewContainer} style={{ width: '100%', height: '60%' }}>

                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 아이디 */}
                            <Image
                                style={{ width: 50, height: 50, top: '1.2%', right: '38.5%' }}
                                source={require('../assets/id2.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={styles.inputtext}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />

                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 비밀번호 */}
                            <Image
                                style={{ width: 60, height: 60, top: '1.5%', right: '36.5%' }}
                                source={require('../assets/password2.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={styles.inputtext}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />

                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 이름 */}
                            <Image
                                style={{ width: 30, height: 50, top: '1.5%', right: '40.5%' }}
                                source={require('../assets/name.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={styles.inputtext}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />

                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 전화번호 */}
                            <Image
                                style={{ width: 60, height: 60, top: '1.5%', right: '36.7%' }}
                                source={require('../assets/phonenumber.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={styles.inputtext}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />

                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 시설 전화번호 */}
                            <Image
                                style={{ width: 90, height: 60, top: '1.5%', right: '33.5%' }}
                                source={require('../assets/storephonenumber.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={styles.inputtext}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />

                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 시설 이름 */}
                            <Image
                                style={{ width: 60, height: 60, top: '1.5%', right: '37%' }}
                                source={require('../assets/storename.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={styles.inputtext}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />

                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 시설 주소 */}
                            <Image
                                style={{ width: 60, height: 60, top: '1.5%', right: '37%' }}
                                source={require('../assets/storeaddress.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={styles.inputtext}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />

                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 사업자 등록 번호 */}
                            <Image
                                style={{ width: 100, height: 60, top: '1.5%', right: '32%' }}
                                source={require('../assets/storenumber.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={styles.inputtext}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />

                            {/* ///////////////////////////////////////////////////////////// */}

                        </ScrollView>

                        <TouchableOpacity
                            onPress={handleSignupButtonClick} // 가입 버튼 클릭 시 모달 표시
                        >
                            <Image
                                style={{ width: 350, height: 100, top: '5%', right: '0%', marginRight: 10 }}
                                source={require('../assets/signupbutton.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        {/* 로그인으로 넘어가는 부분 */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', bottom: '0%', right: '1.5%', bottom: '5%', paddingTop: 0 }}>
                            <Image
                                style={{ width: 150, height: 150, bottom: '0%', right: '0%', marginRight: 10 }}
                                source={require('../assets/login2-2.png')}
                                resizeMode="contain"
                            />

                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Image
                                    style={{ width: 60, height: 90, bottom: '0%', left: '5%' }}
                                    source={require('../assets/login3-2.png')}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>

                            {/* 로그인 완료 모달 */}
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={isSignupSuccessModalVisible} // 상태 변수에 따라 모달 표시 여부 결정
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Image
                                            style={{ width: 130, height: 130, bottom: '0.5%', right: '0%' }}
                                            source={require('../assets/signupsucess.png')}
                                            resizeMode="contain"
                                        />
                                        <TouchableOpacity
                                            onPress={() => setSignupSuccessModalVisible(false)} // 모달 내부의 버튼 클릭 시 모달 숨김
                                        >
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.2)" // 바텀시트 올라왔을때 어두워짐
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        height: '80%', // 올라오는 크기
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
        width: '100%', // 선의 길이
        bottom: '0%'
    },


    inputtext: {
        width: '100%',
        paddingBottom: 25,
        borderColor: '#828282',
        top: '2%',
        left: '6%',
        fontSize: 20,
        marginBottom: 10,
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

})

export default BottomSheet;