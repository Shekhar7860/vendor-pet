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

const NewPassword = (props) => {

    const {email, otp} = props.route.params;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { user, token, setUser } = useContext(AuthContext);

    useEffect(() => {

    }, []);

    const saveForm = () => {

        if (newPassword === '') {
            showToastMessage('Please enter new password');
        } else if (confirmPassword === '') {
            showToastMessage('Please enter confirm password');
        } else if (confirmPassword !== newPassword) {
            showToastMessage('New password and confirm password should same');
        } else {
            setLoading(true);
            let data = new FormData();
            data.append('email', email);
            data.append('otp', otp);
            data.append('password', newPassword);

            Network('user/create-new-password-vendor', 'post', data, token)
                .then(async res => {
                    console.log(' /n/n Result ', JSON.stringify(res.data));
                    showToastMessage(res?.message);
                    setLoading(false);
                    if(res?.status)
                    {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    }
                })
                .catch(error => {
                    setLoading(false);
                    showToastMessage("Something went wrong.");
                });
        }
    };

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                notification={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="New Password"
            />
            <View style={{ padding: 20, flexDirection: 'column' }}>
               <OVText
                    size={medium}
                    fontType={poppinsRegular}
                    color={GRAY_700}
                    style={{ marginTop: 20 }}>
                    New Password
                </OVText>
                <OVTextInput editable={true} keyboardType="default" onChange={(text) => setNewPassword(text)} />
                <OVText
                    size={medium}
                    fontType={poppinsRegular}
                    color={GRAY_700}
                    style={{ marginTop: 20 }}>
                    Confirm Password
                </OVText>
                <OVTextInput editable={true} keyboardType="default" onChange={(text) => setConfirmPassword(text)} />

                <OVButton
                    title="Submit"
                    color={APP_THEME_COLOR}
                    textColor={WHITE}
                    marginTop={40}
                    marginBottom={20}
                    onPress={() => saveForm()}
                    width={windowWidth - 30}
                />
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

export default NewPassword;
