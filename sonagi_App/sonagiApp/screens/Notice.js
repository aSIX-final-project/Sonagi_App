import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notice = () => {
  return (
    <View style={styles.container}>
      <Text>공지사항 화면입니다.</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  }
});
export default Notice