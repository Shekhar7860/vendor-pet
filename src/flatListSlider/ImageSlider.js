/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  View,
} from 'react-native';
import {FAVOURITES} from '../images';

const styles = StyleSheet.create({
  videoPreview: {
    width: 275,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
    overflow: 'hidden',
    marginRight: 1,
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

// eslint-disable-next-line no-undef
export default ImageSlider = ({item, imageKey, active}) => (
  <View>
    {console.log(JSON.stringify(item))}
    <Image
      style={[styles.videoPreview, active ? {borderRadius: 10} : {height: 150}]}
      source={{
        uri:
          'http://staging.mansionly.com/media/images/master-execution-images/370X270/' +
          item.img,
      }}
    />
    <View
      style={{
        width: '100%',
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 10,
      }}>
      <Image source={FAVOURITES} style={{width: 20, height: 20}} />
    </View>
  </View>
);
