import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Linking, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const CrawlingNotice = ({ navigation, route }) => {
    const { userInfo } = route.params;
    const [crawlingData, setCrawlingData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/crawling/findNotice');
                console.log(response.data);
                setCrawlingData(response.data.list);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => Linking.openURL('https://ols.sbiz.or.kr/ols/man/SMAN051M/page.do')}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemDate}>{item.date}</Text>
                <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#44A5FF",
                    width: "100%",
                    height: "12%",
                    paddingTop: "7%",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: "4%",
                    }}
                >
                    <TouchableOpacity
                        style={{ marginLeft: "6%", marginRight: "2%" }}
                        onPress={() => navigation.navigate("Home", { userInfo: userInfo })}
                    >
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../../assets/backkey.png")}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    height: "5%",
                    width: "100%",
                    marginBottom: "0%",
                    marginLeft: "10%",
                    marginTop: '20%'
                }}
            >
                <Text style={{ fontSize: '30' }}>&#8251;</Text>
                <Text
                    style={{
                        marginLeft: "1%",
                        marginTop: "1%",
                        fontSize: 30,
                        fontWeight: "bold",
                        fontFamily: "Play-Bold",
                        color: "#383838",
                    }}
                >
                    소상공인 정책자금 게시판
                </Text>
            </View>
            <FlatList
                data={crawlingData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    itemContainer: {
        flexDirection: 'column',  // 수정된 부분
        justifyContent: 'space-between',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: '3%'
    },
    itemDate: {
        fontSize: 14,
        color: '#000',
    },
    itemTitle: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        flexShrink: 1,  // 수정된 부분
    },
});

export default CrawlingNotice;