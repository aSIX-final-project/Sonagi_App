import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Linking, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const CrawlingNaver = ({ navigation, route }) => {
    const { userInfo } = route.params;
    const [crawlingData, setCrawlingData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/crawling/findNaver');
                console.log(response.data);
                setCrawlingData(response.data.list);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => Linking.openURL('https://finsupport.naver.com/subvention/search')}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>주제: {item.theme}</Text>
                <Text style={styles.itemTitle}>지역: {item.region}</Text>
                <Text style={styles.itemTitle}>부서: {item.department}</Text>
                <Text style={styles.itemTitle}>제목: {item.title}</Text>
                <Text style={styles.itemTitle}>해시태그: {item.hashtags}</Text>
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
                        fontSize: 24,
                        fontWeight: "bold",
                        fontFamily: "Play-Bold",
                        color: "#383838",
                    }}
                >
                    진행중인 소상공인 정책지원금 사업
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
    }, itemContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    itemTitle: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        flexShrink: 1,
    },
});

export default CrawlingNaver;