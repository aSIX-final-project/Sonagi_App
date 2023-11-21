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

const RegistGivep = ({ navigation }) => {

    const heartCount = 3; // 원하는 숫자를 넣으세요.

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.overlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

            <View style={{ marginTop: '20%' }}>
                {/* 음식 이름 설정하기 */}
                <View style={{ flexDirection: 'row', height: '7%', width: '90%', marginBottom: '0%', marginTop: '0%' }}>
                    <Image
                        style={{ width: 27, height: 27, marginBottom: '1%', marginRight: '1%' }}
                        source={require('../../assets/food2.png')}
                        resizeMode="contain"
                    />
                    <Text style={{ fontSize: 25, fontWeight: 'bold', fontFamily: 'Play-Bold', color: '#383838', marginTop: '0.5%' }}>음식 이름 설정하기</Text>
                </View>
                {/* 선 긋기 */}
                <View style={styles.lineStyle} />
                <View style={{ flexDirection: 'row', height: '15%', width: '90%', marginTop: '3%' }}>

                    {/* 텍스트 입력 부분 */}
                    <TextInput
                        style={styles.inputtext2}
                        textAlign='center' // 가운데 정렬
                        maxLength={11} // 3자리수 까지 입력가능
                    />
                </View>
                <View style={styles.lineStyle} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Play-Bold', color: '#383838', marginRight: '52%', marginTop: '2%' }}>※ 음식 이름을 입력하세요.</Text>


                {/* 음식 인분 설정하기 */}
                <View style={{ flexDirection: 'row', height: '7%', width: '90%', marginBottom: '0%', marginTop: '10%' }}>
                    <Image
                        style={{ width: 27, height: 27, marginBottom: '1%', marginRight: '1%' }}
                        source={require('../../assets/food.png')}
                        resizeMode="contain"
                    />
                    <Text style={{ fontSize: 25, fontWeight: 'bold', fontFamily: 'Play-Bold', color: '#383838', marginTop: '0.5%' }}>음식 인분 설정하기</Text>
                </View>
                {/* 선 긋기 */}
                <View style={styles.lineStyle} />
                <View style={{ flexDirection: 'row', height: '15%', alignItems: 'center', justifyContent: 'center', width: '90%', }}>
                    {/* 카메라 부분 */}
                    <TouchableOpacity style={{ width: '23%', height: '80%', borderRadius: 22, borderWidth: 1, borderColor: '#C2C2C2', alignItems: 'center', justifyContent: 'center', marginRight: '10%' }} onPress={handleCameraButtonClick}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('../../assets/camara.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    {/* 텍스트 입력 부분 */}
                    <TextInput
                        style={styles.inputtext}
                        textAlign='center' // 가운데 정렬
                        keyboardType='numeric' // 숫자만 입력
                        maxLength={3} // 3자리수 까지 입력가능
                    />
                    <Text style={{ fontSize: 30, fontWeight: 'bold', fontFamily: 'Play-Regular', color: '#6F6A6A', marginTop: '8.5%', marginLeft: '3%' }}>인분</Text>
                </View>
                <View style={styles.lineStyle2} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Play-Bold', color: '#383838', marginRight: '39%', marginTop: '2%' }}>※ 5인분 단위로 요청할 수 있습니다.</Text>

                {/* 확인 버튼 */}
                <TouchableOpacity style={{ width: 360, height: 55, borderRadius: 22, marginTop: '20%', marginBottom: '15%', backgroundColor: '#44A5FF', alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ fontSize: 32, fontWeight: 'bold', fontFamily: 'Play-Bold', color: '#FFFFFF' }}>확인</Text>
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};
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
        height: 2, // 선의 두께
        backgroundColor: "#E4E4E4", // 선의 색상
        width: '90%', // 선의 길이
        marginBottom: '3%'
    },

    lineStyle2: {
        height: 2, // 선의 두께
        backgroundColor: "#E4E4E4", // 선의 색상
        width: '90%', // 선의 길이
        marginTop: '3%'
    },


    inputtext: {
        width: '23%',
        height: '77%',
        borderColor: '#828282',
        fontSize: 45,
        color: '#6F6A6A',
        backgroundColor: '#E1F1FF',
        borderRadius: 22,
        color: '#393939',
        textAlign: 'center',
    },

    inputtext2: {
        width: '100%',
        height: '77%',
        borderColor: '#828282',
        fontSize: 45,
        color: '#6F6A6A',
        backgroundColor: '#E1F1FF',
        borderRadius: 22,
        color: '#393939',
        textAlign: 'center',
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
        width: '50%',
        height: '25%',
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
    centeredView2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }

});

export default RegistGivep;
