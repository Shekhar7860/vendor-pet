import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 230,
    resizeMode: 'stretch',
  },
});

// eslint-disable-next-line no-undef
export default ChildItem = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  local,
  height,
}) => (
  <TouchableOpacity style={styles.container} onPress={() => onPress(index)}>
    <Image
      style={[styles.image, style, {height}]}
      source={local ? item[imageKey] : {uri: item[imageKey]}}
    />
  </TouchableOpacity>
);
