/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import EmptyView from '../../common/EmptyView';
import {Header} from '../../common/Header';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import {OVButton} from '../../components/OVButton';
import OVText, {
  extraSmall,
  poppinsMedium,
  poppinsRegular,
  small,
} from '../../components/OVText';
import {BOTTOM_ARROW} from '../../images';
import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';
import {showToastMessage} from '../../utils';
import {
  getCurrentMonth,
  getWeekDayFromDate,
  parseMonth,
  parseDateHiphenFormat,
} from '../../utils/BaseUtils';
import {
  APP_THEME_COLOR,
  BG_COLOR,
  BLACK,
  TEXT_COLOR_BLUE,
  WHITE,
  YELLOW,
} from '../../utils/Colors';
import ConfirmAppointmentDialog from './ConfirmAppointmentDialog';

const windowWidth = Dimensions.get('window').width;
const DAY_ARRAY = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const BookAppointments = props => {
  const {appointmentData, upadateAppointment} = props.route.params;
  const navigation = useNavigation();
  const [confirmAppointmentDialog, setConfirmAppointmentDialog] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const {user, token, petProfileData} = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [shiftType, setShiftType] = useState(0);
  const [shiftList, setShiftList] = useState([]);
  const [doctorSlotData, setDoctorSlotData] = useState([]);
  const [categoryData, setCategoryData] = useState([
    {
      name: 'Morning',
      time: '9:00 AM to 12:00 PM',
      isSelect: true,
      id: 1,
    },
    {
      name: 'Afternoon',
      time: '12:00 PM to 04:00 PM',
      isSelect: false,
      id: 2,
    },
    {
      name: 'Evening',
      time: '04:00 PM to 06:00 PM',
      isSelect: false,
      id: 3,
    },
    {
      name: 'Night',
      time: '06:00 PM to 09:00 PM',
      isSelect: false,
      id: 4,
    },
  ]);

  useEffect(() => {
    getTimeSlot(date);
  }, []);

  const getTimeSlot = date => {
    setLoading(true);
    const payload = {doctor_id: user.id, day: getWeekDayFromDate(date)};
    Network('user/get-doctor-time-slot', 'post', payload, token)
      .then(async res => {
        console.log(' /n/n Result ', JSON.stringify(res.data));
        setLoading(false);
        const slotsArray = res.data;
        setDoctorSlotData(slotsArray);
        var data = [];
        for (let i = 0; i < slotsArray.length; i++) {
          if (slotsArray[i].slot === 1) {
            const payload = {time: slotsArray[i].from_time, isSelect: false};
            data.push(payload);
          }
        }
        setShiftList(data);
      })
      .catch(error => {
        setLoading(false);
        showToastMessage("Something went wrong.");
      });
  };

  const BookAppointmentAction = paymentKey => {
    setLoading(true);
    let data = new FormData();
    data.append('appointment_id', appointmentData.id);
    data.append('slot', getShiftValue().id);
    data.append('date', parseDateHiphenFormat(date));
    data.append('time', getTimeValue());

    Network('user/reschedule-appointment', 'post', data, token)
      .then(async res => {
        console.log(' \n\n Result ', JSON.stringify(res));
        if (res.status === true) {
          showToastMessage(res.message);
          setLoading(false);
          upadateAppointment();
          navigation.goBack();
        } else {
          showToastMessage(res.message);
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        showToastMessage("Something went wrong.");
      });
  };

  const getShiftValue = () => {
    for (let i = 0; i < categoryData.length; i++) {
      if (categoryData[i].isSelect === true) {
        return categoryData[i];
      }
    }
  };

  const getTimeValue = () => {
    if (shiftList.length > 0) {
      for (let i = 0; i < shiftList.length; i++) {
        if (shiftList[i].isSelect === true) {
          return shiftList[i].time;
        }
      }
    }
  };

  const isSlotSelected = () => {
    if (shiftList.length > 0) {
      for (let i = 0; i < shiftList.length; i++) {
        if (shiftList[i].isSelect === true) {
          return true;
        }
      }
    }

    return false;
  };

  const getShiftTypeArray = value => {
    var data = [];
    setShiftList([]);
    for (let i = 0; i < doctorSlotData.length; i++) {
      if (doctorSlotData[i].slot === value) {
        const payload = {time: doctorSlotData[i].from_time, isSelect: false};
        data.push(payload);
      }
    }
    setShiftList(data);
  };

  const resetAllValues = () => {
    for (let i = 0; i < categoryData.length; i++) {
      categoryData[i].isSelect = false;
    }
    setCategoryData(categoryData);
  };

  const resetAllShiftValues = () => {
    if (shiftList.length > 0) {
      for (let i = 0; i < shiftList.length; i++) {
        shiftList[i].isSelect = false;
      }
      setShiftList(shiftList);
    }
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={1}
      style={{flex: 1}}
      onPress={() => {
        getShiftTypeArray(index + 1);
        setShiftType(index + 1);
        resetAllValues();
        item.isSelect = true;
        setRefresh(!refresh);
      }}>
      <View
        style={{
          flex: 1,
          margin: 6,
          borderRadius: 30,
          flexDirection: 'column',
          backgroundColor: item.isSelect ? APP_THEME_COLOR : WHITE,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          marginTop: 10,
          marginHorizontal: 5,
          elevation: 1,
        }}>
        <OVText
          size={small}
          fontType={poppinsMedium}
          color={item.isSelect ? WHITE : BLACK}>
          {item.name}
        </OVText>

        <OVText
          size={extraSmall}
          fontType={poppinsRegular}
          color={item.isSelect ? WHITE : BLACK}>
          {item.time}
        </OVText>
      </View>
    </TouchableOpacity>
  );

  const renderTimeItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={1}
      style={{flex: 1}}
      onPress={() => {
        resetAllShiftValues();
        item.isSelect = true;
        setRefresh(!refresh);
      }}>
      <View
        style={{
          flex: 1,
          margin: 6,
          borderRadius: 30,
          flexDirection: 'column',
          backgroundColor: item.isSelect ? APP_THEME_COLOR : WHITE,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          marginTop: 10,
          marginHorizontal: 5,
          elevation: 1,
        }}>
        <OVText
          size={small}
          fontType={poppinsMedium}
          color={item.isSelect ? WHITE : BLACK}>
          {item.time}
        </OVText>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BG_COLOR}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Reschedule an Appointment"
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <View
            style={{
              alignItems: 'flex-end',
              marginEnd: 10,
              marginVertical: 10,
            }}>
            <View
              style={{
                borderRadius: 20,
                paddingVertical: 10,
                justifyContent: 'center',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: WHITE,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
              }}>
              <OVText
                size={small}
                fontType={poppinsMedium}
                color={BLACK}
                style={{textAlign: 'center'}}>
                {getCurrentMonth()}
              </OVText>
              <Image
                source={BOTTOM_ARROW}
                style={{marginStart: 10, tintColor: BLACK}}
              />
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: WHITE,
              borderRadius: 10,
              elevation: 4,
            }}>
            <CalendarPicker
              width={windowWidth}
              onDateChange={date => {
                setDate(date);
                getTimeSlot(date);
              }}
              previousTitle=" "
              nextTitle=" "
              onMonthChange={month => console.log(month)}
              weekdays={DAY_ARRAY}
              selectedDayColor={TEXT_COLOR_BLUE}
              selectedDayTextColor={WHITE}
              minDate={new Date()}
            />
          </View>

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: YELLOW,
              borderRadius: 10,
              elevation: 4,
              padding: 10,
            }}>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <OVText
                size={small}
                fontType={poppinsRegular}
                color={WHITE}
                style={{textAlign: 'left', flex: 1}}>
                {parseMonth(date)}
              </OVText>
              <OVText
                size={small}
                fontType={poppinsRegular}
                color={WHITE}
                style={{flex: 1, textAlign: 'right'}}>
                {getShiftValue().time}
              </OVText>
            </View>
            <FlatList
              data={categoryData}
              renderItem={renderItem}
              keyExtractor={item => item.time}
              numColumns={2}
              extraData={refresh}
            />
          </View>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: YELLOW,
              borderRadius: 10,
              elevation: 4,
              padding: 10,
            }}>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <OVText
                size={small}
                fontType={poppinsRegular}
                color={WHITE}
                style={{textAlign: 'left', flex: 1}}>
                {parseMonth(date)}
              </OVText>
              <OVText
                size={small}
                fontType={poppinsRegular}
                color={WHITE}
                style={{flex: 1, textAlign: 'center'}}>
                {shiftList.length > 0 ? getTimeValue() : ''}
              </OVText>
              {shiftList.length > 0 && (
                <OVText
                  size={small}
                  fontType={poppinsRegular}
                  color={WHITE}
                  style={{flex: 1, textAlign: 'right'}}>
                  {/* {shiftList[shiftType].time !== undefined
                    ? ''
                    : shiftList[shiftType].time} */}
                </OVText>
              )}
            </View>
            <FlatList
              data={shiftList}
              renderItem={renderTimeItem}
              keyExtractor={item => item.time}
              numColumns={2}
              extraData={refresh}
              ListEmptyComponent={<EmptyView title="No Slot available" />}
            />
          </View>
          <OVButton
            title="BOOK CONSULTATION"
            color={APP_THEME_COLOR}
            textColor={WHITE}
            marginTop={20}
            marginBottom={20}
            onPress={() => {
              console.log(isSlotSelected());
              if (isSlotSelected() === true) {
                setConfirmAppointmentDialog(true);
              } else {
                showToastMessage('Please select slot');
              }
            }}
            width={windowWidth - 20}
          />
        </View>
      </ScrollView>
      <ConfirmAppointmentDialog
        dialogVisible={confirmAppointmentDialog}
        setDialogVisible={status => {
          if (status === true) {
            BookAppointmentAction('1234');
          }
          setConfirmAppointmentDialog(false);
        }}
        date={date}
        time={getTimeValue()}
      />
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default BookAppointments;
