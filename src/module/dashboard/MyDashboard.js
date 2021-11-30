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
import OVText, {
    extraSmall,
    medium,
    poppinsMedium,
    small,
    xLarge,
} from '../../components/OVText';
import FlatListSlider from '../../flatListSlider/FlatListSlider';
import ImageSliderView from '../../flatListSlider/ImageSliderView';
import {
    BANNER_1,
    NOTIFICATION,
    SURFACE_1,
    SURFACE_2,
    SURFACE_3,
    SURFACE_4,
    SURFACE_5,
    SURFACE_6,
    SURFACE_7,
    ADD_ICON
} from '../../images';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { MESIBO_TOKEN } from '../../utils/AppConstant';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    BLACK,
    ITEM_1,
    ITEM_2,
    ITEM_3,
    ITEM_4,
    ITEM_5,
    ITEM_6,
    TEXT_COLOR_BLUE,
    YELLOW,
} from '../../utils/Colors';
import ToggleSwitch from 'toggle-switch-react-native';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { showToastMessage } from '../../utils';

const windowWidth = Dimensions.get('window').width;

const categoryDataDoctor = [
    {
        image: SURFACE_1,
        color: ITEM_1,
        title: 'My Appointments',
        desc: 'Manage all your appointments!',
    },
    {
        image: SURFACE_2,
        color: ITEM_2,
        title: 'My Profile',
        desc: 'Your User Profiel',
    },
    {
        image: SURFACE_3,
        color: ITEM_3,
        title: 'Business Summary',
        desc: 'Detailed summary of your business',
    },
    {
        image: SURFACE_4,
        color: ITEM_4,
        title: 'Settings',
        desc: 'Application settings',
    },
    {
        image: SURFACE_5,
        color: ITEM_6,
        title: 'Remiders',
        desc: 'Your future reminders',
    },
    {
        image: ADD_ICON,
        color: ITEM_5,
        title: 'Products',
        desc: 'Your products Store',
    },
    {
        image: SURFACE_7,
        color: ITEM_2,
        title: 'My Orders',
        desc: 'Manage all your Orders!',
    },
];

