/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Text,
} from 'react-native';
import { Header } from '../../common/Header';
import OVText, {
  medium,
  poppinsMedium,
  poppinsRegular,
  small,
} from '../../components/OVText';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import {
  APP_THEME_COLOR,
  BG_COLOR,
  BLACK,
  GRAY_400,
  LIGHT_GREEN,
  GREEN,
  GREEN_COLOR,
  ORANGE,
  TEXT_COLOR_AUTH_TITLES,
  WHITE,
  RED,
  MAROON,
} from '../../utils/Colors';
import EmptyView from '../../common/EmptyView';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { CROSS } from '../../images';

const windowWidth = Dimensions.get('window').width;

var appointmentListData;

const DoctorAppointment = props => {
  var doorStep = [3, 5, 7, 9];
  const [filters, setFilters] = useState([
    { filter_name: 'Upcoming', isActive: false, id: 1 },
    { filter_name: 'Complete', isActive: false, id: 2 },
    { filter_name: 'Follow Up', isActive: false, id: 3 },
  ]);
  const [refresh, setRefresh] = useState(false);

  const navigation = useNavigation();
  const [isUpcoming, setIsUpcoming] = useState(1);
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getMyAppointment();
  }, []);

  const getMyAppointment = (type = 1, filter = 'all') => {
    setLoading(true);
    Network(
      'user/get-doctor-appointment?type=' + type + '&filter=' + filter,
      'get',
      null,
      token,
    )
      .then(async res => {
        console.log(' /n/n Result ', JSON.stringify(res));
        setLoading(false);
        // appointmentListData = res.data;
        setCategoryData(res.data);
        // filterAppointmentList(res.data, 1);
      })
      .catch(error => {
        setLoading(false);
        showToastMessage('Something went wrong.');
      });
  };

  const getAppointmentName = type => {
    switch (type) {
      case 1:
        return 'Doctor';
      case 2:
        return 'Clinic';
      case 3:
        return 'Grooming';
    }
  };

  const filterAppointmentList = (data, type) => {
    resetDefaultFilters();
    getMyAppointment(type);

    // let filterArray = data.filter(function (e) {
    //     return e.appointment_type == type;
    // });
    // setCategoryData(filterArray);
  };

  const confirmCancelAppointment = appointmentData => {
    Alert.alert(
      'Confirm',
      'Are you sure to cancel this appointment?',
      [
        {
          text: 'Yes',
          onPress: () => cancelAppointment(appointmentData),
          style: 'cancel',
        },
        {
          text: 'No',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const cancelAppointment = appointmentData => {
    setLoading(true);
    let data = new FormData();
    data.append('appointment_id', appointmentData.id);
    Network('user/cancel-appointment', 'post', data, token)
      .then(async res => {
        console.log(' /n/n Result ', JSON.stringify(res));
        setLoading(false);
        showToastMessage(res.message);
        getMyAppointment();
      })
      .catch(error => {
        setLoading(false);
        showToastMessage('Something went wrong.');
      });
  };

  const resetDefaultFilters = index => {
    for (let i = 0; i < filters.length; i++) {
      filters[i].isActive = false;
    }
  };

  const updateFilters = index => {
    for (let i = 0; i < filters.length; i++) {
      filters[i].isActive = false;
    }

    filters[index].isActive = true;
    setFilters(filters);
    setRefresh(!refresh);
    getMyAppointment(isUpcoming, filters[index].id);
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        margin: 10,
        flexDirection: 'column',
        backgroundColor: WHITE,
        marginTop: 10,
        elevation: 3,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        // alignItems:'baseline'
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
          {'    '}
        </OVText>

        {item.appointment_status == 1 && (
          <OVText
            onPress={() => confirmCancelAppointment(item)}
            size={small}
            fontType={poppinsRegular}
            color={WHITE}
            style={{
              backgroundColor: RED,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 20,
              elevation: 3,
              textAlign: 'center',
            }}>
            Cancel
          </OVText>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('BookingDetail', { booking_id: item.id });
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
            {item.pet_owner}
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
            {item.pet_breed}
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
            {item.pet_age} Years
          </OVText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
            Appointment Type:
          </OVText>
          <OVText
            size={medium}
            fontType={poppinsRegular}
            color={TEXT_COLOR_AUTH_TITLES}>
            {item.appointment_type === 1
              ? ' Vet online Consultation'
              : item.appointment_type === 2
                ? ' Vet Appointment Consultation'
                : item.appointment_type === 3
                  ? ' Vet Appointment Doorstep'
                  : item.appointment_type === 4
                    ? ' Vaccine at Clinic'
                    : item.appointment_type === 5
                      ? ' Vaccine at Doorstep'
                      : ''}
          </OVText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
            Appointment Time:
          </OVText>
          <OVText
            size={medium}
            fontType={poppinsRegular}
            color={TEXT_COLOR_AUTH_TITLES}>
            {item.time}
          </OVText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
            Appointment Date:
          </OVText>
          <OVText
            size={medium}
            fontType={poppinsRegular}
            color={TEXT_COLOR_AUTH_TITLES}>
            {item.date}
          </OVText>
        </View>

        {typeof item.appointment_type &&
          item.appointment_type != '' &&
          doorStep.includes(item.appointment_type) && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <OVText
                  size={medium}
                  fontType={poppinsMedium}
                  color={BLACK}
                  style={{ width: '50%' }}>
                  Address:
                </OVText>
                <OVText
                  numberOfLines={2}
                  style={{ flex: 1, textAlign: 'right' }}
                  size={medium}
                  fontType={poppinsRegular}
                  color={TEXT_COLOR_AUTH_TITLES}>
                  {typeof item.address != 'undefined' ? item.address : null}
                </OVText>
              </View>

              {/* <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                            House No:
                        </OVText>
                        <OVText
                            size={medium}
                            fontType={poppinsRegular}
                            color={TEXT_COLOR_AUTH_TITLES}>
                            {typeof item.house_no != "undefined" ? item.house_no : null}
                        </OVText>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                            Landmark:
                        </OVText>
                        <OVText
                            size={medium}
                            fontType={poppinsRegular}
                            color={TEXT_COLOR_AUTH_TITLES}>
                            {typeof item.landmark != "undefined" ? item.landmark : null}
                        </OVText>
                    </View> */}
            </View>
          )}
      </TouchableOpacity>

      {(item.appointment_status == 1 || item.appointment_status == 4) && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            position: 'relative',
          }}>
          {item.appointment_status == 1 && (
            <OVText
              onPress={() => {
                if (
                  item?.is_rescheduled == null ||
                  item?.is_rescheduled == '' ||
                  item?.is_rescheduled == 0
                ) {
                  navigation.navigate('BookAppointments', {
                    appointmentData: item,
                    upadateAppointment: () => {
                      getMyAppointment();
                    },
                  });
                } else {
                  showToastMessage('You have already reschedule.');
                }
              }}
              size={small}
              fontType={poppinsRegular}
              color={WHITE}
              style={{
                backgroundColor: ORANGE,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 20,
                elevation: 3,
                textAlign: 'center',
              }}>
              Rechedule
            </OVText>
          )}

          <OVText
            onPress={() =>
              navigation.navigate('AppointmentDetail', {
                appointmentData: item,
                upadateAppointment: () => {
                  getMyAppointment();
                },
              })
            }
            size={small}
            fontType={poppinsRegular}
            color={WHITE}
            style={{
              backgroundColor: APP_THEME_COLOR,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 20,
              elevation: 3,
              flex: 1,
              marginHorizontal: 10,
              textAlign: 'center',
            }}>
            Start Consultation
          </OVText>

          <OVText
            onPress={() => navigation.navigate('Chat', { itemData: item })}
            size={small}
            fontType={poppinsRegular}
            color={WHITE}
            style={{
              backgroundColor: LIGHT_GREEN,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
              elevation: 3,
              textAlign: 'center',
            }}>
            Chat
          </OVText>

          {item?.chatCount > 0 && (
            <OVText
              style={{
                height: 10,
                width: 10,
                backgroundColor: GREEN,
                position: 'absolute',
                right: -0,
                top: 0,
                borderRadius: 20,
                zIndex: 9,
                elevation: 5,
              }}></OVText>
          )}
        </View>
      )}

      {item.appointment_status == 2 && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <OVText
            onPress={() => { }}
            size={small}
            fontType={poppinsRegular}
            color={WHITE}
            style={{
              backgroundColor: MAROON,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 20,
              elevation: 3,
              flex: 1,
              marginHorizontal: 10,
              textAlign: 'center',
            }}>
            Cancelled
          </OVText>
        </View>
      )}

      {item.appointment_status == 3 && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <OVText
            onPress={() => { }}
            size={small}
            fontType={poppinsRegular}
            color={WHITE}
            style={{
              backgroundColor: GREEN_COLOR,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 20,
              elevation: 3,
              flex: 1,
              marginHorizontal: 10,
              textAlign: 'center',
            }}>
            Completed
          </OVText>
        </View>
      )}
    </View>
  );

  const renderFilter = ({ item, index }) => (
    <View>
      {(item.filter_name != 'Follow Up' || isUpcoming != 2) && (
        <TouchableOpacity
          onPress={() => {
            updateFilters(index);
          }}
          activeOpacity={1}
          style={{
            flex: 1,
            margin: 6,
            borderRadius: 30,
            flexDirection: 'column',
            backgroundColor: item.isActive ? APP_THEME_COLOR : WHITE,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 10,
            marginBottom: 30,
            marginHorizontal: 5,
            elevation: 1,
          }}>
          <OVText
            size={small}
            fontType={poppinsMedium}
            color={item.isActive ? WHITE : BLACK}>
            {item.filter_name}
          </OVText>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Appointments"
      />

      <View
        style={{
          borderBottomStartRadius: 30,
          borderBottomEndRadius: 30,
          backgroundColor: WHITE,
          elevation: 1,
          flexDirection: 'row',
          zIndex: 1,
        }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => {
            setIsUpcoming(1);
            filterAppointmentList(appointmentListData, 1);
          }}>
          <View>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={APP_THEME_COLOR}
              style={{ textAlign: 'center', padding: 10 }}>
              Online
            </OVText>
            <View
              style={{
                backgroundColor: isUpcoming === 1 ? ORANGE : WHITE,
                width: '70%',
                height: 5,
                marginHorizontal: 20,
              }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ backgroundColor: GRAY_400, width: 1, height: '100%' }} />
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => {
            setIsUpcoming(2);
            filterAppointmentList(appointmentListData, 2);
          }}>
          <View>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={APP_THEME_COLOR}
              style={{ textAlign: 'center', padding: 10 }}>
              Physical
            </OVText>
            <View
              style={{
                backgroundColor: isUpcoming === 2 ? ORANGE : WHITE,
                width: '70%',
                height: 5,
                marginHorizontal: 20,
              }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ backgroundColor: GRAY_400, width: 1, height: '100%' }} />

        {typeof user.user_type != 'undefined' && user.user_type != 2 && (
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => {
              setIsUpcoming(3);
              filterAppointmentList(appointmentListData, 3);
            }}>
            <View>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={APP_THEME_COLOR}
                style={{ textAlign: 'center', padding: 10 }}>
                Vaccination
              </OVText>
              <View
                style={{
                  backgroundColor: isUpcoming === 3 ? ORANGE : WHITE,
                  width: '60%',
                  height: 5,
                  marginStart: 20,
                  marginEnd: 20,
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView>
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={filters}
            renderItem={renderFilter}
            keyExtractor={item => item.id}
            horizontal={true}
            extraData={refresh}
          />
        </View>
      </ScrollView>

      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: WHITE,
          }}>
          <FlatList
            data={categoryData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{ marginTop: 10 }}
            ListEmptyComponent={
              <EmptyView title="No data found" textColor={BLACK} />
            }
          />
        </View>
      </ScrollView>
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default DoctorAppointment;
