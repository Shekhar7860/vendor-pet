/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { Header } from '../../common/Header';
import { OVButton } from '../../components/OVButton';
import OVText, { medium, poppinsRegular } from '../../components/OVText';
import { OVTextInput } from '../../components/OVTextInput';
import { APP_THEME_COLOR, BG_COLOR, GRAY_700, WHITE } from '../../utils/Colors';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import { LoaderIndicator } from '../../common/LoaderIndicator';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpReSent, setOtpReSent] = useState(false);

    useEffect(() => {

    }, []);

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const generateOtp = () => {
        setLoading(true);
        const payload = { email: email };
        Network('user/forgot-password-vendor', 'post', payload, null)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    showToastMessage(res.message);
                    setOtpSent(true);
                    setLoading(false);
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

    const verifyOtp = () => {

        setLoading(true);
        const payload = {
            email: email,
            otp: otp,
        };

        Network('user/check-otp-vendor', 'post', payload, null)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                if (res.status === true) {
                    setLoading(false);
                    showToastMessage(res.message);
                    navigation.navigate("NewPassword", {email:email, otp: otp});
                } else {
                    console.log(' \n\n Resudddlt ', JSON.stringify(res));
                    showToastMessage(res.message);
                    setLoading(false);
                }
            })
            .catch(error => {
                setLoading(false);
                showToastMessage("Something went wrong.");
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                notification={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Forgot Password"
            />
            <View style={{ padding: 20, flexDirection: 'column' }}>

                {!otpSent && (
                    <View >
                        <OVText
                            size={medium}
                            fontType={poppinsRegular}
                            color={GRAY_700}
                            style={{ marginTop: 20 }}>
                            Email/Mobile
                        </OVText>
                        <OVTextInput editable={true} keyboardType="default" onChange={(text) => setEmail(text)} />

                        <OVButton
                            title="GET OTP"
                            color={APP_THEME_COLOR}
                            textColor={WHITE}
                            marginTop={40}
                            marginBottom={20}
                            onPress={() => generateOtp()}
                            width={windowWidth - 30}
                        />
                    </View>
                )}


                {otpSent && (
                    <View >
                        <OVText
                            size={medium}
                            fontType={poppinsRegular}
                            color={GRAY_700}
                            style={{ marginTop: 20 }}>
                            OTP
                        </OVText>
                        <OVTextInput editable={true} keyboardType="default" onChange={(text) => setOtp(text)} />

                        <OVButton
                            title="VERIFY OTP"
                            color={APP_THEME_COLOR}
                            textColor={WHITE}
                            marginTop={40}
                            marginBottom={20}
                            onPress={() => verifyOtp()}
                            width={windowWidth - 30}
                        />

                        <OVButton
                            title="RESEND OTP"
                            color={APP_THEME_COLOR}
                            textColor={WHITE}
                            marginTop={40}
                            marginBottom={20}
                            onPress={() => generateOtp()}
                            width={windowWidth - 30}
                        />

                    </View>
                )}

            </View>
            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInputContainer: {
        width: '80%',
        marginTop: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        borderRadius: 10,
    },
    textField: {
        color: WHITE,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        width: '100%',
    },
});

export default ForgotPassword;
