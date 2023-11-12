import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Donate = () => {
  return (
    <View style={styles.container}>
      <Text>기부내역 화면입니다.</Text>
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
export default Donate