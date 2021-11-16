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
} from 'react-native';
import EmptyView from '../../common/EmptyView';
import { Header } from '../../common/Header';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { OVButton } from '../../components/OVButton';
import OVText, {
    medium,
    poppinsMedium,
    poppinsRegular,
} from '../../components/OVText';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import {
    APP_THEME_COLOR,
    BLACK,
    GRAY_400,
    ORANGE,
    TEXT_COLOR_AUTH_TITLES,
    WHITE,
} from '../../utils/Colors';

const windowWidth = Dimensions.get('window').width;

var appointmentListData;
const MyAppointments = props => {
    const navigation = useNavigation();
    const [isUpcoming, setIsUpcoming] = useState(true);
    const { user, token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        getMyAppointment();
    }, []);

    const getMyAppointment = date => {
        setLoading(true);
        Network('user/get-doctor-appointment', 'get', null, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                if (res.status) {
                    appointmentListData = res.data;
                    filterAppointmentList(appointmentListData, true);
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                showToastMessage("Something went wrong.");
            });
    };

    const filterAppointmentList = (data, type) => {
        let filterArray = [];
        if (type) {
            filterArray = data.filter(function (e) {
                return new Date(e.date) >= new Date();
            });
        } else {
            filterArray = data.filter(function (e) {
                return new Date(e.date) < new Date();
            });
        }
        setCategoryData(filterArray);
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

            {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
          List of Services Booked:
        </OVText>
        <OVText
          size={medium}
          fontType={poppinsRegular}
          color={TEXT_COLOR_AUTH_TITLES}>
          Grooming
        </OVText>
      </View> */}

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
            {isUpcoming && (
                <OVButton
                    title="Assign"
                    color={APP_THEME_COLOR}
                    textColor={WHITE}
                    marginTop={20}
                    onPress={() => {
                        navigation.navigate('AssignDoctor', { itemData: item });
                    }}
                    width={windowWidth / 2}
                    borderRadius={20}
                />
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
                    elevation: 4,
                    flexDirection: 'row',
                }}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={() => {
                        setIsUpcoming(true);
                        filterAppointmentList(appointmentListData, true);
                    }}>
                    <View>
                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={APP_THEME_COLOR}
                            style={{ textAlign: 'center', padding: 10 }}>
                            Upcoming {'\n'}Appointments
                        </OVText>
                        <View
                            style={{
                                backgroundColor: isUpcoming ? ORANGE : WHITE,
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
                        setIsUpcoming(false);
                        filterAppointmentList(appointmentListData, false);
                    }}>
                    <View>
                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={APP_THEME_COLOR}
                            style={{ textAlign: 'center', padding: 10 }}>
                            Past {'\n'}Appointments
                        </OVText>
                        <View
                            style={{
                                backgroundColor: !isUpcoming ? ORANGE : WHITE,
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

export default MyAppointments;
