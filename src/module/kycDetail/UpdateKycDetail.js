/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Header } from '../../common/Header';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { OVButton } from '../../components/OVButton';
import OVText, { medium, poppinsSemiBold } from '../../components/OVText';
import { OVTextInput } from '../../components/OVTextInput';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import Toast from 'react-native-root-toast';
import {
  APP_THEME_COLOR,
  BG_COLOR,
  GRAY_200,
  GRAY_300,
  GRAY_400,
  ORANGE,
  WHITE,
} from '../../utils/Colors';
import { CAMERA, GALLERY, APP_LOGO_1 } from '../../images';
import ImagePicker from '../../components/ImagePicker';

const UpdateKycDetail = props => {
  const navigation = useNavigation();
  const { user, token, setProfileStatus } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [panCard, setPanCard] = useState('');
  const [aadharCard, setAadhar] = useState('');
  const [clinicCertificate, setClinicCertificate] = useState('');
  const [businessCertificate, setBusinessCertificate] = useState('');
  const [gstCertificate, setGstCertificate] = useState('');
  const [imageType, setImageType] = useState(1);
  const [showImagePickerDialog, setShowImagePickerDialog] = useState(false);

  useEffect(() => {
    getAllDocuments();
  }, []);

  const getAllDocuments = () => {
    setLoading(true);
    Network('user/get-vendor-documents', 'get', null, token)
      .then(async res => {
        console.log(' /n/n Result ', JSON.stringify(res));
        const data = res.data;
        setAadhar(
          data.aadhar_card != null && data.aadhar_card != ''
            ? data.aadhar_card
            : '',
        );
        setPanCard(
          data.pan_card != null && data.pan_card != '' ? data.pan_card : '',
        );
        setClinicCertificate(
          data.clinic_certificate != null && data.clinic_certificate != ''
            ? data.clinic_certificate
            : '',
        );
        setBusinessCertificate(
          data.business_certificate != null && data.business_certificate != ''
            ? data.business_certificate
            : '',
        );
        setGstCertificate(
          data.gst_certificate != null && data.gst_certificate != ''
            ? data.gst_certificate
            : '',
        );
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const updateKYCDetails = () => {
    if (panCard.length === 0) {
      alert('Please select pan card');
    } else if (user.user_type != 1 && aadharCard.length === 0) {
      alert('Please select aadhar card');
    } else if (user.user_type != 2 && clinicCertificate.length === 0) {
      alert('Please select clinic certiifcate');
    } else if (user.user_type != 1 && businessCertificate.length === 0) {
      alert('Please select business certificate');
    } else if (gstCertificate.length === 0) {
      alert('Please select gst certficate');
    } else {
      setLoading(true);
      let data = new FormData();
      data.append('pan_card', {
        uri: panCard,
        name: Date.parse(new Date()) + 'panCard.' + panCard.split('.').pop(),
        filename:
          Date.parse(new Date()) + 'panCard.' + panCard.split('.').pop(),
        // type: 'image/png',
        type: 'multipart/form-data',
      });
      if (user.user_type != 1) {
        data.append('aadhar_card', {
          uri: aadharCard,
          name:
            Date.parse(new Date()) +
            'aadharCard.' +
            aadharCard.split('.').pop(),
          filename:
            Date.parse(new Date()) +
            'aadharCard.' +
            aadharCard.split('.').pop(),
          // type: 'image/png',
          type: 'multipart/form-data',
        });
      }
      if (user.user_type != 2) {
        data.append('clinic_certificate', {
          uri: clinicCertificate,
          name:
            Date.parse(new Date()) +
            'clinicCertificate.' +
            clinicCertificate.split('.').pop(),
          filename:
            Date.parse(new Date()) +
            'clinicCertificate.' +
            clinicCertificate.split('.').pop(),
          // type: 'image/png',
          type: 'multipart/form-data',
        });
      }
      if (user.user_type != 1) {
        data.append('business_certificate', {
          uri: businessCertificate,
          name:
            Date.parse(new Date()) +
            'businessCertificate.' +
            businessCertificate.split('.').pop(),
          filename:
            Date.parse(new Date()) +
            'businessCertificate.' +
            businessCertificate.split('.').pop(),
          // type: 'image/png',
          type: 'multipart/form-data',
        });
      }
      data.append('gst_certificate', {
        uri: gstCertificate,
        name:
          Date.parse(new Date()) +
          'gstCertificate.' +
          gstCertificate.split('.').pop(),
        filename:
          Date.parse(new Date()) +
          'gstCertificate.' +
          gstCertificate.split('.').pop(),
        // type: 'image/png',
        type: 'multipart/form-data',
      });

      Network('user/save-vendor-documents', 'post', data, token)
        .then(async res => {
          console.log(' /n/n Result ', JSON.stringify(res));
          if (res.status == true) {
            showToastMessage(res.message);
            getProfileStatus();
          }
        })
        .catch(error => {
          setLoading(false);
          showToastMessage('Something went wrong.');
          // console.log(JSON.stringify(error));
        });
    }
  };

  const getProfileStatus = () => {
    Network('user/get-vendor-profile-status', 'get', null, token)
      .then(async res => {
        setLoading(false);
        if (res.status === true) {
          console.log(' \n\n Result ', JSON.stringify(res));
          setProfileStatus(res.data);
          if (!res.data.services) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'ServiceProvider' }],
            });
          } else if (!res.data.bank_details) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'BankAccountDetail' }],
            });
          } else if (!res.data.kyc_details) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'UpdateKycDetail' }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        }
        title="KYC Details"
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: WHITE,
            paddingTop: 10,
          }}>
          <View>
            <View
              style={{ alignItems: 'center', padding: 10, marginVertical: 20 }}>
              <OVText
                size={medium}
                fontType={poppinsSemiBold}
                color={APP_THEME_COLOR}
                style={{ marginBottom: 10 }}>
                Update KYC
              </OVText>
              <View
                style={{ width: '40%', height: 2, backgroundColor: ORANGE }}
              />
            </View>

            <View
              style={{
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <OVText
                size={medium}
                fontType={poppinsSemiBold}
                color={APP_THEME_COLOR}
                style={{
                  marginStart: 20,
                  marginBottom: 10,
                  flex: 1,
                }}>
                PAN Card
              </OVText>
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() => {
                  setImageType(1);
                  setShowImagePickerDialog(true);
                }}>
                <View
                  style={{
                    flex: 1,
                    height: 110,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderColor: GRAY_400,
                    borderWidth: 1,
                    margin: 10,
                  }}>
                  <Image
                    source={
                      panCard !== ''
                      ? panCard.split('.').pop() !== 'png' &&
                        panCard.split('.').pop() !== 'jpg' &&
                        panCard.split('.').pop() !== 'jpeg'
                        ? APP_LOGO_1 : {
                          uri: panCard
                        }
                      : CAMERA
                    }
                    style={
                      panCard !== ''
                        ? {
                          width: '100%',
                          height:
                            panCard.split('.').pop() !== 'png' &&
                              panCard.split('.').pop() !== 'jpg' &&
                              panCard.split('.').pop() !== 'jpeg'
                              ? '80%'
                              : '100%',
                          borderRadius: 10,
                          margin: 1,
                        }
                        : {}
                    }
                  />
                  {panCard.split('.').pop() !== 'png' &&
                    panCard.split('.').pop() !== 'jpg' &&
                    panCard.split('.').pop() !== 'jpeg' && (
                      <OVText
                        size={medium}
                        fontType={poppinsSemiBold}
                        color={APP_THEME_COLOR}>
                        {panCard.split('/').pop()}
                      </OVText>
                    )}
                </View>
              </TouchableOpacity>
            </View>

            {user.user_type != 1 && (
              <View
                style={{
                  paddingVertical: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: GRAY_300,
                }}>
                <OVText
                  size={medium}
                  fontType={poppinsSemiBold}
                  color={APP_THEME_COLOR}
                  style={{
                    marginStart: 20,
                    marginBottom: 10,
                    flex: 1,
                  }}>
                  Aadhar Card
                </OVText>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  activeOpacity={1}
                  onPress={() => {
                    setImageType(2);
                    setShowImagePickerDialog(true);
                  }}>
                  <View
                    style={{
                      flex: 1,
                      height: 110,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      borderColor: GRAY_400,
                      borderWidth: 1,
                      margin: 10,
                    }}>
                    <Image
                      source={
                        aadharCard !== ''
                          ? aadharCard.split('.').pop() !== 'png' &&
                            aadharCard.split('.').pop() !== 'jpg' &&
                            aadharCard.split('.').pop() !== 'jpeg'
                            ? APP_LOGO_1 : {
                              uri: aadharCard
                            }
                          : CAMERA
                      }
                      style={
                        aadharCard !== ''
                          ? {
                            width: '100%',
                            height:
                              aadharCard.split('.').pop() !== 'png' &&
                                aadharCard.split('.').pop() !== 'jpg' &&
                                aadharCard.split('.').pop() !== 'jpeg'
                                ? '80%'
                                : '100%',
                            borderRadius: 10,
                            margin: 1,
                          }
                          : {}
                      }
                    />
                    {aadharCard.split('.').pop() !== 'png' &&
                      aadharCard.split('.').pop() !== 'jpg' &&
                      aadharCard.split('.').pop() !== 'jpeg' && (
                        <OVText
                          size={medium}
                          fontType={poppinsSemiBold}
                          color={APP_THEME_COLOR}>
                          {aadharCard.split('/').pop()}
                        </OVText>
                      )}
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {user.user_type == 1 && (
              <View
                style={{
                  paddingVertical: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <OVText
                  size={medium}
                  fontType={poppinsSemiBold}
                  color={APP_THEME_COLOR}
                  style={{
                    marginStart: 20,
                    marginBottom: 10,
                    flex: 1,
                  }}>
                  Clinic Certificate
                </OVText>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  activeOpacity={1}
                  onPress={() => {
                    setImageType(3);
                    setShowImagePickerDialog(true);
                  }}>
                  <View
                    style={{
                      flex: 1,
                      height: 110,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      borderColor: GRAY_400,
                      borderWidth: 1,
                      margin: 10,
                    }}>
                    <Image
                      source={
                        clinicCertificate !== ''
                          ? { uri: clinicCertificate }
                          : CAMERA
                      }
                      style={
                        clinicCertificate !== ''
                          ? {
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                            margin: 1,
                          }
                          : {}
                      }
                    />

                    {clinicCertificate.split('.').pop() !== 'png' &&
                      clinicCertificate.split('.').pop() !== 'jpg' &&
                      clinicCertificate.split('.').pop() !== 'jpeg' && (
                        <OVText
                          size={medium}
                          fontType={poppinsSemiBold}
                          color={APP_THEME_COLOR}>
                          {clinicCertificate.split('/').pop()}
                        </OVText>
                      )}
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {user.user_type != 1 && (
              <View
                style={{
                  paddingVertical: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: GRAY_300,
                }}>
                <OVText
                  size={medium}
                  fontType={poppinsSemiBold}
                  color={APP_THEME_COLOR}
                  style={{
                    marginStart: 20,
                    marginBottom: 10,
                    flex: 1,
                  }}>
                  Veterinary practice registration certificate
                </OVText>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  activeOpacity={1}
                  onPress={() => {
                    setImageType(4);
                    setShowImagePickerDialog(true);
                  }}>
                  <View
                    style={{
                      flex: 1,
                      height: 110,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      borderColor: GRAY_400,
                      borderWidth: 1,
                      margin: 10,
                    }}>
                    <Image
                      source={
                        businessCertificate !== ''
                          ? businessCertificate.split('.').pop() !== 'png' &&
                            businessCertificate.split('.').pop() !== 'jpg' &&
                            businessCertificate.split('.').pop() !== 'jpeg'
                            ? APP_LOGO_1 : {
                              uri: businessCertificate
                            }
                          : CAMERA
                      }
                      style={
                        businessCertificate !== ''
                          ? {
                            width: '100%',
                            height:
                              businessCertificate.split('.').pop() !==
                                'png' &&
                                businessCertificate.split('.').pop() !==
                                'jpg' &&
                                businessCertificate.split('.').pop() !== 'jpeg'
                                ? '80%'
                                : '100%',
                            borderRadius: 10,
                            margin: 1,
                          }
                          : {}
                      }
                    />
                    {businessCertificate.split('.').pop() !== 'png' &&
                      businessCertificate.split('.').pop() !== 'jpg' &&
                      businessCertificate.split('.').pop() !== 'jpeg' && (
                        <OVText
                          size={medium}
                          fontType={poppinsSemiBold}
                          color={APP_THEME_COLOR}>
                          {businessCertificate.split('/').pop()}
                        </OVText>
                      )}
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <OVText
                size={medium}
                fontType={poppinsSemiBold}
                color={APP_THEME_COLOR}
                style={{
                  marginStart: 20,
                  marginBottom: 10,
                  flex: 1,
                }}>
                GST Certificate
              </OVText>
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() => {
                  setImageType(5);
                  setShowImagePickerDialog(true);
                }}>
                <View
                  style={{
                    flex: 1,
                    height: 110,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderColor: GRAY_400,
                    borderWidth: 1,
                    margin: 10,
                  }}>
                  <Image
                    source={
                      gstCertificate !== ''
                      ? gstCertificate.split('.').pop() !== 'png' &&
                        gstCertificate.split('.').pop() !== 'jpg' &&
                        gstCertificate.split('.').pop() !== 'jpeg'
                        ? APP_LOGO_1 : {
                          uri: gstCertificate
                        }
                      : CAMERA
                    }
                    style={
                      gstCertificate !== ''
                        ? {
                          width: '100%',
                          height:
                            gstCertificate.split('.').pop() !== 'png' &&
                              gstCertificate.split('.').pop() !== 'jpg' &&
                              gstCertificate.split('.').pop() !== 'jpeg'
                              ? '80%'
                              : '100%',
                          borderRadius: 10,
                          margin: 1,
                        }
                        : {}
                    }
                  />
                  {gstCertificate.split('.').pop() !== 'png' &&
                    gstCertificate.split('.').pop() !== 'jpg' &&
                    gstCertificate.split('.').pop() !== 'jpeg' && (
                      <OVText
                        size={medium}
                        fontType={poppinsSemiBold}
                        color={APP_THEME_COLOR}>
                        {gstCertificate.split('/').pop()}
                      </OVText>
                    )}
                </View>
              </TouchableOpacity>
            </View>

            <OVButton
              title="Save"
              color={APP_THEME_COLOR}
              textColor={WHITE}
              marginTop={20}
              marginBottom={20}
              onPress={() => updateKYCDetails()}
            />
          </View>
        </View>
      </ScrollView>
      <ImagePicker
        selectedImagePath={path => {
          setShowImagePickerDialog(false);
          switch (imageType) {
            case 1:
              setPanCard(path);
              break;
            case 2:
              setAadhar(path);
              break;
            case 3:
              setClinicCertificate(path);
              break;
            case 4:
              setBusinessCertificate(path);
              break;
            case 5:
              setGstCertificate(path);
              break;
          }
        }}
        dialogVisible={showImagePickerDialog}
        setDialogVisible={() => setShowImagePickerDialog(false)}
      />
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default UpdateKycDetail;
