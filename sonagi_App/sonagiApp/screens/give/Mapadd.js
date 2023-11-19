import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Platform, Modal, ScrollView } from 'react-native';



const Mapadd = ({ navigation }) => {
    const heartCount = 10; // 원하는 숫자를 넣으세요.
    return (
        <View style={styles.container}>
            {/* 상단부분 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#44A5FF', width: '100%', height: '12%', paddingTop: '6%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '4%' }}>
                    <TouchableOpacity style={{ marginLeft: '6%', marginRight: '2%' }} onPress={() => navigation.navigate('KakaoMap')}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('../../assets/backkey.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Play-Bold', fontSize: 25, color: 'white', marginLeft: '5%' }}>맵</Text>
                </View>
                <View style={{ position: 'relative', marginRight: '6%' }}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require('../../assets/heart.png')}
                        resizeMode="contain"
                    />
                    {/* 하트 부분 */}
                    <Text style={{ position: 'absolute', right: '28%', top: '12%', color: '#44A5FF', fontWeight: 'bold', fontSize: 25 }}>{heartCount}</Text>
                </View>
            </View>

            {/* 중심 부분 */}
            <View style={{ flexDirection: 'row', backgroundColor: 'pink', width: '90%', height: '20%' }}>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FAFAFC'
    },

});
export default Mapadd