/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {ORANGE} from '../utils/Colors';
import {CLOSE_ICON} from '../images';

const DialogueHeader = ({title = 'Existing', onClose}) => {
  return (
    <View
      style={{
        backgroundColor: ORANGE,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{width: 45}} />
      <View style={{justifyContent: 'center'}}>
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
            fontFamily: 'Poppins-Regular',
          }}>
          {title}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          paddingVertical: 15,
          width: 45,
          alignItems: 'center',
        }}
        onPress={onClose}>
        <Image source={CLOSE_ICON} />
      </TouchableOpacity>
    </View>
  );
};

export default DialogueHeader;
