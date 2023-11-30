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

const BottomSheetP = ({ modalVisible, setModalVisible, navigation }) => {
    // 로그인 완료 모달 표시 여부를 관리하는 상태 변수
    const [isSignupSuccessModalVisible, setSignupSuccessModalVisible] = useState(false);

// 유효성 검사 라인 (아이디)
const [username, setUsername] = useState('');
const [usernameError, setUsernameError] = useState(false);

const isUsernameValid = /^[a-zA-Z0-9]{4,12}$/.test(username);
const handleUsernameChange = (text) => {
    setUsername(text); // 아이디 입력값 업데이트
    setUsernameError(false); // 에러 표시 숨김
};

// 유효성 검사 라인 (비밀번호)
const [password, setPassword] = useState(''); // 비밀번호 입력값을 상태 변수로 관리
const [passwordError, setPasswordError] = useState(false);

// 영문, 숫자, 특수문자를 포함한 8자 이상의 유효성 검사
const isPasswordValid = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(password); 
const handlePasswordChange = (text) => {
    setPassword(text); // 비밀번호 입력값 업데이트
    setPasswordError(false); // 에러 표시 숨김
};

// 유효성 검사 라인 (이름)
const [name, setName] = useState(''); // 이름 입력값을 상태 변수로 관리
const [nameError, setNameError] = useState(false); // 이름 유효성 검사 에러 표시를 위한 상태 변수

const isNameValid = name !== ''; // 이름이 비어있지 않은지 검사
const handleNameChange = (text) => {
    setName(text); // 이름 입력값 업데이트
    setNameError(false); // 에러 표시 숨김
};

// 유효성 검사 라인 (전화번호)
const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 입력값을 상태 변수로 관리
const [phoneNumberError, setPhoneNumberError] = useState(false); // 전화번호 유효성 검사 에러 표시를 위한 상태 변수

const isPhoneNumberValid = /^\d+$/.test(phoneNumber); // 전화번호가 숫자만으로 이루어져 있는지 검사
const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text); // 전화번호 입력값 업데이트
    setPhoneNumberError(false); // 에러 표시 숨김
};

// 유효성 검사 라인 (시설 이름)
const [givername, setGivername] = useState(''); // 이름 입력값을 상태 변수로 관리
const [givernameError, setGivernameError] = useState(false); // 이름 유효성 검사 에러 표시를 위한 상태 변수

const isGivernameValid = givername !== ''; // 이름이 비어있지 않은지 검사
const handleGivernameChange = (text) => {
    setGivername(text); // 이름 입력값 업데이트
    setGivernameError(false); // 에러 표시 숨김
};

// 유효성 검사 라인 (시설 전화번호)
const [giverphoneNumber, setGiverPhoneNumber] = useState(''); // 전화번호 입력값을 상태 변수로 관리
const [giverphoneNumberError, setGiverPhoneNumberError] = useState(false); // 전화번호 유효성 검사 에러 표시를 위한 상태 변수

const isGiverPhoneNumberValid = /^\d+$/.test(giverphoneNumber); // 전화번호가 숫자만으로 이루어져 있는지 검사
const handleGiverPhoneNumberChange = (text) => {
    setGiverPhoneNumber(text); // 전화번호 입력값 업데이트
    setGiverPhoneNumberError(false); // 에러 표시 숨김
};

// 유효성 검사 라인 (시설 주소)
const [giveraddress, setGiveraddress] = useState(''); // 주소 입력값을 상태 변수로 관리
const [giveraddressError, setGiveraddressError] = useState(false); // 주소 유효성 검사 에러 표시를 위한 상태 변수

const isGiveraddressValid = giveraddress !== ''; // 주소가 비어있지 않은지 검사
const handleGiveraddressChange = (text) => {
    setGiveraddress(text); // 주소 입력값 업데이트
    setGiveraddressError(false); // 에러 표시 숨김
};

// 유효성 검사 라인 (총 인원 수)
const [personNumber, setPersonNumber] = useState(''); // 총 인원 입력값을 상태 변수로 관리
const [personNumberError, setPersonNumberError] = useState(false); // 총 인원 유효성 검사 에러 표시를 위한 상태 변수

const isPersonNumberValid = /^\d+$/.test(personNumber); // 총 인원이 숫자만으로 이루어져 있는지 검사
const handlePersonNumberChange = (text) => {
    setPersonNumber(text); // 총 인원 입력값 업데이트
    setPersonNumberError(false); // 에러 표시 숨김
};

// 유효성 검사 라인 (현재 인원 수)
const [todaypersonNumber, setTodayPersonNumber] = useState(''); // 총 인원 입력값을 상태 변수로 관리
const [todaypersonNumberError, setTodayPersonNumberError] = useState(false); // 총 인원 유효성 검사 에러 표시를 위한 상태 변수

