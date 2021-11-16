/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {WHITE} from '../utils/Colors';
const windowHeight = Dimensions.get('window').height;

export default function EmptyView(props) {
  const {title, textColor = WHITE} = props;
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 16, color: textColor}}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
});
