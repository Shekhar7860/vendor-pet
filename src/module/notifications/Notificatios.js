/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Header } from '../../common/Header';
import OVText, { medium, poppinsRegular } from '../../components/OVText';
import { IMAGE_PET_SHOP } from '../../images';
import { BG_COLOR, GRAY_200, GRAY_700, WHITE } from '../../utils/Colors';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage, validateNumber } from '../../utils';
import { LoaderIndicator } from '../../common/LoaderIndicator';

const categoryData = [
    {
        id: 1,
        message:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        desc: 'General Vet \nEnglish \n21+ Yaers of Experiance',
    },
    {
        id: 2,
        message:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        desc: 'General Vet \nEnglish \n21+ Yaers of Experiance',
    }
];
const Notificatios = props => {

    const navigation = useNavigation();
    const { user, token, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [notificationData, setNotificationData] = useState([]);

    useEffect(() => {
        getNotifications();
    }, []);

    const getNotifications = () => {

        setLoading(true);
        Network('user/get-vendor-notifications', 'get', null, token)
            .then(async res => {
                setLoading(false);
                console.log(' \n\n Result ', JSON.stringify(res));
                if (res.status === true) {
                    if (typeof res.data != "undefined") {
                        setNotificationData(res.data);
                    }
                }
            })
            .catch(error => {
                setLoading(false);
                showToastMessage("Something went wrong.");
            });
    };

    const renderItem = ({ item, index }) => (
        <View
            style={{
                padding: 13,
                backgroundColor: index % 2 ? WHITE : GRAY_200,
            }}>
            <OVText size={medium} fontType={poppinsRegular} color={GRAY_700}>
                {item.message}
            </OVText>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Notifications"
            />
            {notificationData.length ?
                <FlatList
                    data={notificationData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                :
                <OVText style={{ textAlign: 'center', marginTop: 4, paddingBottom: 10 }} size={medium} fontType={poppinsRegular} color={GRAY_700}>
                    No Notification Found.
                </OVText>
            }

            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

export default Notificatios;
