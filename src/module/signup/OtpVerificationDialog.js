/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {Modal, View} from 'react-native';
import {OVButton} from '../../components/OVButton';
import OVText, {
  large,
  medium,
  poppinsBold,
  poppinsRegular,
} from '../../components/OVText';
import {AuthContext} from '../../services/authProvider';
import {APP_THEME_COLOR, BLACK, WHITE} from '../../utils/Colors';
import {OVTextInput} from '../../components/OVTextInput';

export default function OtpVerificationDialog(props) {
  const navigation = useNavigation();
  const {user, token} = useContext(AuthContext);
  const [otp, setOtp] = useState('');

  const {dialogVisible, setDialogVisible, data, resendOtp} = props;

  console.log(JSON.stringify(data));

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
            paddingHorizontal: 10,
            paddingTop: 30,
          }}>
          <OVText
            size={large}
            fontType={poppinsBold}
            color={APP_THEME_COLOR}
            style={{textAlign: 'right'}}>
            Enter OTP
          </OVText>
          <OVTextInput
            keyboardType="number"
            style={{marginHorizontal: 10, flex: 1, marginTop: 20}}
            onChange={value => {
              setOtp(value);
            }}
            value={otp}
            placeHolderText="Enter OTP here"
            maxLength={6}
          />

          <View
            style={{
              alignItems: 'flex-end',
              marginTop: 10,
              width: '100%',
            }}>
            <OVText
              size={medium}
              fontType={poppinsBold}
              color={APP_THEME_COLOR}
              style={{textAlign: 'right'}}
              onPress={() => resendOtp()}>
              Resend OTP
            </OVText>
          </View>

          <OVButton
            title="VERIFY OTP"
            color={APP_THEME_COLOR}
            textColor={WHITE}
            marginTop={20}
            marginBottom={20}
            onPress={() => {
              setDialogVisible(otp);
            }}
            width={150}
          />
        </View>
      </View>
    </Modal>
  );
}
