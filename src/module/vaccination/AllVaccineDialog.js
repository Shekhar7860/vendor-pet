/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, Modal, TouchableOpacity, View} from 'react-native';
import {OVButton} from '../../components/OVButton';
import OVText, {medium, poppinsRegular} from '../../components/OVText';
import {OVTextInput} from '../../components/OVTextInput';
import {CLOSE_DIALOG} from '../../images';
import {APP_THEME_COLOR, BLACK, RED, WHITE} from '../../utils/Colors';

export default function AllVaccineDialog(props) {
  const {dialogVisible, setDialogVisible} = props;

  const [vaccineName, setVaccineName] = useState(false);
  const [vaccinePrice, setVaccinePrice] = useState(false);
  const [error, setError] = useState(false);

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
            borderRadius: 20,
            elevation: 4,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: APP_THEME_COLOR,
              padding: 10,
              borderTopLeftRadius: 20,
              borderTopEndRadius: 20,
              alignItems: 'center',
            }}>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={WHITE}
              style={{flex: 1, marginLeft: 10}}>
              Add Vaccine
            </OVText>
            <TouchableOpacity
              style={{margin: 10}}
              activeOpacity={1}
              onPress={() => setDialogVisible(false)}>
              <Image source={CLOSE_DIALOG} style={{tintColor: WHITE}} />
            </TouchableOpacity>
          </View>
          <View style={{margin: 20}}>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={BLACK}
              style={{marginTop: 10}}>
              Vaccine Name
            </OVText>
            <OVTextInput
              editable={true}
              isBackground={true}
              placeHolderText=""
              value={vaccineName}
              onChange={value => setVaccineName(value)}
            />
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={BLACK}
              style={{marginTop: 20}}>
              Vaccine Price
            </OVText>
            <OVTextInput
              editable={true}
              keyboardType="number"
              isBackground={true}
              placeHolderText=""
              value={vaccinePrice}
              onChange={value => setVaccinePrice(value)}
            />

            {error && (
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={RED}
                style={{marginTop: 10}}>
                Please enter valid data
              </OVText>
            )}

            <OVButton
              title="Save"
              color={APP_THEME_COLOR}
              textColor={WHITE}
              marginTop={20}
              marginBottom={20}
              onPress={() => {
                if (vaccineName && vaccinePrice) {
                  setError(false);
                  setDialogVisible(true, vaccineName, vaccinePrice);
                  setVaccineName('');
                  setVaccinePrice('');
                } else {
                  setError(true);
                }
              }}
              width={200}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
