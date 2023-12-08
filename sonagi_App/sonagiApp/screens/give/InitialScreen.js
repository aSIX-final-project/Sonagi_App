// 필요한 모듈들을 불러옵니다.
import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



// 화면의 너비와 높이를 가져옵니다.
const { width, height } = Dimensions.get('window');


// InitalScreen 컴포넌트를 정의합니다.
const InitialScreen = ({ navigation }) => {

    // 비회원자 앱 이동
    const noneLoginClick = () => {
        navigation.navigate("noLoginGive");
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.backgroundImage}
                source={require("../../assets/givemv.gif")}
                resizeMode="cover"
            />

            {/* 메인 로고디자인 */}
            <View style={styles.mainlogoContainer}>
                <Image
                    style={styles.mainlogo}
                    source={require("../../assets/mainlogo.png")}
                    resizeMode="fill"
                />
            </View>

            {/* 하단 버튼 */}
            <View style={styles.bottombuttonContainer}>
                <TouchableOpacity style={styles.bottombutton} onPress={() => navigation.navigate("Login")} >
                    <Text style={styles.bottomtext}>간편하게 기부 시작하기</Text>
                </TouchableOpacity>
                <Text style={styles.bottomtext1}>아직 회원이 아니신가요?  <Text style={styles.bottomtext2} onPress={noneLoginClick}>클릭</Text></Text>
            </View>
        </View>
    );
};

// 스타일을 정의합니다.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    backgroundImage: {
        position: 'absolute',
        width: width,
        height: height,
    },
    mainlogo: {
        width: 125,
        height: 70
    },
    mainlogoContainer: {
        width: '100%',
        height: '11%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottombutton: {
        backgroundColor: '#ffffff',
        width: '80%',
        height: '65%',
        paddingHorizontal: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    bottomtext: {
        fontFamily: "Play-Bold",
        fontSize: 20,
        color: "#383838",
    },

    bottomtext1: {
        fontFamily: "Play-Regular",
        fontSize: 20,
        color: "#ffffff",
    },

    bottombuttonContainer: {
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '90%'
    },

    bottomtext2: {
        fontFamily: "Play-Bold",
        fontSize: 22,

    }
});

// 이 컴포넌트를 다른 파일에서 불러올 수 있도록 export 합니다.
export default InitialScreen;
