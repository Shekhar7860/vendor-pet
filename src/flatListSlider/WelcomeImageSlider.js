/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import labels from '../assets/labels';
import OVText, {large, poppinsRegular} from '../components/OVText';
import {BLACK, WHITE} from '../utils/Colors';
import {WELCOME_BANNER_1, WELCOME_BANNER_2} from '../images';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
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
export default HealthImageSlider = ({item, index}) => (
  <TouchableOpacity activeOpacity={1} style={[styles.videoContainer]}>
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={index === 1 ? WELCOME_BANNER_1 : WELCOME_BANNER_2}
        style={{
          width: windowWidth,
          height: windowWidth / 2,
          resizeMode: 'contain',
        }}
      />
      <OVText
        size={large}
        fontType={poppinsRegular}
        color={BLACK}
        style={{marginTop: 20, width: '100%', textAlign: 'center'}}>
        {labels.petHealth}
      </OVText>
    </View>
  </TouchableOpacity>
);
