import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
// 바텀시트
import BottomSheet from './Bottomsheet';


const Signup = ({ navigation }) => {

    // 바텀시트
    const [modalVisible, setModalVisible] = useState(false);
    const pressButton = () => {
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>



            <View style={{ flexDirection: 'columm', alignItems: 'center', top: '25%' }}>
                {/* 회원가입 */}
                <Image
                    style={{ width: 130, height: 130, bottom: '0.5%', right: '20%', top: '2%' }}
                    source={require('../assets/signupMain.png')}
                    resizeMode="contain"
                />


                {/* 기부자 */}
                <TouchableOpacity onPress={pressButton}>
                    <View style={{ width: 300, height: 70, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={require('../assets/gibuja.png')}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>


                {/* 피기부자 */}
                <TouchableOpacity onPress={() => navigation.navigate('NurseySignUp')}>
                    <View style={{ width: 300, height: 80, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={require('../assets/pigibuja.png')}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>

                {/* 로그인으로 넘어가는 부분 */}
                <View style={{ flexDirection: 'row', alignItems: 'center', bottom: '0%', right: '8%', bottom: '5%' }}>
                    <Image
                        style={{ width: 150, height: 150, bottom: '0%', right: '0%', marginRight: 10 }}
                        source={require('../assets/login2.png')}
                        resizeMode="contain"
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Image
                            style={{ width: 60, height: 90, bottom: '0%', right: '0%' }}
                            source={require('../assets/login3.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 바텀시트 view */}
            <View style={styles.rootContainer}>
                <BottomSheet
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    navigation={navigation}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#44A5FF'

    },

    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});
export default Signup;