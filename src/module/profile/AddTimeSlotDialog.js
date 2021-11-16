/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState, useEffect } from 'react';
import {
    FlatList,
    Image,
    Modal,
    ScrollView,
    TouchableOpacity,
    View,
    SafeAreaView,
} from 'react-native';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import OVText, {
    extraSmall,
    medium,
    poppinsMedium,
    poppinsRegular,
    small,
} from '../../components/OVText';
import { CLOSE_DIALOG } from '../../images';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import {
    AFTERNOON_SHIFT_ARRAY,
    EVENING_SHIFT_ARRAY,
    MORNING_SHIFT_ARRAY,
    NIGHT_SHIFT_ARRAY,
} from '../../utils/AppConstant';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    BLACK,
    GRAY_200,
    WHITE,
} from '../../utils/Colors';
import { Header } from '../../common/Header';
import { useNavigation } from '@react-navigation/native';
import { windowWidth } from '../../App';

export default function AddTimeSlotDialog(props) {
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user, token } = useContext(AuthContext);
    const [morningShift, setMorningShift] = useState(MORNING_SHIFT_ARRAY);
    const [afternoonShift, setAfternoonShift] = useState(AFTERNOON_SHIFT_ARRAY);
    const [eveningShift, setEveningShift] = useState(EVENING_SHIFT_ARRAY);
    const [nightShift, setNightShift] = useState(NIGHT_SHIFT_ARRAY);

    const [dayName, setDayName] = useState([
        { day: 'Monday', isActive: true, id: 1 },
        { day: 'Tuesday', isActive: false, id: 2 },
        { day: 'Wednesday', isActive: false, id: 3 },
        { day: 'Thrusday', isActive: false, id: 4 },
        { day: 'Friday', isActive: false, id: 5 },
        { day: 'Saturday', isActive: false, id: 6 },
        { day: 'Sunday', isActive: false, id: 7 },
    ]);

    useEffect(() => {

        const unsubscribe = navigation.addListener("focus", () => {
            getTimeSlot(1);
        });
        return unsubscribe;
        
    }, []);

    const getTimeSlot = async (dayNo) => {

        setLoading(true);
        const payload = { doctor_id: user.id, day: dayNo };
        Network('user/get-doctor-time-slot', 'post', payload, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                setLoading(false);
                const slotsArray = res.data;
                manageArrayView(slotsArray, dayNo);
            })
            .catch(error => {
                setLoading(false);
                showToastMessage("Something went wrong.");
            });
    };

    const manageArrayView = (slotsArray, dayNo) => {

        // console.log(JSON.stringify(slotsArray));

        for (let i = 0; i < slotsArray.length; i++) {
            if (slotsArray[i].slot == 1 && slotsArray[i].day == dayNo) {
                for (let j = 0; j < morningShift.length; j++) {
                    if (slotsArray[i].from_time == morningShift[j].time) {
                        morningShift[j].isSelect = true;
                    }
                }
            }

            if (slotsArray[i].slot == 2) {
                for (let j = 0; j < afternoonShift.length; j++) {
                    if (slotsArray[i].from_time == afternoonShift[j].time) {
                        afternoonShift[j].isSelect = true;
                    }
                }
            }

            if (slotsArray[i].slot == 3) {
                for (let j = 0; j < eveningShift.length; j++) {
                    if (slotsArray[i].from_time == eveningShift[j].time) {
                        eveningShift[j].isSelect = true;
                    }
                }
            }

            if (slotsArray[i].slot == 4) {
                for (let j = 0; j < nightShift.length; j++) {
                    if (slotsArray[i].from_time == nightShift[j].time) {
                        nightShift[j].isSelect = true;
                    }
                }
            }
        }

        // console.log('akajajaajj', JSON.stringify(morningShift));

        setMorningShift(morningShift);
        setAfternoonShift(afternoonShift);
        setEveningShift(eveningShift);
        setNightShift(nightShift);
        setRefresh(!refresh);
    };

    const getSelectedDayValue = () => {
        for (let i = 0; i < dayName.length; i++) {
            if (dayName[i].isActive === true) {
                return dayName[i].id;
            }
        }
    };

    const updateDoctorSlot = (shiftType, startTime, endTime) => {
        setLoading(true);
        const payload = {
            day: getSelectedDayValue(),
            slot: shiftType,
            from_time: startTime,
            to_time: endTime,
        };
        Network('user/createTimeSlot', 'post', payload, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                setLoading(false);
                showToastMessage(res.message);
            })
            .catch(error => {
                setLoading(false);
                showToastMessage("Something went wrong.");
            });
    };

    const resetAllShiftValues = async (position) => {
        for (let i = 0; i < dayName.length; i++) {
            dayName[i].isActive = false;
        }
        setDayName(dayName);
        await resetAllValues(MORNING_SHIFT_ARRAY, 1, position);
        await resetAllValues(AFTERNOON_SHIFT_ARRAY, 2, position);
        await resetAllValues(EVENING_SHIFT_ARRAY, 3, position);
        await resetAllValues(NIGHT_SHIFT_ARRAY, 4, position);
        await getTimeSlot(position);
    };

    const resetAllValues = async (data, type, position) => {

        for (let i = 0; i < data.length; i++) {
            data[i].isSelect = false;
        }

        switch (type) {
            case 1:
                setMorningShift(data);
                break;
            case 2:
                setAfternoonShift(data);
                break;
            case 3:
                setEveningShift(data);
                break;
            case 4:
                setNightShift(data);
                break;
        }
        // setTimeout(function () {
        //     // getTimeSlot(position);
        // }, 2000);
    };

    const renderDayItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => {
                resetAllShiftValues(index + 1);
                item.isActive = true;
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
                marginHorizontal: 5,
                elevation: 1,
            }}>
            <OVText
                size={small}
                fontType={poppinsMedium}
                color={item.isActive ? WHITE : BLACK}>
                {item.day}
            </OVText>
        </TouchableOpacity>
    );

    const renderTimeItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1 }}
            onPress={() => {
                item.isSelect = !item.isSelect;
                setRefresh(!refresh);
                updateDoctorSlot(item.shift, item.time, item.endTime);
            }}>
            <View
                style={{
                    width: windowWidth / 2 - 20,
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
                    size={extraSmall}
                    fontType={poppinsMedium}
                    color={item.isSelect ? WHITE : BLACK}>
                    {item.time} - {item.endTime}
                </OVText>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Slots"
            />
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                    }}>
                    <FlatList
                        data={dayName}
                        renderItem={renderDayItem}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        extraData={refresh}
                    />

                    <OVText
                        size={medium}
                        fontType={poppinsRegular}
                        color={WHITE}
                        style={{
                            padding: 10,
                            textAlign: 'center',
                            backgroundColor: APP_THEME_COLOR,
                            marginTop: 10,
                        }}>
                        Morning
                    </OVText>
                    <FlatList
                        data={morningShift}
                        renderItem={renderTimeItem}
                        keyExtractor={item => item.time}
                        numColumns={2}
                        extraData={refresh}
                    />
                    <OVText
                        size={medium}
                        fontType={poppinsRegular}
                        color={WHITE}
                        style={{
                            padding: 10,
                            textAlign: 'center',
                            backgroundColor: APP_THEME_COLOR,
                            marginTop: 10,
                        }}>
                        Afternoon
                    </OVText>
                    <FlatList
                        data={afternoonShift}
                        renderItem={renderTimeItem}
                        keyExtractor={item => item.time}
                        numColumns={2}
                        extraData={refresh}
                    />
                    <OVText
                        size={medium}
                        fontType={poppinsRegular}
                        color={WHITE}
                        style={{
                            padding: 10,
                            textAlign: 'center',
                            backgroundColor: APP_THEME_COLOR,
                            marginTop: 10,
                        }}>
                        Evening
                    </OVText>
                    <FlatList
                        data={eveningShift}
                        renderItem={renderTimeItem}
                        keyExtractor={item => item.time}
                        numColumns={2}
                    />
                    <OVText
                        size={medium}
                        fontType={poppinsRegular}
                        color={WHITE}
                        style={{
                            padding: 10,
                            textAlign: 'center',
                            backgroundColor: APP_THEME_COLOR,
                            marginTop: 10,
                        }}>
                        Night
                    </OVText>
                    <FlatList
                        data={nightShift}
                        renderItem={renderTimeItem}
                        keyExtractor={item => item.time}
                        numColumns={2}
                    />
                </View>
            </ScrollView>
            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
}
