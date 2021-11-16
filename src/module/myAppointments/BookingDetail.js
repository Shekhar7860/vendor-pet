import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  Modal,
} from 'react-native';
import { Header } from '../../common/Header';
import OVText, {
  medium,
  poppinsLight,
  poppinsMedium,
} from '../../components/OVText';
import { CAMERA, CLINIC_LOCATION } from '../../images';
import {
  BG_COLOR,
  BLACK,
  GRAY_100,
  GRAY_800,
  GREEN_COLOR,
  TEXT_COLOR_LIGHT,
  WHITE,
  APP_THEME_COLOR,
} from '../../utils/Colors';
import ImagePicker from '../../components/ImagePicker';
import { AuthContext } from '../../services/authProvider';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { OVButton } from '../../components/OVButton';
import { showToastMessage } from '../../utils';

const windowWidth = Dimensions.get('window').width;

const BookingDetail = props => {
  const booking_id = props.route.params?.booking_id || 0;
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, token, setUser } = useContext(AuthContext);
  const [showImagePickerDialog, setShowImagePickerDialog] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [showImageModalDialog, setShowImageModalDialog] = useState(false);
  const [popupImage, setPopupImage] = useState('');
  useEffect(() => {
    // console.log("booking_id", booking_id);
    getBookingDeatil();
  }, []);
  const openDoc = (item) => {
    if (item?.document.split('.').pop() !== 'png' &&
      item?.document.split('.').pop() !== 'jpg' &&
      item?.document.split('.').pop() !== 'jpeg') {
      Linking.openURL(item?.document);
    }
  };
  const openMap = () => {
    if (
      typeof bookingData?.latitude != 'undefined' &&
      bookingData?.longitude != null &&
      bookingData?.latitude != '' &&
      typeof bookingData?.longitude != 'undefined' &&
      bookingData?.longitude != null &&
      bookingData?.longitude != ''
    ) {
      var lat = `${bookingData?.latitude}`; // '28.6077438';
      var long = `${bookingData?.longitude}`; // ',77.3674968';
      var zoom = ',17z';
      // const URL = `geo:${lat},${long}`//'https://www.google.com/maps/place/' + lat + long + '/@' + lat + long + zoom;
      const URL = Platform.select({
        ios: `maps:0,0?q=${lat},${long}`,
        android: `geo:0,0?q=${lat},${long}`,
      });
      console.error('/n/n/n/n map url', URL),
        Linking.openURL(`${URL}`).catch(err =>
          console.error('An error occurred', err),
        );
    }
  };

  const getBookingDeatil = () => {
    setLoading(true);
    Network(
      'user/get-book-appointment-detail?id=' + booking_id,
      'get',
      null,
      token,
    )
      .then(async res => {
        console.log(' /n/n Result ', JSON.stringify(res.data));
        if (res.status === true) {
          setLoading(false);
          setBookingData(res.data);
        } else {
          showToastMessage(res.message);
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        showToastMessage('Something went wrong.');
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Appointment Booked"
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GRAY_800}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: GRAY_100,
                textAlign: 'center',
              }}>
              Booking Details
            </OVText>

            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: WHITE,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  width: '50%',
                }}>
                Pet Name :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.pet_name}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: WHITE,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  width: '50%',
                }}>
                Doctor Name :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.doctor_name}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: WHITE,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  width: '50%',
                }}>
                Appointment Type :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.appointment_type === 1
                  ? ' Vet online Consultation'
                  : bookingData?.appointment_type === 2
                    ? ' Vet Appointment Consultation'
                    : bookingData?.appointment_type === 3
                      ? ' Vet Appointment Doorstep'
                      : bookingData?.appointment_type === 4
                        ? ' Vaccine at Clinic'
                        : bookingData?.appointment_type === 5
                          ? ' Vaccine at Doorstep'
                          : ''}
              </OVText>
            </View>

            {(bookingData?.appointment_type == 4 ||
              bookingData?.appointment_type == 5) && (
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: WHITE,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                  }}>
                  <OVText
                    size={medium}
                    fontType={poppinsLight}
                    color={GRAY_800}
                    style={{
                      width: '50%',
                    }}>
                    Vaccines
                  </OVText>
                  {/* { console.log("bookingData?.appointment_vaccines", bookingData?.appointment_vaccines) } */}
                  <OVText
                    size={medium}
                    fontType={poppinsLight}
                    color={TEXT_COLOR_LIGHT}
                    style={{ flex: 1, textAlign: 'right' }}>
                    {bookingData?.appointment_vaccines?.map(item => (
                      <Text key={Math.random()}>
                        {item?.vaccines?.name} {' | '}
                      </Text>
                    ))}
                  </OVText>
                </View>
              )}

            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: WHITE,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  width: '50%',
                }}>
                Amount :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                Rs. {bookingData?.amount}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: WHITE,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  width: '50%',
                }}>
                Date :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.date}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: WHITE,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  width: '50%',
                }}>
                Time :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.time}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: WHITE,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  width: '50%',
                }}>
                Order ID :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.order_id}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: WHITE,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  width: '50%',
                }}>
                Doorstep :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.is_doorstep == 0 ? 'NO' : 'YES'}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: WHITE,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  width: '50%',
                }}>
                Vendor Address :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right', flexWrap: 'wrap' }}>
                {bookingData?.vendor_address}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: WHITE,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  width: '50%',
                }}>
                Vendor House No. :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.vendor_house_no}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: WHITE,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  // flex: 1,
                  width: '50%',
                }}>
                Vendor Landmark :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.vendor_landmark}
              </OVText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: WHITE,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  flexWrap: 'wrap',
                  flexShrink: 1,
                }}
                activeOpacity={0.9}
                onPress={() => openMap()}>
                <OVText
                  size={medium}
                  fontType={poppinsLight}
                  color={GRAY_800}
                  style={{
                    width: '50%',
                  }}>
                  User Address :
                </OVText>
                <OVText
                  size={medium}
                  fontType={poppinsLight}
                  color={TEXT_COLOR_LIGHT}
                  style={{ flex: 1, textAlign: 'right', flexWrap: 'wrap' }}>
                  <Image source={CLINIC_LOCATION} /> {` `}  {bookingData?.address}
                </OVText>
              </TouchableOpacity>
            </View>

            {bookingData?.pet_reports &&
              bookingData?.pet_reports.length &&
              bookingData?.pet_reports.map(item => (
                <View key={item?.id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      backgroundColor: WHITE,
                      borderBottomWidth: 1,
                      borderBottomColor: '#ddd',
                    }}>
                    <OVText
                      size={medium}
                      fontType={poppinsLight}
                      color={GRAY_800}
                      style={{
                        // flex: 1,
                        width: '50%',
                      }}>
                      Prescription :
                    </OVText>
                    <TouchableOpacity onPress={() => {
                      openDoc(item);
                    }}>
                      <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={TEXT_COLOR_LIGHT}
                        style={{ flex: 1, textAlign: 'right' }}>


                        {item?.title}

                      </OVText>
                    </TouchableOpacity>

                  </View>
                  {item?.document &&
                    !(item?.document.split('.').pop() !== 'png' &&
                      item?.document.split('.').pop() !== 'jpg' &&
                      item?.document.split('.').pop() !== 'jpeg') && (
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 10,
                          backgroundColor: WHITE,
                          borderBottomWidth: 1,
                          borderBottomColor: '#ddd',
                        }}>
                        <TouchableOpacity
                          style={{ flex: 1 }}
                          activeOpacity={1}
                          onPress={() => {
                            setShowImageModalDialog(true);
                            console.log('/n/n/n-', item?.document)
                            setPopupImage(item.document);
                          }}>
                          <View
                            style={{
                              flex: 1,
                              height: 110,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 10,
                              borderWidth: 1,
                              margin: 10,
                            }}>
                            <Image
                              source={{ uri: item.document }}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 10,
                                margin: 1,
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                </View>
              ))}

            <OVButton
              title="Back"
              color={APP_THEME_COLOR}
              textColor={WHITE}
              marginTop={20}
              marginBottom={20}
              onPress={() => {
                navigation.goBack();
              }}
              width={windowWidth - 20}
            />
          </View>
        </ScrollView>
      </View>
      {showImageModalDialog && popupImage && (
        <Modal
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => {
            setShowImageModalDialog(false);
            setPopupImage('');
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              backgroundColor: 'rgba(52, 52, 52, 0.6)',
            }}>
            <Image
              source={{ uri: popupImage }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                margin: 1,
              }}
            />
          </View>
        </Modal>
      )}
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default BookingDetail;
