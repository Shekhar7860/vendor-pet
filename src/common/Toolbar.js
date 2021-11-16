/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {DARK_RED, WHITE} from '../utils/Colors';
import {BACK_ARROW} from '../images';
import OVText from '../components/OVText';

/**
 *
 * @param {*} props
 * This is a common header component among most of the screen.
 *
 */
export const Toolbar = (props) => {
  const {title, onBackPressed} = props;

  const [] = useState(false);
  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: DARK_RED,
          padding: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => onBackPressed()}>
          <Image
            source={BACK_ARROW}
            resizeMode="contain"
            style={{padding: 2, width: 20, height: 20}}
          />
        </TouchableOpacity>
        <OVText
          size="medium"
          fontType="poppinsRegular"
          color={WHITE}
          style={{marginStart: 20}}>
          {title}
        </OVText>
      </View>
    </View>
  );
};
