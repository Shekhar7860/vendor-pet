/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Header } from '../../common/Header';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { OVButton } from '../../components/OVButton';
import OVText, { medium, poppinsSemiBold } from '../../components/OVText';
import { OVTextInput } from '../../components/OVTextInput';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    GRAY_200,
    ORANGE,
    WHITE,
} from '../../utils/Colors';

const BankAccountDetail = props => {

    const navigation = useNavigation();
    const { user, token, setProfileStatus } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [panCard, setPanCard] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [bankName, setBankName] = useState('');

    useEffect(() => {
        getPaymentDetail();
    }, []);

    const getPaymentDetail = () => {

        setLoading(true);
        Network('user/get-payment-detail', 'get', null, token)
            .then(async res => {
                setLoading(false);
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));

                    if(res?.data)
                    {
                        setPanCard(res?.data?.pan_card);
                        setAccountNumber(res?.data?.bnk_account_number);
                        setAccountName(res?.data?.holder_name);
                        setIfscCode(res?.data?.ifsc);
                        setBankName(res?.data?.bnk_name);
                    }
                }
            })
            .catch(error => {
                setLoading(false);
            });
    };

    const updateBankDetails = () => {

        if ( panCard == null || panCard.length === 0) {
            showToastMessage('Enter your PAN card number');
        } else if ( panCard.length < 8 || panCard.length > 15) {
            showToastMessage('Please enter currect PAN card number');
        } else if ( accountNumber == null || accountNumber.length === 0) {
            showToastMessage('Please enter account number');
        } else if ( accountNumber.length < 10 || accountNumber.length > 20) {
            showToastMessage('Please enter currect account number');
        } else if ( accountName == null || accountName.length === 0) {
            showToastMessage('Please enter account holder name');
        } else if ( ifscCode == null || ifscCode.length === 0) {
            showToastMessage('Please enter IFSC code');
        } else if ( ifscCode.length < 10 || ifscCode.length > 20) {
            showToastMessage('Please enter currect IFSC code');
        } else if ( bankName == null || bankName.length === 0) {
            showToastMessage('Please enter bank name');
        } else if ( bankName.length < 3) {
            showToastMessage('Please enter currect account name');
        }  else {
            setLoading(true);
            let data = {
                user_type: user?.user_type,
                pan_card: panCard,
                bnk_account_number: accountNumber,
                holder_name: accountName,
                ifsc: ifscCode,
                bnk_name: bankName,
                gstin: '231423424',
            };

            Network('user/save-payment-detail', 'post', data, token)
                .then(async res => {
                    console.log(' /n/n Result ', JSON.stringify(res));
                    showToastMessage(res.message);
                    getProfileStatus();
                })
                .catch(error => {
                    setLoading(false);
                    
                    showToastMessage("Something went wrong.");
                });
        }
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
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Payment Details"
            />
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        backgroundColor: WHITE,
                        paddingTop: 10,
                    }}>
                    <View>
                        <View
                            style={{ alignItems: 'center', padding: 10, marginVertical: 20 }}>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ marginBottom: 10 }}>
                                Payment &amp; Business Details
                            </OVText>
                            <View
                                style={{ width: '60%', height: 2, backgroundColor: ORANGE }}
                            />
                        </View>
                        {user.user_type === 2 && <View></View>}

                        <OVText
                            size={medium}
                            fontType={poppinsSemiBold}
                            color={APP_THEME_COLOR}
                            style={{ marginStart: 10, marginBottom: 10 }}>
                            PAN Card
                        </OVText>
                        <View
                            style={{
                                backgroundColor: GRAY_200,
                                paddingVertical: 2,
                                flexDirection: 'column',
                            }}>
                            <OVTextInput
                                editable={true}
                                keyboardType="email-address"
                                isBackground={false}
                                value={panCard}
                                onChange={value => setPanCard(value)}
                            />
                        </View>
                        <OVText
                            size={medium}
                            fontType={poppinsSemiBold}
                            color={APP_THEME_COLOR}
                            style={{ margin: 10 }}>
                            Bank Account Number
                        </OVText>
                        <View
                            style={{
                                backgroundColor: GRAY_200,
                                paddingVertical: 2,
                                flexDirection: 'column',
                            }}>
                            <OVTextInput
                                editable={true}
                                keyboardType="number"
                                isBackground={false}
                                value={accountNumber}
                                onChange={value => setAccountNumber(value)}
                            />
                        </View>
                        <OVText
                            size={medium}
                            fontType={poppinsSemiBold}
                            color={APP_THEME_COLOR}
                            style={{ margin: 10 }}>
                            Account Holder Name
                        </OVText>
                        <View
                            style={{
                                backgroundColor: GRAY_200,
                                paddingVertical: 2,
                                flexDirection: 'column',
                            }}>
                            <OVTextInput
                                editable={true}
                                isBackground={false}
                                value={accountName}
                                onChange={value => setAccountName(value)}
                            />
                        </View>
                        <OVText
                            size={medium}
                            fontType={poppinsSemiBold}
                            color={APP_THEME_COLOR}
                            style={{ margin: 10 }}>
                            Bank Account IFSC Code
                        </OVText>
                        <View
                            style={{
                                backgroundColor: GRAY_200,
                                paddingVertical: 2,
                                flexDirection: 'column',
                            }}>
                            <OVTextInput
                                editable={true}
                                isBackground={false}
                                value={ifscCode}
                                onChange={value => setIfscCode(value)}
                            />
                        </View>

                        <OVText
                            size={medium}
                            fontType={poppinsSemiBold}
                            color={APP_THEME_COLOR}
                            style={{ margin: 10 }}>
                            Bank Name
                        </OVText>
                        <View
                            style={{
                                backgroundColor: GRAY_200,
                                paddingVertical: 2,
                                flexDirection: 'column',
                            }}>
                            <OVTextInput
                                editable={true}
                                isBackground={false}
                                value={bankName}
                                onChange={value => setBankName(value)}
                            />
                        </View>

                        <OVButton
                            title="Save"
                            color={APP_THEME_COLOR}
                            textColor={WHITE}
                            marginTop={20}
                            marginBottom={20}
                            onPress={() => updateBankDetails()}
                        />
                    </View>
                </View>
            </ScrollView>

            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

export default BankAccountDetail;
