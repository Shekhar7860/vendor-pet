/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text} from 'react-native';
import {styleFontType, styleFontSize} from '../utils/typography';
import {BLACK} from '../utils/Colors';

export const poppinsBlack = 'poppinsBlack';
export const poppinsBoldItalic = 'poppinsBoldItalic';
export const poppinsBold = 'poppinsBold';
export const poppinsItalic = 'poppinsItalic';
export const poppinsLight = 'poppinsLight';
export const poppinsMedium = 'poppinsMedium';
export const poppinsMediumItalic = 'poppinsMediumItalic';
export const poppinsRegular = 'poppinsRegular';
// export const poppinsSemiBold = 'poppinsSemiBold';
export const poppinsSemiBoldItalic = 'poppinsSemiBoldItalic';

export const extraSmall = 'extraSmall';
export const small = 'small';
export const medium = 'medium';

export const large = 'large';
export const xLarge = 'xLarge';
export const xxLarge = 'xxLarge';

export default class OVText extends Component {
  getSize() {
    const {size} = this.props;
    switch (size) {
      case 'extraSmall':
        return styleFontSize.extraSmall;
      case 'small':
        return styleFontSize.small;
      case 'large':
        return styleFontSize.large;
      case 'xLarge':
        return styleFontSize.xLarge;
      case 'xxLarge':
        return styleFontSize.xxLarge;
      case 'medium':
        return styleFontSize.medium;
      default:
        return styleFontSize.medium;
    }
  }

  getType() {
    const {fontType} = this.props;
    switch (fontType) {
      case 'poppinsBlack':
        return styleFontType.poppinsBlack;
      case 'poppinsBoldItalic':
        return styleFontType.poppinsBoldItalic;
      case 'poppinsBold':
        return styleFontType.poppinsBold;
      case 'poppinsItalic':
        return styleFontType.poppinsItalic;
      case 'poppinsLight':
        return styleFontType.poppinsLight;
      case 'poppinsMedium':
        return styleFontType.poppinsMedium;
      case 'poppinsMediumItalic':
        return styleFontType.poppinsMediumItalic;
      case 'poppinsRegular':
        return styleFontType.poppinsRegular;
      // case 'poppinsSemiBold':
      //   // return styleFontType.poppinsSemiBold;
      //   return styleFontType.poppinsRegular;
      case 'poppinsSemiBoldItalic':
        return styleFontType.poppinsSemiBoldItalic;
      default:
        return styleFontType.poppinsRegular;
    }
  }

  getWiredStyle() {
    const {color} = this.props;
    return {
      borderWidth: 1,
      borderColor: color == null ? BLACK : color,
      borderRadius: 50,
      textAlign: 'center',
      paddingVertical: 1,
    };
  }

  render() {
    const {children, isWired, color, style, numberOfLines} = this.props;
    return (
      <Text
        numberOfLines={numberOfLines}
        {...this.props}
        style={[
          isWired ? this.getWiredStyle() : null,
          {
            color: color == null ? BLACK : color,
            flexWrap: 'wrap',
            includeFontPadding: false,
            ...this.getSize(),
            ...this.getType(),
            ...style,
          },
        ]}>
        {children}
      </Text>
    );
  }
}