const categoryDataClinic = [
    {
        image: SURFACE_1,
        color: ITEM_1,
        title: 'My Appointments',
        desc: 'Manage all your appointments!',
    },
    {
        image: SURFACE_2,
        color: ITEM_2,
        title: 'My Profile',
        desc: 'Your User Profiel',
    },
    {
        image: SURFACE_3,
        color: ITEM_3,
        title: 'Business Summary',
        desc: 'Detailed summary of your business',
    },
    {
        image: SURFACE_4,
        color: ITEM_4,
        title: 'Settings',
        desc: 'Application settings',
    },
    {
        image: SURFACE_5,
        color: ITEM_6,
        title: 'Remiders',
        desc: 'Your future reminders',
    },
    {
        image: SURFACE_6,
        color: ITEM_5,
        title: 'Vaccine List',
        desc: 'All available vaccines list',
    },
];
const MyDashboard = props => {
    const { user, setMesiboToken, setMesiboId, token } = useContext(AuthContext);
    const navigation = useNavigation();
    const [doctorStatus, setDoctorStatus] = useState(false);
    const [appointmentCount, setAppointmentCount] = useState({ upcoming: 0, complete: 0 });
    const [loading, setLoading] = useState(false);
    const [sliderData, setSliderData] = useState([
        { bannerImage: BANNER_1 },
        { bannerImage: BANNER_1 },
        { bannerImage: BANNER_1 },
        { bannerImage: BANNER_1 },
        { bannerImage: BANNER_1 },
        { bannerImage: BANNER_1 },
    ]);

    useEffect(() => {
        // createMesiboAccount();
        if (user.user_type === 2) {
            getUserStatus();
        }
    }, []);

    const createMesiboAccount = () => {
        var url = `token=${MESIBO_TOKEN}&addr=${user.email}&appid=com.jfcvendor&op=useradd&name=${user.name}`;
        Network(url, 'get', null, null, true).then(async res => {
            if(res.result == true)
            {
                console.log(' /n/n Result ', JSON.stringify(res));
                setMesiboToken(res?.user?.token);
                // setMesiboToken(typeof res.user.token != 'undefined' ? res.user.token: '');
                setMesiboId(res?.user?.uid);
            }
        });
    };

    const getUserStatus = status => {
        setLoading(true);

        Network('user/get-online-status-vendor?dashboard=1', 'get', null, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                setLoading(false);
                setDoctorStatus(res.data.is_online === 1 ? true : false);
                if (typeof res.data.appointment_count != "undefined") {
                    setAppointmentCount(res.data.appointment_count);
                }
            })
            .catch(error => {
                setLoading(false);
                showToastMessage("Something went wrong.");
            });
    };

    const setUserStatus = status => {
        setLoading(true);
        let data = new FormData();
        data.append('status', status ? 1 : 0);

        Network('user/change-online-status-vendor', 'post', data, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                setLoading(false);
                setDoctorStatus(status);
            })
            .catch(error => {
                setLoading(false);
                showToastMessage("Something went wrong.");
            });
    };

    const onItemClick = index => {
        switch (index) {
            case 0:
                if (user.user_type === 2) {
                    navigation.navigate('DoctorAppointment');
                } else {
                    navigation.navigate('MyAppointments');
                }
                break;
            case 1:
                navigation.navigate('MyProfile');
                break;
            case 2:
                navigation.navigate('BusinessDetail');
                break;
            case 3:
                navigation.navigate('Setting');
                break;
            case 4:
                navigation.navigate('Reminders');
                break;
            case 5:
                if (user.user_type === 2) {
                    navigation.navigate('Products');
                } else {
                    navigation.navigate('Vaccination');
                } 
                break;
                case 6:
                    navigation.navigate('MyOrders');
                    break;
        }
    };

    const getDashboardData = () => {
        if (user.user_type === 1) {
            return categoryDataClinic;
        } else if (user.user_type === 2) {
            return categoryDataDoctor;
        }
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => onItemClick(index)}
            style={{
                width: windowWidth / 2 - 20,
                margin: 6,
                backgroundColor: item.color,
                borderRadius: 10,
                alignItems: 'center',
                flexDirection: 'column',
                paddingBottom: 10,
            }}>
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                <Image
                    source={item.image}
                    style={{ height: 120, resizeMode: 'contain' }}
                />
                {item.title !== '' && (
                    <OVText
                        size={small}
                        fontType={poppinsMedium}
                        color={TEXT_COLOR_BLUE}
                        style={{ textAlign: 'center', marginTop: -10 }}>
                        {item.title}
                    </OVText>
                )}
                <OVText
                    size={extraSmall}
                    fontType={poppinsMedium}
                    color={TEXT_COLOR_BLUE}
                    style={{ textAlign: 'center', marginHorizontal: 5 }}>
                    {item.desc}
                </OVText>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        paddingTop: 10,
                    }}>
                    <FlatListSlider
                        data={sliderData}
                        width={windowWidth}
                        timer={5000}
                        component={<ImageSliderView />}
                        indicatorActiveWidth={10}
                        contentContainerStyle={{ paddingHorizontal: 8 }}
                        indicatorContainerStyle={{ position: 'absolute', bottom: -20 }}
                        indicatorActiveColor={YELLOW}
                        indicatorInActiveColor="gray"
                        animation
                    />
                    <View
                        style={{
                            marginTop: 40,
                            flexDirection: 'row',
                            marginHorizontal: 30,
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <OVText
                                size={xLarge}
                                fontType={poppinsMedium}
                                color={APP_THEME_COLOR}
                                style={{
                                    textAlign: 'center',
                                }}>
                                Welcome {'\n'}
                                {user.name}
                            </OVText>
                            <View
                                style={{
                                    width: '40%',
                                    backgroundColor: YELLOW,
                                    height: 2,
                                    marginTop: 10,
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => navigation.navigate('Notificatios')}>
                            <Image
                                source={NOTIFICATION}
                                style={{ marginStart: 20, end: 0 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                flex: 1,
                                marginEnd: 10,
                                borderColor: YELLOW,
                                borderRadius: 25,
                                borderWidth: 1,
                                padding: 6,
                            }}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={APP_THEME_COLOR}
                                style={{ textAlign: 'center' }}>
                                {appointmentCount?.upcoming}
                            </OVText>
                            <OVText
                                size={small}
                                fontType={poppinsMedium}
                                color={APP_THEME_COLOR}
                                style={{ textAlign: 'center', marginTop: 4, fontSize: 10 }}>
                                Upcoming Appointments
                            </OVText>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                marginEnd: 10,
                                borderColor: YELLOW,
                                borderRadius: 25,
                                borderWidth: 1,
                                padding: 6,
                            }}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={APP_THEME_COLOR}
                                style={{ textAlign: 'center' }}>
                                {appointmentCount?.complete}
                            </OVText>
                            <OVText
                                size={small}
                                fontType={poppinsMedium}
                                color={APP_THEME_COLOR}
                                style={{ textAlign: 'center', marginTop: 4, fontSize: 10 }}>
                                Completed Appointments
                            </OVText>
                        </View>
                    </View>
                    {user.user_type === 2 && (
                        <View
                            style={{ paddingTop: 20, alignItems: 'flex-end', marginEnd: 20 }}>
                            <ToggleSwitch
                                isOn={doctorStatus}
                                onColor="green"
                                offColor={APP_THEME_COLOR}
                                label="Doctor Status"
                                labelStyle={{ color: BLACK }}
                                size="small"
                                onToggle={isOn => setUserStatus(isOn)}
                            />
                        </View>
                    )}

                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <FlatList
                            data={getDashboardData()}
                            renderItem={renderItem}
                            keyExtractor={item => item.image}
                            numColumns={2}
                        />
                    </View>
                </View>
            </ScrollView>
            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

export default MyDashboard;
