/* eslint-disable react-native/no-inline-styles */

import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';
import {BACKGROUND_COLOR} from '../../utils/Colors';
import MyDashboard from '../dashboard/MyDashboard';
import NotificationDialog from '../dialog/NotificationDialog';
import messaging from '@react-native-firebase/messaging';
import {showToastMessage} from '../../utils';

const HomeScreen = props => {
  console.log(props, 'in home >>>>>>>>>>>>>');
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(1);
  const [isHomePage, setIsHomePage] = useState(true);
  const [toolbarText, setToolbarText] = useState('Home');
  const {user, token, setProfileStatus} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isValidData, setValidData] = useState(false);

  const [isNotificationRecieved, setIsNotificationRecieved] = useState(false);
  const [notificationData, setNotificationData] = useState({});

  useEffect(() => {
    getProfileStatus();

    // Register foreground handler
    messaging().onMessage(async remoteMessage => {
      console.log('Recieved Foreground- .>>>> ', JSON.stringify(remoteMessage));

      if (typeof remoteMessage.data != 'undefined') {
        if (typeof remoteMessage.data.room_name != 'undefined') {
          setNotificationData(remoteMessage.data);
          setIsNotificationRecieved(!isNotificationRecieved);
        }
      }
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'Recieved - Background .>>>> ',
        JSON.stringify(remoteMessage),
      );
      if (typeof remoteMessage.data != 'undefined') {
        if (typeof remoteMessage.data.room_name != 'undefined') {
          setNotificationData(remoteMessage.data);
          setIsNotificationRecieved(!isNotificationRecieved);
        }
      }
    });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Recieved onNotificationOpenedApp- .>>>> ',
        JSON.stringify(remoteMessage),
      );
      if (typeof remoteMessage.data != 'undefined') {
        if (typeof remoteMessage.data.room_name != 'undefined') {
          setNotificationData(remoteMessage.data);
          setIsNotificationRecieved(!isNotificationRecieved);
        }
      }
    });
  }, []);

  const getProfileStatus = () => {
    setLoading(true);
    Network('user/get-vendor-profile-status', 'get', null, token)
      .then(async res => {
        debugger;

        console.log('response getting profile', res);

        if (res.status === true) {
          console.log(' \n\n Result ', JSON.stringify(res));
          setProfileStatus(res.data);
          setLoading(false);
          if (!res.data.services) {
            navigation.reset({
              index: 0,
              routes: [{name: 'ServiceProvider'}],
            });
          } else if (!res.data.bank_details) {
            navigation.reset({
              index: 0,
              routes: [{name: 'BankAccountDetail'}],
            });
          } else if (!res.data.kyc_details) {
            navigation.reset({
              index: 0,
              routes: [{name: 'UpdateKycDetail'}],
            });
          } else if (
            typeof res.data.profile_details != 'undefined' &&
            res.data.profile_details == false
          ) {
            navigation.reset({
              index: 0,
              routes: [{name: 'MyProfile'}],
            });
            //setValidData(true); // temorary
          } else {
            setValidData(true);
          }
        }
      })
      .catch(error => {
        console.log(error.message);
        setLoading(false);
        showToastMessage('Something went wrong.');
      });
  };

  const updateSelectedValue = index => {
    switch (index) {
      case 1:
        setToolbarText('Home');
        setIsHomePage(true);
        break;
      case 2:
        setToolbarText('Appointments');
        setIsHomePage(false);
        break;
      case 3:
        setToolbarText('Pet Store');
        setIsHomePage(false);
        break;
      case 4:
        setToolbarText('Account');
        setIsHomePage(false);
        break;
    }
    setSelectedValue(index);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {isValidData && (
        <View style={{flexDirection: 'column', flex: 1}}>
          {/* <Header
          isHome={isHomePage}
          navigation={props.navigation}
          onBackPressed={() => updateSelectedValue(1)}
          title={toolbarText}
          onSidemenuClick={() => navigation.navigate('PetProfile')}
        /> */}
          <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
            {selectedValue === 1 && (
              <MyDashboard
                navigation={props.navigation}
                updateSelectedValue={index => updateSelectedValue(index)}
                setSelectedValue={index => {
                  setIsHomePage(false);
                  updateSelectedValue(index);
                  setSelectedValue(index);
                }}
              />
            )}
          </View>
        </View>
      )}
      <NotificationDialog
        dialogVisible={isNotificationRecieved}
        setDialogVisible={() => setIsNotificationRecieved(false)}
        data={notificationData}
      />
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default HomeScreen;
