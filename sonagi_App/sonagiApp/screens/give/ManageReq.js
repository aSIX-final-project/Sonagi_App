import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import BottomsheetAC from "./BottomsheetAc";
import axios from "axios";
const ManageReq = ({ navigation, route }) => {
  const { userInfo } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  



  const pressButton = (selectedItem) => {
    setSelectedItem(selectedItem);
    setModalVisible(true);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          "https://port-0-sonagi-app-project-1drvf2lloka4swg.sel5.cloudtype.app/boot/admin/findAll"
        );
        console.log(response.data);
        setDataList(response.data);
      } catch (error) {
        console.error("Cannot fetch data: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("ManagePage", { userInfo: userInfo })}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../assets/backkey.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          사용자 요청 관리
        </Text>
      </View>

      <Text style={styles.subtitle}>
        총 {dataList.length}건의 요청사항이 있습니다.
      </Text>
      <View style={styles.separator1} />
      <ScrollView style={styles.scrollView}>
        {dataList.map((item, index) => (
          <View key={index} style={styles.qwer}>
            <TouchableOpacity key={index} style={styles.scrollView2} onPress={() => pressButton(item)}>
              <View style={styles.row}>
                <Text style={styles.requestTitle}>
                  {item.introduction === null ? `${item.adName} 식당 수정 요청` : `${item.adName} 시설 수정 요청`}
                </Text>
              </View>
              <Text style={styles.date}>
                {item.adTel}
              </Text>
              <View style={styles.separator2} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.rootContainer}>
        <BottomsheetAC
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
          selectedItem={selectedItem}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFC",
  },
  topView: {
    backgroundColor: "#44A5FF",
    width: "100%",
    height: "40%",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "10%",
    marginTop: "10%",
  },
  backButton: {
    marginLeft: "6%",
    marginRight: "2%",
  },
  backImage: {
    width: 50,
    height: 50,
  },
  title: {
    fontFamily: "Play-Bold",
    fontSize: 25,
    color: "white",
  },
  subtitle: {
    fontFamily: "Play-Regular",
    fontSize: 18,
    color: "#8B8E90",
    marginTop: "5%",
    marginRight: "35%",
  },
  separator1: {
    borderBottomWidth: 1,
    borderBottomColor: "#7D7D7D",
    width: "89.5%",
    marginTop: "1.5%",
    marginBottom: "1.5%",
  },
  separator2: {
    borderBottomWidth: 1,
    borderBottomColor: "#7D7D7D",
    width: "115%",
    marginTop: "0.5%",
  },
  scrollView: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    height: "80%",
  },
  scrollView2: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",

  },
  requestTitle: {
    fontFamily: "Play-Bold",
    fontSize: 20,
    color: "#656565",
    marginTop: "2%",
  },
  date: {
    fontFamily: "Play-Regular",
    fontSize: 15,
    color: "#8B8E90",
    marginTop: "1%",
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  qwer: {
    height: "56%",
  }
});
export default ManageReq;