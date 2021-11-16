/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header } from '../../common/Header';
import { OVButton } from '../../components/OVButton';
import OVText, {
  large,
  medium,
  poppinsMedium,
  poppinsRegular,
} from '../../components/OVText';
import { OVTextInput } from '../../components/OVTextInput';
import DocumentPicker from 'react-native-document-picker';
import { CAMERA_SMALL, GALLERY_SMALL } from '../../images';
import {
  BG_COLOR,
  BLACK,
  DARK_RED,
  ORANGE,
  TEXT_COLOR_AUTH_TITLES,
  WHITE,
} from '../../utils/Colors';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import DateTimePicker from '../../common/DateTimePicker';
import ImagePicker from '../../components/ImagePicker';
import { parseDate, parseDateHiphenFormat } from '../../utils/BaseUtils';

const windowWidth = Dimensions.get('window').width;

const AppointmentDetail = props => {

  const { appointmentData, upadateAppointment } = props.route.params;
  const navigation = useNavigation();
  const { user, token } = useContext(AuthContext);
  const [isUpcoming, setIsUpcoming] = useState(1);
  const [folloupDate, setFolloupDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showImagePickerDialog, setShowImagePickerDialog] = useState(false);
  const [prescription, setPrescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [precriptionName, setPrescriptionName] = useState('');


  const endAppointment = () => {

    // setLoading(true);
    let data = new FormData();
    data.append('appointment_id', appointmentData.id);

    if (folloupDate) {
      data.append('follow_up_date', parseDateHiphenFormat(folloupDate));
    }
    if (precriptionName) {
      data.append('title', precriptionName);
    }

    if (prescription) {
      data.append('prescription', {
        uri: prescription,
        // name: Date.parse(new Date()) + 'prescriptionImage.png',
        // filename: 'prescriptionImage.png',
        name: precriptionName,
        filename: Date.parse(new Date()) + 'prescription.' + prescription.split('.').pop(),
        type: 'multipart/form-data',
      });
    }

    console.log(data, 'sending data to api')

    Network('user/complete-appointment', 'post', data, token)
      .then(async res => {
        console.log(' /n/n Result ', JSON.stringify(res));
        setLoading(false);
        showToastMessage(res.message);
        upadateAppointment();
        navigation.goBack();
      })
      .catch(error => {
        setLoading(false);
        showToastMessage(error);
      });
  };

  const onUploadDocumentPress = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      console.log('picked document is: ', res);

      setPrescription(res && res[0].uri)

    } catch (error) {
      console.log('document picker error: ', error);
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker, exit any  dialogs or menus and move on
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Appointments"
      />

      <ScrollView>
        <View style={{ flex: 1 }}>
          <View
            style={{
              margin: 10,
              flexDirection: 'column',
              backgroundColor: WHITE,
              marginTop: 30,
              elevation: 3,
              borderRadius: 25,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderColor: ORANGE,
              borderWidth: 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                Pet Owner:
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_AUTH_TITLES}>
                {appointmentData.pet_owner}
              </OVText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                Breed:
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_AUTH_TITLES}>
                {appointmentData.pet_breed}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                Pet Age:
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_AUTH_TITLES}>
                {appointmentData.pet_age} Years
              </OVText>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: WHITE,
              marginTop: 30,
              elevation: 3,
              borderRadius: 25,
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginHorizontal: 10,
              marginBottom: 10,
            }}>
            <OVText
              size={large}
              fontType={poppinsMedium}
              color={BLACK}
              style={{ textAlign: 'center' }}>
              Add Details
            </OVText>
            <View
              style={{
                backgroundColor: ORANGE,
                width: '30%',
                height: 5,
                marginHorizontal: 20,
                marginTop: 10,
                alignSelf: 'center',
                marginBottom: 20,
              }}
            />

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setShowDatePicker(true);
              }}>

              <OVTextInput
                editable={false}
                isBackground={true}
                value={parseDateHiphenFormat(folloupDate)}
                placeHolderText="Follow Up Date"
              />
            </TouchableOpacity>



            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={BLACK}
              style={{
                paddingVertical: 10,
                textAlign: 'center',
                flex: 1,
                marginStart: 10,
              }}>
              Precription name
            </OVText>

            <OVTextInput
              value={precriptionName}
              onChange={value =>
                setPrescriptionName(value)
              }
            />

            <View
              style={{
                backgroundColor: WHITE,
                elevation: 4,
                borderRadius: 20,
                marginTop: 20,
                flexDirection: 'column',
              }}>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={BLACK}
                style={{
                  paddingVertical: 10,
                  textAlign: 'center',
                  flex: 1,
                  marginStart: 10,
                }}>
                Upload Summary &amp; E Precription
              </OVText>

              <View
                style={{
                  backgroundColor: 'rgba(250, 164, 26, 0.2)',
                  padding: 10,
                  alignItems: 'center',
                  flexDirection: 'column',
                  marginTop: 20,
                }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 30 }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setShowImagePickerDialog(true)}
                    style={{
                      flex: 1,
                      padding: 10,
                      backgroundColor: WHITE,
                      borderRadius: 6,
                      alignItems: 'center',
                      marginEnd: 10,
                    }}>
                    <Image source={CAMERA_SMALL} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    // onPress={() => setShowImagePickerDialog(true)}
                    onPress={onUploadDocumentPress}

                    style={{
                      flex: 1,
                      padding: 10,
                      backgroundColor: WHITE,
                      borderRadius: 6,
                      alignItems: 'center',
                      marginEnd: 10,
                    }}>
                    <Image source={GALLERY_SMALL} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <OVButton
            title="End Consultation"
            color={DARK_RED}
            textColor={WHITE}
            marginTop={40}
            marginBottom={20}
            onPress={() => endAppointment()}
          />
        </View>
      </ScrollView>

      <DateTimePicker
        mode="date"
        show={showDatePicker}
        onDateSelectChange={selectedDate => {
          setShowDatePicker(false);
          setFolloupDate(selectedDate);
        }}
        value={folloupDate}
      />

      <ImagePicker
        selectedImagePath={path => {
          setShowImagePickerDialog(false);
          setPrescription(`file://${path}`);
        }}
        dialogVisible={showImagePickerDialog}
        setDialogVisible={() => setShowImagePickerDialog(false)}
      />

      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default AppointmentDetail;
