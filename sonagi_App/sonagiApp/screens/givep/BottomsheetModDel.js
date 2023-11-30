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

const BottomsheetModDel = ({ modalVisible, setModalVisible, navigation }) => {
    
    const [image, setImage] = useState(null);

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
        return new Promise((resolve) => {
            closeBottomSheet.start(() => {
                setModalVisible(false);
                resolve();
            });
        });
    };


    // 수정 모달 상태(게시글 수정하기)
    const [isNotionModalVisible3, setNotionModalVisible3] = useState(false);
    // 게시판 버튼 클릭 핸들러
    const handleNotionButtonClick3 = () => {
        closeModal().then(() => {
            setNotionModalVisible3(true);
        });
    };

    return (
        <View style={styles.container}>


             {/* 공지 게시글 수정하기 모달 디자인 */}
             <Modal
                animationType="fade"
                transparent={true}
                visible={isNotionModalVisible3}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.centeredView2}>
                    <View style={styles.modalView2}>
                        {/* 게시판 모달 관련 코드 */}
                        <TouchableOpacity style={{ marginTop: '5%', marginBottom: '8%', width: '10%', height: '10%', left: '45%' }} onPress={() => setNotionModalVisible3(false)}>
                            <View style={{ marginBottom: '0%' }}>
                                <Image
                                    style={{ width: 20, height: 20,  }}
                                    source={require('../../assets/cancle.png')}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableOpacity>

                        {/* 제목 입력칸 */}
                        <TextInput
                            style={styles.inputtext}
                            placeholder="제목을 입력하세요."
                            placeholderTextColor="#808080"
                        ></TextInput>

                        {/* 선 긋기 */}
                        <View style={styles.lineStyle} />

                        {/* 이미지 관련 코드 */}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ marginTop: '0%', marginBottom: '8%', width: '20%', height: '20%'}} onPress={openImagePicker}>
                            <Image
                                source={image ? { uri: image } : require('../../assets/food4.png')}
                                style={{ width: 280, height: 170, borderRadius: 16 }}
                                resizeMode="fill"
                            />
                            </TouchableOpacity>
                        </View>

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
                            style={styles.inputtext3}
                            placeholder="가격을 입력하세요."
                            placeholderTextColor="#808080"
                            multiline={true}
                            keyboardType="numeric" // 숫자만 입력
                            maxLength={10} // 최대 숫자 개수를 10으로 지정
                        ></TextInput>

                        {/* 수정 버튼 */}
                        <TouchableOpacity style={{ width: '80%', height: '14%', borderRadius: 16, backgroundColor: '#44A5FF', alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 23, fontWeight: 'bold', fontFamily: 'Play-Regular', color: '#FFFFFF' }}>수정</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* 삭제하기, 수정하기 모달디자인 */}
            <Modal
                visible={modalVisible}
                animationType={"fade"}
                transparent
                statusBarTranslucent
            >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.overlay}>
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
                                {/* 바텀 시트 구성 부분 */}
                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: '75%', width: '100%' }}>
                                    <TouchableOpacity style={{ marginLeft: '35%' }} onPress={closeModal}>
                                        <Image
                                            style={{ width: 22, height: 30 }}
                                            source={require('../../assets/cancle.png')}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </View>

                                { /* 삭제 하기 */}
                                <View style={{ width: '100%', height: '28%' }}>
                                    <TouchableOpacity style={{ width: '100%', height: '100%' }}>
                                        <Text style={{ fontFamily: 'Play-Regular', fontSize: 23, color: '#6F6A6A', paddingLeft: '10%', paddingTop: '2.5%' }}>삭제 하기</Text>
                                    </TouchableOpacity>
                                </View>

                                { /* 수정 하기 */}
                                <View style={{ width: '100%', height: '28%' }}>
                                    <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={handleNotionButtonClick3}>
                                        <Text style={{ fontFamily: 'Play-Regular', fontSize: 23, color: '#6F6A6A', paddingLeft: '10%', paddingTop: '2.5%' }}>수정 하기</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Modal>

            
        </View>
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
        height: '18%', // 올라오는 크기
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
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


    modalView2: {
        width: '80%',
        height: '80%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 0,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingBottom: '80%',
        justifyContent: 'flex-start',
    },
    centeredView2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FAFAFC'
    },
    lineStyle: {
        height: 2, // 선의 두께
        backgroundColor: "#E4E4E4", // 선의 색상
        width: '90%', // 선의 길이
        marginBottom: '3%'
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
        width: '80%',
        height: '47%',
        paddingBottom: 25,
        borderColor: '#828282',
        marginTop: '38%',
        left: '0%',
        fontSize: 20,
        marginBottom: '7%',
        color: '#6F6A6A',
    },

    inputtext3: {
        width: '80%',
        height: '12%',
        paddingBottom: 25,
        borderColor: '#828282',
        fontSize: 20,
        marginBottom: '7%',
        color: '#6F6A6A'     
    }
})

export default BottomsheetModDel;