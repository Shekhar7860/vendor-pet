/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import {View} from 'react-native';
import BottomNavigationItem from '../../components/BottomNavigationItem';
import {ACCOUNT, APPOINTMENTS, DASHBOARD, PET_SHOPS} from '../../images';
import {WHITE} from '../../utils/Colors';

const BottomNavigation = props => {
  const {selectedValue} = props;
  return (
    <View
      style={{
        backgroundColor: WHITE,
        flex: 1,
        flexDirection: 'row',
        borderTopLeftRadius: 30,
        borderTopEndRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}>
      <BottomNavigationItem
        onPress={() => props.updateSelectedValue(1)}
        isSelected={selectedValue === 1 || selectedValue === 5}
        text="Home"
        icon={DASHBOARD}
      />

      <BottomNavigationItem
        onPress={() => props.updateSelectedValue(2)}
        isSelected={selectedValue === 2}
        text="Appointments"
        icon={APPOINTMENTS}
      />

      <BottomNavigationItem
        onPress={() => props.updateSelectedValue(3)}
        isSelected={selectedValue === 3}
        text="Pet Shops"
        icon={PET_SHOPS}
      />

      <BottomNavigationItem
        onPress={() => props.updateSelectedValue(4)}
        isSelected={selectedValue === 4}
        text="Account"
        icon={ACCOUNT}
      />
    </View>
  );
};

export default BottomNavigation;
