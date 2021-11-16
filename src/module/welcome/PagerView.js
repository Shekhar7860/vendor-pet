/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PagerView from 'react-native-pager-view';
import {WELCOME_BANNER_1, WELCOME_BANNER_2} from '../../images';
import OVText, {
  medium,
  poppinsMedium,
  poppinsRegular,
  small,
} from '../../components/OVText';
import {WHITE} from '../../utils/Colors';
import WelcomeImageSlider from '../../flatListSlider/WelcomeImageSlider';
const Welcome = () => {
  const [sliderData, setSliderData] = useState([
    {image: WELCOME_BANNER_1, title: 'Hello 1'},
    {image: WELCOME_BANNER_2, title: 'Hello 2'},
  ]);

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1">
        <WelcomeImageSlider index={1} />
      </View>
      <View key="2">
        <WelcomeImageSlider index={2} />
      </View>
      <View></View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width: '100%',
  },
});

export default Welcome;
