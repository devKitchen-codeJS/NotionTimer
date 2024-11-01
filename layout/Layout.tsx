import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Footer from '../components/Footer';

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <View style={styles.layout}>
      <Text style={styles.text}>Notification TimeTracker</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column', 
    backgroundColor: '#fff',
  },
  text: {
    textAlign:'center',
    fontSize: 30,
    fontWeight: '700',
    marginVertical: 16,
  },
  content: {
    flex: 1,
  },

});

export default Layout;