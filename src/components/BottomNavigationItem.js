/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {HOME_ICON} from '../images';
import {APP_THEME_COLOR, GRAY_600} from '../utils/Colors';
import OVText from './OVText';
const BottomNavigationItem = props => {
  const {
    onPress = () => {},
    isSelected = false,
    icon = HOME_ICON,
    text = 'Home',
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{flex: 1}}
      onPress={() => onPress()}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Image
          source={icon}
          style={
            isSelected
              ? {
                  height: 20,
                  width: 20,
                  marginTop: 8,
                  tintColor: APP_THEME_COLOR,
                }
              : {height: 20, width: 20, marginTop: 8, tintColor: GRAY_600}
          }
        />
        <OVText
          size="extraSmall"
          fontType="poppinsRegular"
          color={isSelected ? APP_THEME_COLOR : GRAY_600}
          style={{marginTop: 4}}>
          {text.toUpperCase()}
        </OVText>
      </View>
    </TouchableOpacity>
  );
};

export default BottomNavigationItem;
