/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import OVText, {
    medium,
    poppinsMedium,
    poppinsRegular,
} from '../../components/OVText';
import {
    CHANGE_PASSWORD,
    LEGAL_INFORMATION,
    LOGOUT,
    MY_PROFILE,
    SEND_FEEDBACK,
    AVAILABLE_TIMINGS,
    PAYMENT_DETAILS,
    SERVICE_FOR_YOU,
} from '../../images';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    GRAY_200,
    TEXT_COLOR_AUTH_TITLES,
    WHITE,
} from '../../utils/Colors';
import { Header } from '../../common/Header';
import VendorRoleDialog from '../signup/VendorRoleDialog';

const Setting = () => {
    const navigation = useNavigation();
    const { user, setUser, setToken, setLogout, firebaseToken, token } =
        useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [roleType, setRoleType] = useState({ id: 0, value: 'Role Type' });
    const [roleTypeDialog, setRoleTypeDialog] = useState(false);

    const loginAction = value => {
        setLoading(true);
        const payload = {
            email: user.email,
            firebase_token: firebaseToken,
            user_type: value.id,
            password: '',
        };
        Network('user/loginVendor', 'post', payload, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                setLoading(false);
                if (res.status === true) {
                    setUser(res.data);
                    setToken(res.token);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                } else {
                    showToastMessage(res.message);
                }
            })
            .catch(error => {
                setLoading(false);
                showToastMessage("Something went wrong.");
            });
    };

    const getUserType = type => {
        switch (type) {
            case 1:
                return 'Clinic';

            case 2:
                return 'Veterinary';

            case 5:
                return 'Pet Shop';

            case 3:
                return 'Training Center';

            case 4:
                return 'Grooming Center';
        }
    };
    const changeUserType = value => {
        Alert.alert(
            'Switch user',
            `Are you sure to change their account from ${getUserType(
                user.user_type,
            )} to ${getUserType(value.id)}`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => loginAction(value),
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Settings"
            />
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        backgroundColor: BG_COLOR,
                    }}>
                    <View>
                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={APP_THEME_COLOR}
                            style={{ marginStart: 10, marginTop: 20 }}>
                            SETTINGS
                        </OVText>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => navigation.navigate('MyProfile')}>
                            <View
                                style={{
                                    backgroundColor: WHITE,
                                    padding: 14,
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    alignItems: 'center',
                                }}>
                                <Image source={MY_PROFILE} />
                                <OVText
                                    size={medium}
                                    fontType={poppinsRegular}
                                    color={TEXT_COLOR_AUTH_TITLES}
                                    style={{ marginStart: 20 }}>
                                    My Profile
                                </OVText>
                            </View>
                        </TouchableOpacity>

                        <View style={{ height: 1, backgroundColor: GRAY_200 }} />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => navigation.navigate('AddTimeSlotDialog')}>
                            <View
                                style={{
                                    backgroundColor: WHITE,
                                    padding: 14,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image source={AVAILABLE_TIMINGS} />
                                <OVText
                                    size={medium}
                                    fontType={poppinsRegular}
                                    color={TEXT_COLOR_AUTH_TITLES}
                                    style={{ marginStart: 20 }}>
                                    Available Timings &amp; Dates
                                </OVText>
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: GRAY_200 }} />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => navigation.navigate('BankAccountDetail')}>
                            <View
                                style={{
                                    backgroundColor: WHITE,
                                    padding: 14,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image source={PAYMENT_DETAILS} />
                                <OVText
                                    size={medium}
                                    fontType={poppinsRegular}
                                    color={TEXT_COLOR_AUTH_TITLES}
                                    style={{ marginStart: 20 }}>
                                    Payment &amp; Business Details
                                </OVText>
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: GRAY_200 }} />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => navigation.navigate('UpdateKycDetail')}>
                            <View
                                style={{
                                    backgroundColor: WHITE,
                                    padding: 14,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image source={PAYMENT_DETAILS} />
                                <OVText
                                    size={medium}
                                    fontType={poppinsRegular}
                                    color={TEXT_COLOR_AUTH_TITLES}
                                    style={{ marginStart: 20 }}>
                                    Update KYC
                                </OVText>
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: GRAY_200 }} />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => navigation.navigate('ServiceProvider')}>
                            <View
                                style={{
                                    backgroundColor: WHITE,
                                    padding: 14,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image source={SERVICE_FOR_YOU} />
                                <OVText
                                    size={medium}
                                    fontType={poppinsRegular}
                                    color={TEXT_COLOR_AUTH_TITLES}
                                    style={{ marginStart: 20 }}>
                                    Services You Provide
                                </OVText>
                            </View>
                        </TouchableOpacity>

                        <View style={{ height: 1, backgroundColor: GRAY_200 }} />

                        <TouchableOpacity activeOpacity={1}
                            onPress={() => navigation.navigate('ChangePassword')}
                        >
                            <View
                                style={{
                                    backgroundColor: WHITE,
                                    padding: 14,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image source={CHANGE_PASSWORD} />
                                <OVText
                                    size={medium}
                                    fontType={poppinsRegular}
                                    color={TEXT_COLOR_AUTH_TITLES}
                                    style={{ marginStart: 20 }}>
                                    Change Password
                                </OVText>
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: GRAY_200 }} />
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => navigation.navigate('LegalInformation')}
                        >
                            <View
                                style={{
                                    backgroundColor: WHITE,
                                    padding: 14,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image source={LEGAL_INFORMATION} />
                                <OVText
                                    size={medium}
                                    fontType={poppinsRegular}
                                    color={TEXT_COLOR_AUTH_TITLES}
                                    style={{ marginStart: 20 }}>
                                    Legal Information
                                </OVText>
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: GRAY_200 }} />
                        <TouchableOpacity activeOpacity={1}>
                            <View
                                style={{
                                    backgroundColor: WHITE,
                                    padding: 14,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image source={SEND_FEEDBACK} />
                                <OVText
                                    size={medium}
                                    fontType={poppinsRegular}
                                    color={TEXT_COLOR_AUTH_TITLES}
                                    style={{ marginStart: 20 }}>
                                    Send Feedback
                                </OVText>
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: GRAY_200 }} />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setRoleTypeDialog(true)}>
                            <View
                                style={{
                                    backgroundColor: WHITE,
                                    padding: 14,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image source={SEND_FEEDBACK} />
                                <OVText
                                    size={medium}
                                    fontType={poppinsRegular}
                                    color={TEXT_COLOR_AUTH_TITLES}
                                    style={{ marginStart: 20 }}>
                                    Switch Account
                                </OVText>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                setLogout(true);

                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Login' }],
                                });
                            }}>
                            <View
                                style={{
                                    backgroundColor: WHITE,
                                    padding: 14,
                                    flexDirection: 'row',
                                    marginTop: 10,
                                }}>
                                <Image source={LOGOUT} />
                                <OVText
                                    size={medium}
                                    fontType={poppinsRegular}
                                    color={TEXT_COLOR_AUTH_TITLES}
                                    style={{ marginStart: 20 }}>
                                    Logout
                                </OVText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {loading && <LoaderIndicator loading={loading} />}
            <VendorRoleDialog
                dialogVisible={roleTypeDialog}
                setDialogVisible={status => {
                    setRoleTypeDialog(false);
                }}
                selectedValue={value => {
                    setRoleTypeDialog(false);
                    setRoleType(value);
                    changeUserType(value);
                }}
            />
        </SafeAreaView>
    );
};

export default Setting;
