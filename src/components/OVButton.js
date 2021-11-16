/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {WHITE, BLACK, DARK_RED} from '../utils/Colors';
import {moderateScale} from '../utils/scaling';
import {poppinsSemiBold} from './OVText';
const windowWidth = Dimensions.get('window').width;

/**
 *
 * @param {*} props
 * This is
 */
export const OVButton = props => {
  const {
    title,
    onPress,
    paddingHorizontal,
    paddingVertical = 5,
    color = DARK_RED,
    textColor = WHITE,
    borderRadius = 10,
    elevation = 5,
    bottom = 0,
    marginTop = 0,
    fontSize = moderateScale(16),
    rightIcon,
    fontFamily = poppinsSemiBold,
    marginBottom,
    style,
    width = windowWidth - 80,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        ...style,
        marginTop: marginTop,
        alignSelf: 'center',
        marginBottom: marginBottom,
        width: width,
        ...Platform.select({
          ios: {
            shadowColor: 'rgba(0,0,0, 0.4)',
            shadowOffset: {height: 1, width: 1},
            shadowOpacity: 0.7,
            shadowRadius: 2,
          },
          android: {
            elevation: 2,
          },
        }),
      }}>
      <View
        style={{
          paddingHorizontal: paddingHorizontal,
          backgroundColor: color,
          paddingVertical: paddingVertical,
          borderRadius: borderRadius,
          elevation: elevation,
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.1,
          shadowRadius: 2,
          bottom: bottom,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: textColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            textAlign: 'center',
            paddingVertical: 6,
          }}>
          {title}
        </Text>
        {rightIcon && <Image source={rightIcon} marginStart={10} />}
      </View>
    </TouchableOpacity>
  );
};
