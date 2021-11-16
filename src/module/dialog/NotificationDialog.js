/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Modal, View} from 'react-native';
import {OVButton} from '../../components/OVButton';
import OVText, {medium, poppinsRegular} from '../../components/OVText';
import {APP_THEME_COLOR, BLACK, WHITE} from '../../utils/Colors';
import {AuthContext} from '../../services/authProvider';

export default function NotificationDialog(props) {
  const navigation = useNavigation();
  const {user, token, mesiboToken, mesiboId} = useContext(AuthContext);

  const {dialogVisible, setDialogVisible, data} = props;

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
            padding: 10,
          }}>
          <OVText
            size={medium}
            fontType={poppinsRegular}
            color={BLACK}
            style={{padding: 10, marginTop: 10}}>
            Video Call
          </OVText>

          {/* <OVText size={large} fontType={poppinsBold} color={BLACK}>
            {data.body}
          </OVText> */}

          <OVButton
            title="CONFIRM"
            color={APP_THEME_COLOR}
            textColor={WHITE}
            marginTop={20}
            marginBottom={20}
            onPress={() => {
              setDialogVisible(true);
              navigation.navigate('VideoCall', {
                roomName: data.room_name,
                authToken: token,
                userId: user.id,
              });
            }}
            width={100}
          />
        </View>
      </View>
    </Modal>
  );
}
