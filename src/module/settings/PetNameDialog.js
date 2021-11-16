/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, View, Image, TouchableOpacity} from 'react-native';
import {OVButton} from '../../components/OVButton';
import OVText, {
  large,
  medium,
  poppinsBold,
  poppinsRegular,
  poppinsSemiBold,
} from '../../components/OVText';
import {
  APP_THEME_COLOR,
  BLACK,
  GRAY_400,
  TEXT_COLOR_LIGHT,
  WHITE,
} from '../../utils/Colors';
import {CLOSE_DIALOG} from '../../images';

export default function PetNameDialog(props) {
  const {dialogVisible, setDialogVisible, data, selectedData, title} = props;

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
          <TouchableOpacity
            style={{alignSelf: 'flex-end', margin: 10}}
            activeOpacity={1}
            onPress={() => setDialogVisible(false)}>
            <Image source={CLOSE_DIALOG} />
          </TouchableOpacity>
          <OVText
            size={large}
            fontType={poppinsSemiBold}
            color={APP_THEME_COLOR}>
            Appointment
          </OVText>

          <OVText
            size={medium}
            fontType={poppinsRegular}
            color={TEXT_COLOR_LIGHT}
            style={{marginTop: 10}}>
            Your Appoinment will begin at
          </OVText>

          <View
            style={{
              width: '90%',
              height: 0.4,
              alignSelf: 'center',
              backgroundColor: GRAY_400,
              marginTop: 10,
              marginLeft: 6,
            }}
          />

          <OVText
            size={medium}
            fontType={poppinsRegular}
            color={BLACK}
            style={{padding: 10, marginTop: 10}}>
            On 6th May 2021
          </OVText>

          <OVText size={large} fontType={poppinsBold} color={BLACK}>
            9:00 PM
          </OVText>

          <OVButton
            title="CONFIRM"
            color={APP_THEME_COLOR}
            textColor={WHITE}
            marginTop={20}
            marginBottom={20}
            onPress={() => setDialogVisible(true)}
            width={100}
          />
        </View>
      </View>
    </Modal>
  );
}
