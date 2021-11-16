/* eslint-disable react-native/no-inline-styles */
import messaging from '@react-native-firebase/messaging';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
} from 'react-native-fbsdk';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import Toast from 'react-native-root-toast';
import labels from '../../assets/labels';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { OVButton } from '../../components/OVButton';
import OVText, {
    medium,
    poppinsBold,
    poppinsMedium,
    xLarge,
} from '../../components/OVText';
import { LOGIN_BG } from '../../images';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import { MESIBO_BASE_URL, MESIBO_TOKEN } from '../../utils/AppConstant';
import { APP_THEME_COLOR, WHITE, YELLOW } from '../../utils/Colors';
import Feather from 'react-native-vector-icons/Feather';

Feather.loadFont();

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Login = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
    const { setUser, setToken, setProfileStatus, setFirebaseToken, firebaseToken } =
        useContext(AuthContext);
    const [loginData, setLoginData] = useState({});
    const [otpVerificationDialog, setOtpVerificationDialog] = useState(false);

    useEffect(() => {
        requestUserPermission();
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: 'AIzaSyB_dtelxfbq8bkbZCWzYTsrDqvptG2V8c4', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            accountName: '', // [Android] specifies an account name on the device that should be used
            iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
            googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
        });
    }, []);

    const checkPermission = async () => {
        requestMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ]).then(statuses => {
            console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
        });
    };

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            fetchFirebaseToken();
            console.warn('Authorization status:', authStatus);
        }
    };

    const fetchFirebaseToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            setFirebaseToken(fcmToken);
            console.log('Your Firebase Token is:', fcmToken);
        } else {
            console.log('Failed', 'No token received');
        }
    };

    const loginAction = () => {
        if (emailAddress.length === 0) {
            showToastMessage('Enter your email address');
        } else if (password.length === 0) {
            showToastMessage('Please enter password');
        } else {
            setLoading(true);
            const payload = {
                email: emailAddress,
                password: password,
                firebase_token: firebaseToken,
            };
            Network('user/loginVendor', 'post', payload)
                .then(async res => {
                    console.log(' /n/n Result ', JSON.stringify(res));
                    if (res.status === true) {
                        setToken(res.token);
                        setUser(res.data);
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                        setLoading(true);
                    } else {
                        setLoading(false);
                        showToastMessage(res.message);
                    }
                })
                .catch(error => {
                    setLoading(false);
                    // showToastMessage(JSON.stringify(error));
                    showToastMessage("Something went wrong.");
                });
        }
    };

    const getProfileStatus = token => {
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

    const createMesiboAccount = () => {
        var url = `${MESIBO_BASE_URL}token=${MESIBO_TOKEN}&addr=${emailAddress}&appid=com.jfcvendor`;

        Network(url, 'get', null)
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

    const handleFacebook = () => {
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        console.log(data.accessToken.toString());
                        const processRequest = new GraphRequest(
                            '/me?fields=name,email,picture.type(large)',
                            null,
                            getResponseInfo,
                        );
                        // Start the graph request.
                        new GraphRequestManager().addRequest(processRequest).start();
                    });
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error);
            },
        );
    };

    const getResponseInfo = (error, result) => {
        console.log(JSON.stringify(result));
    };

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
        } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const updateSecureTextEntry = () => {
        setSecurePasswordEntry(!securePasswordEntry);
    }
    
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Image
                        source={LOGIN_BG}
                        style={{
                            width: windowWidth,
                            height: windowHeight,
                            resizeMode: 'stretch',
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'column',
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: windowWidth,
                            height: windowHeight,
                        }}>
                        <OVText
                            size={xLarge}
                            fontType={poppinsBold}
                            color={WHITE}
                            style={{ marginTop: 70, marginBottom: 40 }}>
                            {labels.login}
                        </OVText>

                        <View style={styles.textInputContainer}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{ textAlign: 'center', marginTop: 9 }}>
                                {labels.emailMobile}
                            </OVText>
                            <View style={{ alignItems: 'center',flexDirection: 'row' }}>
                                <TextInput
                                    placeholder="Enter Email/Mobile"
                                    placeholderTextColor={WHITE}
                                    style={styles.textField}
                                    value={emailAddress}
                                    onChangeText={text => setEmailAddress(text)}
                                />
                            </View>
                        </View>
                        <View style={styles.textInputContainer}>
                            <OVText

                                size={medium}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{ textAlign: 'center', marginTop: 9 }}>
                                {labels.password}
                            </OVText>
                            <View style={{ alignItems: 'center',flexDirection: 'row', }}>
                                <TextInput
                                    placeholder="Enter Password"
                                    placeholderTextColor={WHITE}
                                    style={styles.textField}
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                    secureTextEntry={securePasswordEntry}
                                />

                                <TouchableOpacity
                                    onPress={updateSecureTextEntry}
                                    activeOpacity={.8}
                                >
                                    {securePasswordEntry ?
                                        <Feather
                                            name="eye-off"
                                            color="white"
                                            size={20}
                                            style={{ paddingHorizontal: 10 }}
                                        />
                                        :
                                        <Feather
                                            name="eye"
                                            color="white"
                                            size={20}
                                            style={{ paddingHorizontal: 10 }}
                                        />
                                    }
                                </TouchableOpacity>

                            </View>
                        </View>

                        <OVButton
                            title="LOGIN"
                            color={APP_THEME_COLOR}
                            textColor={WHITE}
                            marginTop={40}
                            onPress={() => loginAction()}
                        />
                        <OVText
                            onPress={() => navigation.navigate('ForgotPassword')}
                            size={medium}
                            fontType={poppinsMedium}
                            color={WHITE}
                            style={{ textAlign: 'center', marginTop: 20 }}>
                            Forgot your Password?
                        </OVText>


                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={WHITE}
                            style={{ textAlign: 'center', marginTop: 10 }}>
                            Don't have an account?
                            <OVText
                                onPress={() => navigation.navigate('SignUp')}
                                size={medium}
                                fontType={poppinsMedium}
                                color={YELLOW}
                                style={{
                                    textAlign: 'center',
                                    marginTop: 10,
                                    textDecorationLine: 'underline',
                                }}>
                                {' '}
                                Sign Up
                            </OVText>
                        </OVText>
                        {/* <OVText
              size={medium}
              fontType={poppinsBold}
              color={WHITE}
              style={{textAlign: 'center', marginTop: 10}}>
              Or login Via
            </OVText>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleFacebook()}>
                <Image source={FACEBOOK} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleGoogleSignIn()}>
                <Image source={INSTAGRAM} style={{marginStart: 20}} />
              </TouchableOpacity>
            </View> */}
                    </View>
                </View>
            </ScrollView>

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
        borderColor: WHITE,
        borderWidth: 1,
    },
    textField: {
        flex:1,
        color: WHITE,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        width: '100%',
    },
});

export default Login;
