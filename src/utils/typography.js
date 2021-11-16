import {StyleSheet} from 'react-native';
import fonts from './fonts';
import {moderateScale} from './scaling';

// default font style used in project
export const styleFontType = StyleSheet.create({
  poppinsBlack: {
    fontFamily: fonts.poppinsBlack,
  },
  poppinsBoldItalic: {
    fontFamily: fonts.poppinsBoldItalic,
  },
  poppinsBold: {
    fontFamily: fonts.poppinsBold,
  },
  poppinsItalic: {
    fontFamily: fonts.poppinsItalic,
  },
  poppinsLight: {
    fontFamily: fonts.poppinsLight,
  },
  poppinsMedium: {
    fontFamily: fonts.poppinsMedium,
  },
  poppinsMediumItalic: {
    fontFamily: fonts.poppinsMediumItalic,
  },
  poppinsRegular: {
    fontFamily: fonts.poppinsRegular,
  },
  // poppinsSemiBold: {
  //   fontFamily: fonts.poppinsSemiBold,
  // },
  poppinsSemiBoldItalic: {
    fontFamily: fonts.poppinsSemiBoldItalic,
  },
});

export const styleFontSize = StyleSheet.create({
  extraSmall: {
    fontSize: moderateScale(10),
  },
  small: {
    fontSize: moderateScale(12),
  },
  medium: {
    fontSize: moderateScale(14),
  },
  large: {
    fontSize: moderateScale(16),
  },
  xLarge: {
    fontSize: moderateScale(19),
  },
  xxLarge: {
    fontSize: moderateScale(25),
  },
});
