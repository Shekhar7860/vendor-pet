/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { BLACK, WHITE } from '../utils/Colors';
import OVText, { small } from '../components/OVText';

/**
 *
 * @param {*} props
 * This is a common header component among most of the screen.
 *
 */
export const CardAddDeleteButton = (props) => {
  const { onAddPress, count, onDeletePress } = props;

  const [] = useState(false);
  return (
    <View
      style={{
        flexDirection: 'row',
        marginEnd: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#40AA5C',
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 0,
        ...Platform.select({
          ios: {
            shadowColor: 'rgba(0,0,0, 0.4)',
            shadowOffset: { height: 1, width: 1 },
            shadowOpacity: 0.7,
            shadowRadius: 2,
          },
          android: {
            elevation: 2,
          },
        }),
      }}>
      <TouchableOpacity onPress={() => onDeletePress()} style={{ padding: 10 }}>
        <View style={{ backgroundColor: WHITE, height: 2.19, width: 10.12 }} />
      </TouchableOpacity>
      <OVText
        size={small}
        fontType="poppinsRegular"
        color={WHITE}
        style={{ textAlign: 'center', marginTop: 3 }}>
        {count === null ? '0' : count}
      </OVText>
      <TouchableOpacity onPress={() => onAddPress()} style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        {/* <OVText
          size="medium"
          fontType="poppinsBold"
          color={WHITE}
          style={{ paddingHorizontal: 4 }}>
          +
        </OVText> */}

        <View style={{ backgroundColor: WHITE, height: 2.19, width: 13.12 }} />
        <View style={{ position: 'absolute', backgroundColor: WHITE, height: 12.12, width: 2.19 }} />
      </TouchableOpacity>
    </View>
  );
};
