/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  View,
  Image,
} from 'react-native';
import {BANNER_PET_SHOP} from '../images';

const styles = StyleSheet.create({
  videoContainer: {
    width: 275,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  videoPreview: {
    width: 275,
    height: 175,
    resizeMode: 'cover',
    borderRadius: 10,
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
export default HealthImageSlider = ({item, imageKey, active}) => (
  <TouchableOpacity activeOpacity={1} style={[styles.videoContainer]}>
    <View style={[styles.imageContainer, styles.shadow]}>
      <Image style={styles.videoPreview} source={BANNER_PET_SHOP} />
    </View>
  </TouchableOpacity>
);
