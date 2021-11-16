/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Modal, TouchableOpacity, View} from 'react-native';
import OVText, {
  large,
  medium,
  poppinsRegular,
  poppinsSemiBold,
} from '../../components/OVText';
import {CLOSE_DIALOG} from '../../images';
import {APP_THEME_COLOR, BLACK, GRAY_400} from '../../utils/Colors';

export default function VendorRoleDialog(props) {
  const {dialogVisible, setDialogVisible, selectedValue} = props;

  return (
    <Modal
      visible={dialogVisible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={() => {
        dialogVisible;
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'rgba(52, 52, 52, 0.6)',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '80%',
            alignItems: 'center',
            borderRadius: 20,
            elevation: 4,
            flexDirection: 'column',
            padding: 10,
          }}>
          <View style={{flexDirection: 'row', margin: 10}}>
            <OVText
              size={large}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{flex: 1}}>
              Role Type
            </OVText>
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              activeOpacity={1}
              onPress={() => setDialogVisible(false)}>
              <Image source={CLOSE_DIALOG} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              height: 0.4,
              alignSelf: 'center',
              backgroundColor: GRAY_400,
              marginTop: 10,
            }}
          />

          <OVText
            onPress={() => selectedValue({id: 1, value: 'Clinic'})}
            size={medium}
            fontType={poppinsRegular}
            color={BLACK}
            style={{padding: 10, marginTop: 10}}>
            Clinic
          </OVText>
          <OVText
            onPress={() => selectedValue({id: 2, value: 'Veterinary'})}
            size={medium}
            fontType={poppinsRegular}
            color={BLACK}
            style={{padding: 10, marginTop: 10}}>
            Veterinary Doctor
          </OVText>
          <OVText
            onPress={() => selectedValue({id: 5, value: 'Pet Shop'})}
            size={medium}
            fontType={poppinsRegular}
            color={BLACK}
            style={{padding: 10, marginTop: 10}}>
            Pet Shop
          </OVText>
          <OVText
            onPress={() => selectedValue({id: 3, value: 'Training Center'})}
            size={medium}
            fontType={poppinsRegular}
            color={BLACK}
            style={{padding: 10, marginTop: 10}}>
            Training Center
          </OVText>
          <OVText
            onPress={() => selectedValue({id: 4, value: 'Grooming Center'})}
            size={medium}
            fontType={poppinsRegular}
            color={BLACK}
            style={{padding: 10, marginTop: 10}}>
            Grooming Center
          </OVText>
        </View>
      </View>
    </Modal>
  );
}
