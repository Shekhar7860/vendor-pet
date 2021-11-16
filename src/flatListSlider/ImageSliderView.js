/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
        elevation: 3,
      },
    }),
  },
});

// eslint-disable-next-line no-undef
export default HealthImageSlider = ({item, imageKey, active}) => (
  <TouchableOpacity activeOpacity={1} style={[styles.videoContainer]}>
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={item.bannerImage}
        style={{
          width: windowWidth,
          height: windowWidth / 2,
          resizeMode: 'stretch',
        }}
      />
    </View>
  </TouchableOpacity>
);