const isTodayPersonNumberValid = /^\d+$/.test(todaypersonNumber); // 총 인원이 숫자만으로 이루어져 있는지 검사
const handleTodayPersonNumberChange = (text) => {
    setTodayPersonNumber(text); // 총 인원 입력값 업데이트
    setTodayPersonNumberError(false); // 에러 표시 숨김
};



    const handleSignupButtonClick = () => {

        // 아이디 유효성 검사
        if (!isUsernameValid) {
            setUsernameError(true);
            return;
        }

        // 비밀번호 유효성 검사
        if (!isPasswordValid) {
            setPasswordError(true);
            return;
        }

        // 이름 유효성 검사
        if (!isNameValid) {
            setNameError(true);
            return;
        }

        // 전화번호 유효성 검사
        if (!isPhoneNumberValid) {
            setPhoneNumberError(true);
            return;
        }

        // 시설 이름 유효성 검사
        if (!isGivernameValid){
            setGivernameError(true);
            return;
        }

        // 시설 전화번호 유효성 검사
        if (!isGiverPhoneNumberValid) {
            setGiverPhoneNumberError(true);
            return;
        }
        
        // 시설 주소 유효성 검사
        if (!isGiveraddressValid){
            setGiveraddressError(true);
            return;
        }

        // 총 인원 수 유효성 검사
        if (!isPersonNumberValid) {
            setPersonNumberError(true);
            return;
        }

        //  현재 인원 수 유효성 검사
        if (!isTodayPersonNumberValid) {
            setTodayPersonNumberError(true);
            return;
        }

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
                            source={require('../../assets/bottomsheethandle.png')}
                            resizeMode="contain"
                        />

                        <View style={{ flexDirection: 'row', height: '10%', width: '90%', marginBottom: '5%' }}>
                            <Image
                                style={{ width: 130, height: 100, top: '0%', marginRight: '3%' }}
                                source={require('../../assets/signup3.png')}
                                resizeMode="contain"
                            />


                        </View>



                        <ScrollView contentContainerStyle={styles.scrollViewContainer} style={{ width: '100%', height: '60%' }}>

                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 아이디 */}
                            <Image
                                style={{ width: 50, height: 50, top: '1.2%', right: '38.5%' }}
                                source={require('../../assets/id2.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={[
                                styles.inputtext,
                                !isUsernameValid && { borderColor: 'red' }
                                ]}
                                placeholder="아이디를 입력하세요."
                                placeholderTextColor='#808080'
                                value={username}
                                onChangeText={handleUsernameChange}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />
                            {usernameError && (
                                <Text style={styles.errorText}>4~12자리의 영문자 또는 숫자여야 합니다.</Text>
                            )}

                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 비밀번호 */}
                            <Image
                                style={{ width: 60, height: 60, top: '1.5%', right: '36.5%' }}
                                source={require('../../assets/password2.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={[
                                    styles.inputtext,
                                    !isPasswordValid && { borderColor: 'red' }
                                ]}
                                placeholder="비밀번호를 입력하세요."
                                placeholderTextColor="#808080"
                                secureTextEntry
                                value={password}
                                onChangeText={handlePasswordChange} // 텍스트 변경 시 비밀번호 유효성 검사 수행
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />
                            {passwordError && (
                                <Text style={styles.errorText2}>영문, 숫자, 특수문자를 포함한 8글자 이상이어야 합니다.</Text>
                            )}

                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 이름 */}
                            <Image
                                style={{ width: 30, height: 50, top: '1.5%', right: '40.5%' }}
                                source={require('../../assets/name.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={[
                                    styles.inputtext,
                                    !isNameValid && { borderColor: 'red' } // 이름 유효성 검사에 실패하면 테두리 색상을 빨간색으로 변경
                                ]}
                                placeholder="이름을 입력하세요."
                                placeholderTextColor="#808080"
                                value={name}
                                onChangeText={handleNameChange} // 텍스트 변경 시 이름 유효성 검사 수행
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />
                            {nameError && (
                                <Text style={styles.errorText3}>이름을 입력하세요.</Text>
                            )}
                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 전화번호 */}
                            <Image
                                style={{ width: 60, height: 60, top: '1.5%', right: '36.7%' }}
                                source={require('../../assets/phonenumber.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={[
                                    styles.inputtext,
                                    !isPhoneNumberValid && { borderColor: 'red' }
                                ]}
                                placeholder="전화번호를 입력하세요."
                                placeholderTextColor="#808080"
                                value={phoneNumber}
                                onChangeText={handlePhoneNumberChange}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />
                            {phoneNumberError && (
                                <Text style={styles.errorText4}>전화번호는 숫자만 입력할 수 있습니다.</Text>
                            )}
                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 시설 이름 */}
                            <Image
                                style={{ width: 60, height: 60, top: '1.5%', right: '37%' }}
                                source={require('../../assets/storename.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={[styles.inputtext,
                                    !isGivernameValid && { borderColor: 'red'} // 시설이름 유효성 검사
                                ]}
                                placeholder="시설 이름을 입력하세요."
                                placeholderTextColor="#808080"
                                value={givername}
                                onChangeText={handleGivernameChange} // 텍스트 변경시 시설이름 유효성 검사 수행
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />
                            {givernameError && (
                                <Text style={styles.errorText5}>시설 이름을 입력하세요.</Text>
                            )}
                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 시설 전화번호 */}
                            <Image
                                style={{ width: 90, height: 60, top: '1.5%', right: '33.5%' }}
                                source={require('../../assets/storephonenumber.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={[
                                    styles.inputtext,
                                    !isGiverPhoneNumberValid && { borderColor: 'red' }
                                ]}
                                placeholder="시설 전화번호를 입력하세요."
                                placeholderTextColor="#808080"
                                value={giverphoneNumber}
                                onChangeText={handleGiverPhoneNumberChange}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />
                            {giverphoneNumberError && (
                                <Text style={styles.errorText4}>전화번호는 숫자만 입력할 수 있습니다.</Text>
                            )}
                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 시설 주소 */}
                            <Image
                                style={{ width: 60, height: 60, top: '1.5%', right: '37.5%' }}
                                source={require('../../assets/storeaddress.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={[styles.inputtext,
                                    !isGiveraddressValid && { borderColor: 'red'} // 시설이름 유효성 검사
                                ]}
                                placeholder="시설 주소를 입력하세요."
                                placeholderTextColor="#808080"
                                value={giveraddress}
                                onChangeText={handleGiveraddressChange} // 텍스트 변경시 시설이름 유효성 검사 수행
                            ></TextInput>
                            
                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />
                            {giveraddressError && (
                                <Text style={styles.errorText5}>시설 주소를 입력하세요.</Text>
                            )}
                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 총 인원 수 */}
                            <Image
                                style={{ width: 65, height: 60, top: '1.5%', right: '36.5%' }}
                                source={require('../../assets/allmember.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                style={[
                                    styles.inputtext,
                                    !isPersonNumberValid && { borderColor: 'red' }
                                ]}
                                placeholder="숫자를 입력하세요."
                                placeholderTextColor="#808080"
                                value={personNumber}
                                onChangeText={handlePersonNumberChange}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />
                            {personNumberError && (
                                <Text style={styles.errorText6}>총 인원수는 숫자만 입력할 수 있습니다.</Text>
                            )}
                            {/* ///////////////////////////////////////////////////////////// */}

                            {/* 현재 인원 수 */}
                            <Image
                                style={{ width: 80, height: 60, top: '1.5%', right: '35%' }}
                                source={require('../../assets/todaymember.png')}
                                resizeMode="contain"
                            />

                            <TextInput
                                 style={[
                                    styles.inputtext,
                                    !isTodayPersonNumberValid && { borderColor: 'red' }
                                ]}
                                placeholder="숫자를 입력하세요."
                                placeholderTextColor="#808080"
                                value={todaypersonNumber}
                                onChangeText={handleTodayPersonNumberChange}
                            ></TextInput>

                            {/* 선 긋기 */}
                            <View style={styles.lineStyle} />
                            {todaypersonNumberError && (
                                <Text style={styles.errorText7}>현재 인원수는 숫자만 입력할 수 있습니다.</Text>
                            )}
                            {/* ///////////////////////////////////////////////////////////// */}

                        </ScrollView>

                        <TouchableOpacity
                            onPress={handleSignupButtonClick} // 가입 버튼 클릭 시 모달 표시
                        >
                            <Image
                                style={{ width: 350, height: 100, top: '5%', right: '0%', marginRight: 10 }}
                                source={require('../../assets/signupbutton.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        {/* 로그인으로 넘어가는 부분 */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', bottom: '0%', right: '1.5%', bottom: '5%', paddingTop: 0 }}>
                            <Image
                                style={{ width: 150, height: 150, bottom: '0%', right: '0%', marginRight: 10 }}
                                source={require('../../assets/login2-2.png')}
                                resizeMode="contain"
                            />

                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Image
                                    style={{ width: 60, height: 90, bottom: '0%', left: '5%' }}
                                    source={require('../../assets/login3-2.png')}
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
                                            source={require('../../assets/signupsucess.png')}
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
    errorText: {
        color: 'red',
        fontSize: 15,
        marginTop: 1,
        marginRight: '38%'
      },

    errorText2: {
        color: 'red',
        fontSize: 15,
        marginTop: 1,
        marginRight: '23%'
      },

    errorText3: {
        color: 'red',
        fontSize: 15,
        marginTop: 1,
        marginRight: '66%'
      },

    errorText4: {
        color: 'red',
        fontSize: 15,
        marginTop: 1,
        marginRight: '43%'
      },

    errorText5: {
        color: 'red',
        fontSize: 15,
        marginTop: 1,
        marginRight: '60%'
    },

    errorText6: {
        color: 'red',
        fontSize: 15,
        marginTop: 1,
        marginRight: '42%'
    },

    errorText7: {
        color: 'red',
        fontSize: 15,
        marginTop: 1,
        marginRight: '40%'
    }
})

export default BottomSheetP;