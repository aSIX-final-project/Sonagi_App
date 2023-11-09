import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Button } from 'react-native';
import axios from 'axios';


const Login = ({ navigation }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const passwordRef = useRef(null);

    const username = watch('username', ''); // username 필드의 값을 실시간으로 감시



    // 로그인 버튼을 눌렀을때 값을 서버에 보냄
    const [isLoginSuccessModalVisible, setLoginSuccessModalVisible] = useState(false); // 모달 알림창의 상태


    const handleLoginButtonClick = () => {
        setLoginSuccessModalVisible(true); // 가입 버튼 클릭 시 모달 표시

        // 3초 후에 모달 숨김
        setTimeout(() => {
            setLoginSuccessModalVisible(false);
        }, 3000);

    };

    React.useEffect(() => {
        register('username', { required: '아이디는 필수입니다', minLength: { value: 4, message: '아이디는 4자 이상이어야 합니다' }, maxLength: { value: 12, message: '아이디는 12자 이하여야 합니다' } });
        if (username.length >= 4 && username.length <= 12) { // username 필드의 유효성 검사가 통과되면
            register('password', { required: '비밀번호는 필수입니다' }); // password 필드를 등록
        }
    }, [register, username]);

    return (
        <View style={styles.container}>

            {/* 로그인 완료 모달 */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isLoginSuccessModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            style={{ width: 130, height: 130, bottom: '0.5%', right: '0%' }}
                            source={require('../assets/loginsuccess.png')}
                            resizeMode="contain"
                        />
                        <TouchableOpacity
                            onPress={() => setLoginSuccessModalVisible(false)} // 모달 내부의 버튼 클릭 시 모달 숨김
                        ></TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* 로그인 글씨 */}
            <Image
                style={{ width: 100, height: 100, bottom: '0.5%', right: '32%' }}
                source={require('../assets/login.png')}
                resizeMode="contain"
            />

            {/* id */}
            <Image
                style={{ width: 20, height: 20, bottom: '0%', right: '40.5%' }}
                source={require('../assets/id.png')}
                resizeMode="contain"
            />

            <TextInput
                style={styles.input}
                autoFocus
                autoCapitalize="none"
                onChangeText={text => setValue('username', text)}
                returnKeyType="next"
                clearButtonMode="while-editing"
                onSubmitEditing={() => passwordRef.current?.focus()}
                name="username"
            />

            {/* password */}
            <Image
                style={{ width: 100, height: 40, bottom: '0%', right: '30.3%' }}
                source={require('../assets/password.png')}
                resizeMode="contain"
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <TextInput
                    style={styles.inputpw}
                    secureTextEntry
                    ref={passwordRef}
                    onChangeText={text => setValue('password', text)}
                    name="password"
                />
                {/* 비밀번호 가리기 */}
                <Image
                    style={{ width: 30, height: 30, bottom: '0%', right: '60%' }}
                    source={require('../assets/lookpwd.png')}
                    resizeMode="contain"
                />
            </View>

            { /* 아이디 비밀번호 유효성 검사 */}
            {errors.username && <Text style={{ alignSelf: 'flex-start', left: '6%', color: 'white' }}>{errors.username.message}</Text>}
            {(username.length >= 4 && username.length <= 12 && errors.password) && <Text style={{ alignSelf: 'flex-start', left: '6%', color: 'white' }}>{errors.password.message}</Text>}
            <View style={{ flexDirection: 'row', alignItems: 'center', bottom: '0%', right: '6.6%' }}>
                <Image
                    style={{ width: 150, height: 150, bottom: '0%', right: '0%', marginRight: 10 }}
                    source={require('../assets/signup1.png')}
                    resizeMode="contain"
                />

                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Image
                        style={{ width: 60, height: 90, bottom: '0%', right: '0%' }}
                        source={require('../assets/signup2.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

            </View>

            {/* 로그인 버튼 */}
            <TouchableOpacity onPress={handleLoginButtonClick}>
                <Image
                    style={{ width: 70, height: 100, marginLeft: "70%" }}
                    source={require('../assets/login1.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>

        </View >
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
    input: {
        width: '88%',
        height: 45,
        borderColor: 'white',
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        marginVertical: 8,
        borderRadius: 4,
        fontSize: 20,
    },
    inputpw: {
        width: '88%',
        height: 45,
        borderColor: 'white',
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        marginVertical: 8,
        borderRadius: 4,
        left: '25%',
        fontSize: 20,
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

});

export default Login;