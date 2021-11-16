/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import { Header } from '../../common/Header';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { OVButton } from '../../components/OVButton';
import OVText, {
    extraSmall,
    medium,
    poppinsSemiBold,
} from '../../components/OVText';
import { OVTextInput } from '../../components/OVTextInput';
import { BTN_NO, BTN_YES, GENDER_OTHERS } from '../../images';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    BLACK,
    ORANGE,
    WHITE,
} from '../../utils/Colors';

const ServiceProvider = () => {
    const navigation = useNavigation();
    const { user, token, setProfileStatus } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [videoConsultation, setVideoConsultation] = useState(false);
    const [clinicConsultation, setClinicConsultation] = useState(false);
    const [doorstepConsultation, setDoorstepConsultation] = useState(false);
    const [vaccinationConsultation, setVaccinationConsultation] = useState(false);
    const [vaccinationClinic, setVaccinationClinic] = useState(false);
    const [vaccinationDoorstep, setVaccinationDoorstep] = useState(false);

    const [videoConsultationPrice, setVideoConsultationPrice] = useState('');
    const [clinicConsultationPrice, setClinicConsultationPrice] = useState('');
    const [doorstepConsultationPrice, setDoorstepConsultationPrice] =
        useState('');
    const [vaccinationConsultationPrice, setVaccinationConsultationPrice] =
        useState('');
    const [
        doorstepVaccinationConsultationPrice,
        setDoorstepVaccinationConsultationPrice,
    ] = useState('');

    useEffect(() => {
        getServiceProvider();
    }, []);

    const getServiceProvider = () => {
        setLoading(true);
        Network('user/get-services', 'get', null, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                const data = res.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].service_type === 1) {
                        setVideoConsultationPrice(data[i].price.toString());
                        setVideoConsultation(data[i].service_value === 1 ? true : false);
                    } else if (data[i].service_type === 2) {
                        setClinicConsultationPrice(data[i].price.toString());
                        setClinicConsultation(data[i].service_value === 1 ? true : false);
                    } else if (data[i].service_type === 3) {
                        setDoorstepConsultationPrice(data[i].price.toString());
                        setDoorstepConsultation(data[i].service_value === 1 ? true : false);
                    } else if (data[i].service_type === 4) {
                        setVaccinationConsultationPrice(data[i].price.toString());
                        setDoorstepVaccinationConsultationPrice(data[i].price2.toString());
                        setVaccinationConsultation(
                            data[i].service_value === 1 ? true : false,
                        );
                        if (data[i].is_doorstep === 1) {
                            setVaccinationClinic(true);
                        } else if (data[i].is_doorstep === 2) {
                            setVaccinationDoorstep(true);
                        } else if (data[i].is_doorstep === 3) {
                            setVaccinationClinic(true);
                            setVaccinationDoorstep(true);
                        }
                    }
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
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
                showToastMessage("Something went wrong.");
            });
    };

    const updateProfile = () => {
        setLoading(true);
        let data = new FormData();
        data.append('service_type[1]', videoConsultation ? 1 : 0);
        data.append('service_type[2]', clinicConsultation ? 1 : 0);
        data.append('service_type[3]', doorstepConsultation ? 1 : 0);

        data.append('price[1]', videoConsultationPrice);
        data.append('price[2]', clinicConsultationPrice);
        data.append('price[3]', doorstepConsultationPrice);

        data.append('is_doorstep[1]', 0);
        data.append('is_doorstep[2]', clinicConsultation ? 1 : 0);
        data.append('is_doorstep[3]', doorstepConsultation ? 1 : 0);

        if (user.user_type === 1) {
            data.append('service_type[4]', vaccinationConsultation ? 1 : 0);
            data.append('is_doorstep[4]', vaccineProvided());
            data.append('price[4]', vaccinationConsultationPrice);
            data.append('price2[4]', doorstepVaccinationConsultationPrice);
        }
        Network('user/save-services', 'post', data, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                setLoading(false);
                showToastMessage(res.message);
                getProfileStatus();
            })
            .catch(error => {
                setLoading(false);
                showToastMessage("Something went wrong.");
            });
    };

    const vaccineProvided = () => {
        if (vaccinationConsultation) {
            if (vaccinationClinic && !vaccinationDoorstep) {
                return 1;
            } else if (!vaccinationClinic && vaccinationDoorstep) {
                return 2;
            } else if (vaccinationClinic && vaccinationDoorstep) {
                return 3;
            }
        } else {
            return 0;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Services"
            />
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        backgroundColor: WHITE,
                    }}>
                    <View>
                        <View
                            style={{ alignItems: 'center', padding: 10, marginVertical: 16 }}>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ marginBottom: 10 }}>
                                Services You Provide
                            </OVText>
                            <View
                                style={{ width: '60%', height: 2, backgroundColor: ORANGE }}
                            />
                        </View>

                        <View
                            style={{
                                backgroundColor: WHITE,
                                borderRadius: 25,
                                elevation: 4,
                                padding: 20,
                                margin: 10,
                                alignItems: 'center',
                            }}>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ marginBottom: 10 }}>
                                VET Video consultation
                            </OVText>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setVideoConsultation(true)}>
                                    <View style={{ marginEnd: 20, alignItems: 'center' }}>
                                        <Image source={BTN_YES} />

                                        <OVText
                                            size={extraSmall}
                                            fontType={poppinsSemiBold}
                                            color={videoConsultation ? ORANGE : BLACK}
                                            style={{ marginBottom: 10, marginTop: 6 }}>
                                            YES
                                        </OVText>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setVideoConsultation(false)}>
                                    <View style={{ marginStart: 20, alignItems: 'center' }}>
                                        <Image source={BTN_NO} />
                                        <OVText
                                            size={extraSmall}
                                            fontType={poppinsSemiBold}
                                            color={!videoConsultation ? ORANGE : BLACK}
                                            style={{ marginBottom: 10, marginTop: 6 }}>
                                            No
                                        </OVText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {videoConsultation && (
                                <OVTextInput
                                    editable={true}
                                    keyboardType="number"
                                    isBackground={true}
                                    placeHolderText="Price (In Rs.)"
                                    value={videoConsultationPrice}
                                    onChange={value => setVideoConsultationPrice(value)}
                                />

                            )}
                        </View>

                        <View
                            style={{
                                backgroundColor: WHITE,
                                borderRadius: 25,
                                elevation: 4,
                                padding: 20,
                                margin: 10,
                                alignItems: 'center',
                            }}>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ marginBottom: 10 }}>
                                Vet consultation at clinic
                            </OVText>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setClinicConsultation(true)}>
                                    <View style={{ marginEnd: 20, alignItems: 'center' }}>
                                        <Image source={BTN_YES} />

                                        <OVText
                                            size={extraSmall}
                                            fontType={poppinsSemiBold}
                                            color={clinicConsultation ? ORANGE : BLACK}
                                            style={{ marginBottom: 10, marginTop: 6 }}>
                                            YES
                                        </OVText>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setClinicConsultation(false)}>
                                    <View style={{ marginStart: 20, alignItems: 'center' }}>
                                        <Image source={BTN_NO} />
                                        <OVText
                                            size={extraSmall}
                                            fontType={poppinsSemiBold}
                                            color={!clinicConsultation ? ORANGE : BLACK}
                                            style={{ marginBottom: 10, marginTop: 6 }}>
                                            No
                                        </OVText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {clinicConsultation && (
                                <OVTextInput
                                    editable={true}
                                    keyboardType="number"
                                    isBackground={true}
                                    placeHolderText="Price (In Rs.)"
                                    value={clinicConsultationPrice}
                                    onChange={value => setClinicConsultationPrice(value)}
                                />
                            )}
                        </View>

                        <View
                            style={{
                                backgroundColor: WHITE,
                                borderRadius: 25,
                                elevation: 4,
                                padding: 20,
                                margin: 10,
                                alignItems: 'center',
                            }}>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ marginBottom: 10 }}>
                                Doorstep Consultation
                            </OVText>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setDoorstepConsultation(true)}>
                                    <View style={{ marginEnd: 20, alignItems: 'center' }}>
                                        <Image source={BTN_YES} />

                                        <OVText
                                            size={extraSmall}
                                            fontType={poppinsSemiBold}
                                            color={doorstepConsultation ? ORANGE : BLACK}
                                            style={{ marginBottom: 10, marginTop: 6 }}>
                                            YES
                                        </OVText>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setDoorstepConsultation(false)}>
                                    <View style={{ marginStart: 20, alignItems: 'center' }}>
                                        <Image source={BTN_NO} />
                                        <OVText
                                            size={extraSmall}
                                            fontType={poppinsSemiBold}
                                            color={!doorstepConsultation ? ORANGE : BLACK}
                                            style={{ marginBottom: 10, marginTop: 6 }}>
                                            No
                                        </OVText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            { doorstepConsultation && (
                                <OVTextInput
                                    editable={true}
                                    keyboardType="number"
                                    isBackground={true}
                                    placeHolderText="Price (In Rs.)"
                                    value={doorstepConsultationPrice}
                                    onChange={value => setDoorstepConsultationPrice(value)}
                                />
                            )}
                        </View>

                        {user.user_type === 1 && (
                            <View
                                style={{
                                    backgroundColor: WHITE,
                                    borderRadius: 25,
                                    elevation: 4,
                                    padding: 20,
                                    margin: 10,
                                    alignItems: 'center',
                                }}>
                                <OVText
                                    size={medium}
                                    fontType={poppinsSemiBold}
                                    color={APP_THEME_COLOR}
                                    style={{ marginBottom: 10 }}>
                                    Vaccination services
                                </OVText>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => setVaccinationConsultation(true)}>
                                        <View style={{ marginEnd: 20, alignItems: 'center' }}>
                                            <Image source={BTN_YES} />

                                            <OVText
                                                size={extraSmall}
                                                fontType={poppinsSemiBold}
                                                color={vaccinationConsultation ? ORANGE : BLACK}
                                                style={{ marginBottom: 10, marginTop: 6 }}>
                                                YES
                                            </OVText>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => setVaccinationConsultation(false)}>
                                        <View style={{ marginStart: 20, alignItems: 'center' }}>
                                            <Image source={BTN_NO} />
                                            <OVText
                                                size={extraSmall}
                                                fontType={poppinsSemiBold}
                                                color={!vaccinationConsultation ? ORANGE : BLACK}
                                                style={{ marginBottom: 10, marginTop: 6 }}>
                                                No
                                            </OVText>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => setVaccinationClinic(!vaccinationClinic)}>
                                        <View style={{ marginEnd: 20, alignItems: 'center' }}>
                                            <Image
                                                source={GENDER_OTHERS}
                                                style={{ tintColor: vaccinationClinic ? ORANGE : BLACK }}
                                            />

                                            <OVText
                                                size={extraSmall}
                                                fontType={poppinsSemiBold}
                                                color={vaccinationClinic ? ORANGE : BLACK}
                                                style={{ marginBottom: 10, marginTop: 6 }}>
                                                Clinic
                                            </OVText>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() =>
                                            setVaccinationDoorstep(!vaccinationDoorstep)
                                        }>
                                        <View style={{ marginStart: 20, alignItems: 'center' }}>
                                            <Image
                                                source={GENDER_OTHERS}
                                                style={{
                                                    tintColor: vaccinationDoorstep ? ORANGE : BLACK,
                                                }}
                                            />
                                            <OVText
                                                size={extraSmall}
                                                fontType={poppinsSemiBold}
                                                color={vaccinationDoorstep ? ORANGE : BLACK}
                                                style={{ marginBottom: 10, marginTop: 6 }}>
                                                Doorstep
                                            </OVText>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                { /* <OVTextInput
                                    editable={true}
                                    keyboardType="number"
                                    isBackground={true}
                                    placeHolderText="Clinic Vaccination Price (In Rs.)"
                                    value={vaccinationConsultationPrice}
                                    onChange={value => setVaccinationConsultationPrice(value)}
                                    /> */
                                }
                                { vaccinationDoorstep && (
                                    <OVTextInput
                                        editable={true}
                                        keyboardType="number"
                                        isBackground={true}
                                        placeHolderText="Extra fee for doorstep service (In Rs.)"
                                        value={doorstepVaccinationConsultationPrice}
                                        onChange={value =>
                                            setDoorstepVaccinationConsultationPrice(value)
                                        }
                                    />
                                )}
                            </View>
                        )}

                        <OVButton
                            title="Save"
                            color={APP_THEME_COLOR}
                            textColor={WHITE}
                            marginTop={20}
                            marginBottom={20}
                            onPress={() => updateProfile()}
                        />
                    </View>
                </View>
            </ScrollView>

            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

export default ServiceProvider;
