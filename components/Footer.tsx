import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text>Some Buttons</Text>
      <Text>Some Buttons</Text>
      <Text>Some Buttons</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
   
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    borderColor: 'red',
    borderWidth: 1,
    padding: 16,
    backgroundColor: 'white',
  },
});
export default Footer;

