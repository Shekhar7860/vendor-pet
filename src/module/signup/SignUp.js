/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import labels from '../../assets/labels';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { OVButton } from '../../components/OVButton';
import OVText, {
    medium,
    poppinsBold,
    poppinsMedium,
    poppinsRegular,
    xLarge,
} from '../../components/OVText';
import {
    APP_LOGO_1,
    BOTTOM_ARROW,
    FACEBOOK,
    INSTAGRAM,
    SIGN_UP_BG,
} from '../../images';
import Network from '../../network/Network';
import { showToastMessage, validateEmail } from '../../utils';
import { APP_THEME_COLOR, BLACK, WHITE } from '../../utils/Colors';
import VendorRoleDialog from './VendorRoleDialog';
import OtpVerificationDialog from './OtpVerificationDialog';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [roleType, setRoleType] = useState({ id: 0, value: 'Role Type' });
    const [roleTypeDialog, setRoleTypeDialog] = useState(false);
    const [otpVerificationDialog, setOtpVerificationDialog] = useState(false);

    const signUpAction = () => {
        console.log(roleType);
        if (userName.length === 0) {
            showToastMessage('Enter your name');
        } else if (mobileNumber.length < 10) {
            showToastMessage('Enter your mobile number');
        } else if (emailAddress.length === 0) {
            showToastMessage('Enter your email address');
        } else if (!validateEmail(emailAddress.trim())) {
            showToastMessage('Please enter valid email address');
        } else if (roleType.id == 0) {
            showToastMessage('Please enter user type');
        } else if (password.length === 0) {
            showToastMessage('Please enter password');
        } else if (password !== confirmPassword) {
            showToastMessage('Password and confirm password not matched');
        } else {
            const payload = {
                user_type: roleType.id,
                name: userName,
                email: emailAddress,
                password: password,
                mobile_no: mobileNumber,
            };
            Network('user/registerVendor', 'post', payload)
                .then(async res => {
                    if (res.status === true) {
                        console.log(' /n/n Result ', JSON.stringify(res));
                       showToastMessage(res.message);

                        if( typeof res.data.is_otp_verified != 'undefined' && res.data.is_otp_verified == 1)
                        {
                            navigation.goBack();
                            setLoading(false);
                        }
                        else{
                            
                            generateOtp(mobileNumber);
                            setOtpVerificationDialog(true);
                        }

                    } else {
                       showToastMessage(res.message);
                        setLoading(false);
                    }
                })
                .catch(error => {
                    setLoading(false);
                    showToastMessage("Something went wrong.");
                });
        }
    };

    const generateOtp = mobile => {
        setLoading(true);
        const payload = { mobile_no: mobile };
        Network('user/generate-otp-vendor', 'post', payload, null)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    setOtpVerificationDialog(true);
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

    const verifyOtp = value => {
        setLoading(true);
        const payload = {
            first_name: userName,
            mobile_no: mobileNumber,
            otp: value,
        };
        Network('user/verify-otp-vendor', 'post', payload, null)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    showToastMessage(res.message);
                    navigation.goBack();
                    setLoading(false);
                } else {
                    showToastMessage(res.message);
                    setLoading(false);
                    setOtpVerificationDialog(true);
                }
            })
            .catch(error => {
                setLoading(false);
                showToastMessage("Something went wrong.");
            });
    };

    return (
        <SafeAreaView>
            <Image
                source={SIGN_UP_BG}
                style={{
                    width: windowWidth,
                    height: windowHeight,
                    resizeMode: 'stretch',
                    position: 'absolute',
                }}
            />
            <ScrollView>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Image
                            source={APP_LOGO_1}
                            style={{ marginHorizontal: 20, marginVertical: 30 }}
                        />

                        <OVText
                            size={xLarge}
                            fontType={poppinsBold}
                            color={WHITE}
                            style={{ marginTop: 20, marginBottom: 40 }}>
                            Sign Up
                        </OVText>

                        <View style={styles.textInputContainer}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{ textAlign: 'center', marginTop: 10 }}>
                                Business Name
                            </OVText>
                            <View style={{ alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Enter Business name"
                                    placeholderTextColor={WHITE}
                                    style={styles.textField}
                                    onChangeText={text =>
                                        setUserName(text.replace(/[^A-Za-z ]/gi, ''))
                                    }
                                    value={userName}
                                />
                            </View>
                        </View>

                        <View style={styles.textInputContainer}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{ textAlign: 'center', marginTop: 10 }}>
                                Mobile Number
                            </OVText>
                            <View style={{ alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Enter Mobile Number"
                                    placeholderTextColor={WHITE}
                                    style={styles.textField}
                                    onChangeText={text =>
                                        setMobileNumber(text.replace(/[^0-9]/g, ''))
                                    }
                                    keyboardType="numeric"
                                    maxLength={10}
                                    value={mobileNumber}
                                />
                            </View>
                        </View>

                        <View style={styles.textInputContainer}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{ textAlign: 'center', marginTop: 10 }}>
                                Email
                            </OVText>
                            <View style={{ alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Enter Email"
                                    placeholderTextColor={WHITE}
                                    style={styles.textField}
                                    onChangeText={text => setEmailAddress(text)}
                                />
                            </View>
                        </View>
                        <View style={styles.textInputContainer}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{ textAlign: 'center', marginTop: 10 }}>
                                Role Selection
                            </OVText>
                            <TouchableOpacity
                                onPress={() => setRoleTypeDialog(true)}
                                activeOpacity={1}
                                style={{
                                    alignItems: 'center',
                                    marginTop: 10,
                                    bottom: 0,
                                    backgroundColor: WHITE,
                                    padding: 10,
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                                    {roleType.value}
                                </OVText>
                                <Image
                                    source={BOTTOM_ARROW}
                                    style={{ tintColor: BLACK, marginStart: 10 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textInputContainer}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{ textAlign: 'center', marginTop: 10 }}>
                                {labels.password}
                            </OVText>
                            <View style={{ alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Enter Password"
                                    placeholderTextColor={WHITE}
                                    style={styles.textField}
                                    onChangeText={text => setPassword(text)}
                                    secureTextEntry={true}
                                    maxLength={15}
                                />
                            </View>
                        </View>
                        <View style={styles.textInputContainer}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{ textAlign: 'center', marginTop: 10 }}>
                                Confirm Password
                            </OVText>
                            <View style={{ alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Enter Confirm Password"
                                    placeholderTextColor={WHITE}
                                    style={styles.textField}
                                    onChangeText={text => setConfirmPassword(text)}
                                    secureTextEntry={true}
                                    maxLength={15}
                                />
                            </View>
                        </View>

                        <OVButton
                            title="SUBMIT"
                            color={WHITE}
                            textColor={APP_THEME_COLOR}
                            marginTop={40}
                            onPress={() => signUpAction()}
                        />
                        <OVText
                            size={medium}
                            fontType={poppinsRegular}
                            color={WHITE}
                            style={{ textAlign: 'center', marginTop: 10 }}>
                            Or login Via
                        </OVText>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginVertical: 20,
                            }}>
                            <Image source={FACEBOOK} />
                            <Image source={INSTAGRAM} style={{ marginStart: 20 }} />
                        </View>
                    </View>

                    {loading && <LoaderIndicator loading={loading} />}
                </View>
            </ScrollView>
            <VendorRoleDialog
                dialogVisible={roleTypeDialog}
                setDialogVisible={status => {
                    setRoleTypeDialog(false);
                }}
                selectedValue={value => {
                    setRoleTypeDialog(false);
                    setRoleType(value);
                }}
            />
            <OtpVerificationDialog
                dialogVisible={otpVerificationDialog}
                setDialogVisible={value => {
                    verifyOtp(value);
                    setOtpVerificationDialog(false);
                }}
                resendOtp={() => generateOtp(mobileNumber)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInputContainer: {
        width: '80%',
        marginTop: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        borderRadius: 10,
    },
    textField: {
        color: WHITE,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        width: '100%',
    },
});

export default SignUp;
