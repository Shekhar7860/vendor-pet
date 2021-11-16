/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import { Header } from '../../common/Header';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import OVText, {
    large,
    medium,
    poppinsBold,
    poppinsLight,
    poppinsMedium,
    poppinsRegular,
    poppinsSemiBold,
    small,
} from '../../components/OVText';
import { REMINDER_1, REMINDER_2, BOTTOM_ARROW } from '../../images';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    BLACK,
    GRAY_200,
    GRAY_400,
    ORANGE,
    TEXT_COLOR_AUTH_TITLES,
    WHITE,
    YELLOW,
} from '../../utils/Colors';
import { OVButton } from '../../components/OVButton';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import CommonDialog from '../dialog/CommonDialog';

const BusinessDetail = props => {

    const windowWidth = Dimensions.get('window').width;

    const { user, token, setUser } = useContext(AuthContext);
    const [appointmentTypeDialog, setAppointmentTypeDialog] = useState([]);
    const [appointmentTypeData, setAppointmentTypeData] = useState([{ id: 1, name: 'Online' }, { id: 2, name: 'Clinic' }, { id: 3, name: 'Doorstep' }]);
    const [appointmentTypeValue, setAppointmentTypeValue] = useState({
        id: 1,
        name: 'Online',
    });

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [dateFilter, setDateFilter] = useState('daily');
    const [earningData, setEarningData] = useState({});
    const [earningHistoryData, setEarningHistoryData] = useState({});
    const [earningHistoryDataCount, setEarningHistoryDataCount] = useState(0);

    useEffect(() => {

        // setDateFilter('daily');
        getEarning();

    }, []);

    const getEarning = (date_filter = 'daily', appointment_type = 'Online', is_filter = 0) => {

        setLoading(true);
        setEarningHistoryDataCount(0);
        let apiData = { date_filter: date_filter, appointment_type: appointment_type, is_filter: is_filter }

        Network('user/get-doctor-earning', 'post', apiData, token)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    setEarningData(res.data);
                    if (appointment_type == 'Clinic') {
                        setEarningHistoryData(res?.data?.clinic_vet_appointment);
                        setEarningHistoryDataCount(res?.data?.clinic_vet_appointment.length);
                    }
                    else if (appointment_type == 'Doorstep') {
                        setEarningHistoryData(res?.data?.doorstep_vet_appointment);
                        setEarningHistoryDataCount(res?.data?.doorstep_vet_appointment.length);
                    }
                    else {
                        setEarningHistoryData(res?.data?.online_vet_appointment);
                        setEarningHistoryDataCount(res?.data?.online_vet_appointment.length);
                    }
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });

    };

    const setAppointmentTypeValue2 = (item) => {

        setAppointmentTypeValue(item);
        getEarning(dateFilter, item.name, 1);
    }

    const appointmentItemListView = ({ item, index }) => (
        <View>
            <OVText
                size={medium}
                fontType={poppinsMedium}
                color={BLACK}
                style={{ marginStart: 20 }}>
                Appointment #{item.order_id}
            </OVText>
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
                        {item.customer_name}
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

                <View style={{ flexDirection: 'row-reverse' }}>
                    <OVButton
                        title={item.amount}
                        color={APP_THEME_COLOR}
                        textColor={WHITE}
                        marginTop={10}
                        width={100}
                        borderRadius={10}
                    />
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Business Detail"
            />
            <View
                style={{
                    borderBottomStartRadius: 30,
                    borderBottomEndRadius: 30,
                    backgroundColor: WHITE,
                    elevation: 4,
                    flexDirection: 'row',
                }}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={() => {
                        setDateFilter('daily');
                        setAppointmentTypeValue(appointmentTypeValue);
                        getEarning('daily', appointmentTypeValue.name, 0);
                    }}
                >

                    <View>
                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={APP_THEME_COLOR}
                            style={{ textAlign: 'center', padding: 10 }}>
                            Daily
                        </OVText>
                        <View
                            style={{
                                backgroundColor: dateFilter == 'daily' ? ORANGE : WHITE,
                                width: '80%',
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
                        setDateFilter('monthly');
                        setAppointmentTypeValue(appointmentTypeValue);
                        getEarning('monthly', appointmentTypeValue.name, 0);
                    }}>
                    <View>
                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={APP_THEME_COLOR}
                            style={{ textAlign: 'center', padding: 10 }}>
                            Monthly
                        </OVText>
                        <View
                            style={{
                                backgroundColor: dateFilter == 'monthly' ? ORANGE : WHITE,
                                width: '80%',
                                height: 5,
                                marginHorizontal: 20,
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        backgroundColor: WHITE,
                    }}>
                    <View style={{ padding: 10, alignItems: 'center' }}>
                        <OVText
                            size={medium}
                            fontType={poppinsLight}
                            color={BLACK}
                            style={{ textAlign: 'center', padding: 10 }}>

                            {earningData && earningData.date
                                ? earningData.date
                                : "---, -- --- --"}
                        </OVText>
                        <OVText
                            size={large}
                            fontType={poppinsBold}
                            color={BLACK}
                            style={{ textAlign: 'center' }}>
                            {`₹ `}
                            {earningData && earningData.total_earning
                                ? earningData.total_earning
                                : "0"}

                        </OVText>
                    </View>
                    <View style={{ height: 1, backgroundColor: GRAY_200 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ padding: 10, flex: 1, flexDirection: 'column' }}>
                            <OVText
                                size={medium}
                                fontType={poppinsBold}
                                color={BLACK}
                                style={{ textAlign: 'center' }}>
                                {earningData && earningData.total_appointment
                                    ? earningData.total_appointment
                                    : "0"}
                            </OVText>
                            <OVText
                                size={small}
                                fontType={poppinsLight}
                                color={BLACK}
                                style={{ textAlign: 'center', marginTop: 10 }}>
                                Appointments
                            </OVText>
                        </View>
                        <View
                            style={{ height: '100%', width: 1, backgroundColor: GRAY_200 }}
                        />
                        <View style={{ padding: 10, flex: 1, flexDirection: 'column' }}>
                            <OVText
                                size={medium}
                                fontType={poppinsBold}
                                color={BLACK}
                                style={{ textAlign: 'center' }}>
                                {`₹ `}
                                {earningData && earningData.total_earning
                                    ? earningData.total_earning
                                    : "0"}
                            </OVText>
                            <OVText
                                size={small}
                                fontType={poppinsLight}
                                color={BLACK}
                                style={{ textAlign: 'center', marginTop: 10 }}>
                                Earnings
                            </OVText>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: GRAY_200 }} />

                    {/* <View
                        style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
                        <View style={{ flex: 1 }}>
                            <OVText
                                size={medium}
                                fontType={poppinsBold}
                                color={APP_THEME_COLOR}
                                style={{ textAlign: 'left', padding: 10 }}>
                                ACTIVE HOURS
                            </OVText>
                            <View
                                style={{
                                    backgroundColor: ORANGE,
                                    width: '50%',
                                    height: 5,
                                    marginStart: 10,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                backgroundColor: WHITE,
                                borderRadius: 10,
                                elevation: 3,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: 30,
                            }}>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={BLACK}
                                style={{ margin: 10 }}>
                                Weekly
                            </OVText>
                            <Image source={BOTTOM_ARROW} style={{ tintColor: BLACK }} />
                        </View>
                    </View> */}

                    {/* <View style={{ alignItems: 'center' }}>
                        <View
                            style={{
                                backgroundColor: APP_THEME_COLOR,
                                padding: 20,
                                width: '60%',
                                marginTop: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                            }}>
                            <OVText
                                size={large}
                                fontType={poppinsSemiBold}
                                color={WHITE}
                                style={{ margin: 10 }}>
                                420
                            </OVText>
                            <OVText size={large} fontType={poppinsRegular} color={WHITE}>
                                Weekly Active Hours
                            </OVText>
                        </View>
                    </View> */}
                    <View
                        style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
                        <View style={{ flex: 1 }}>
                            <OVText
                                size={medium}
                                fontType={poppinsBold}
                                color={APP_THEME_COLOR}
                                style={{ textAlign: 'left', padding: 10 }}>
                                APPOINTMENTS
                            </OVText>
                            <View
                                style={{
                                    backgroundColor: ORANGE,
                                    width: '60%',
                                    height: 5,
                                    marginStart: 10,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                backgroundColor: WHITE,
                                borderRadius: 10,
                                elevation: 3,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: 30,
                            }}>
                            <TouchableOpacity
                                style={{

                                }}
                                activeOpacity={1}
                                onPress={() => setAppointmentTypeDialog(true)}>
                                <OVText
                                    size={medium}
                                    fontType={poppinsSemiBold}
                                    color={BLACK}
                                    style={{ margin: 10 }}>
                                    {appointmentTypeValue.name} ({earningHistoryDataCount})
                                </OVText>

                            </TouchableOpacity>

                            <Image source={BOTTOM_ARROW} style={{ tintColor: BLACK }} />

                        </View>
                    </View>

                    {earningHistoryData && earningHistoryData.length ?
                        <FlatList
                            data={earningHistoryData}
                            renderItem={appointmentItemListView}
                            keyExtractor={item => item.id}
                            style={{ marginTop: 10 }}
                        />
                        : <OVText
                            size={medium}
                            fontType={poppinsSemiBold}
                            color={BLACK}
                            style={{ margin: 10, marginTop: 20, textAlign: 'center' }}>
                            No Record found.
                        </OVText>
                    }
                </View>

                <CommonDialog
                    data={appointmentTypeData}
                    dialogVisible={appointmentTypeDialog}
                    setDialogVisible={() => setAppointmentTypeDialog(false)}
                    onSelectedItem={item => {
                        setAppointmentTypeValue2(item);
                        setAppointmentTypeDialog(false);

                    }}
                    title="Select Appointment Type"
                />
            </ScrollView>
            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

export default BusinessDetail;
