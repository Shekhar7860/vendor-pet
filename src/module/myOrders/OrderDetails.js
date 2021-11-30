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

const OrderDetails = props => {
  const order_id = props.route.params?.order_id || 0;
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
    console.log('order', order_id)
    setLoading(true);
    Network(
      'user/get-vendor-order-by-id/' + order_id,
      'get',
      null,
      token,
    )
      .then(async res => {
        console.log(' /n/n Result ', res.data);
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
        title="Order Details"
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            {/* <OVText
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
            </OVText> */}

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
                Name :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.p_name}
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
                Description :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.p_description}
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
                Rate :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData.p_rate}
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
                Discount :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                Rs. {bookingData?.discount}
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
                Weight :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.weight}
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
               Quantity :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.quantity}
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
                Order Id :
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
               Color :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.color}
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
                Size :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right', flexWrap: 'wrap' }}>
                {bookingData?.size}
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
                Payment Id. :
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.payment_id}
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
                Payment Status:
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={TEXT_COLOR_LIGHT}
                style={{ flex: 1, textAlign: 'right' }}>
                {bookingData?.payment_status}
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
                  Total Price:
                </OVText>
                <OVText
                  size={medium}
                  fontType={poppinsLight}
                  color={TEXT_COLOR_LIGHT}
                  style={{ flex: 1, textAlign: 'right', flexWrap: 'wrap' }}>
                  {bookingData?.total_price}
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

export default OrderDetails;
