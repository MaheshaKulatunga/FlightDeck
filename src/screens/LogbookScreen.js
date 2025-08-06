import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogbookScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Aircraft Logbook</Text>
    </View>
  );
};

export default LogbookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
