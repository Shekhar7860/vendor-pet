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
import { Header } from '../../common/Header';
import OVText, {
    large,
    medium,
    poppinsMedium,
    small,
} from '../../components/OVText';
import { REMINDER_1, REMINDER_2 } from '../../images';
import { APP_THEME_COLOR, BG_COLOR, WHITE, YELLOW } from '../../utils/Colors';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage, validateNumber } from '../../utils';
const windowWidth = Dimensions.get('window').width;

const reminderData2 = [
    {
        id:1,
        image: REMINDER_1,
        message: 'You have a grooming appointment at 4PM',
    },
    {
        id:2,
        image: REMINDER_2,
        message: 'You have a grooming appointment at 4PM',
    }
];

const Reminders = props => {

    const navigation = useNavigation();
    const { user, token, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [reminderDay, setReminderDay] = useState('---');
    const [reminderDate, setReminderDate] = useState('--/--/----');
    const [reminderData, setReminderData] = useState([]);

    useEffect(() => {
        getReminders();
    }, []);

    const getReminders = () => {

        setLoading(true);
        Network('user/get-vendor-reminders', 'get', null, token)
            .then(async res => {
                setLoading(false);
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    if (typeof res.data.reminder_list != "undefined") {
                        setReminderDay(res.data.day);
                        setReminderDate(res.data.date);
                        setReminderData(res.data.reminder_list);
                    }
                }
            })
            .catch(error => {
                setLoading(false);
                showToastMessage("Something went wrong.");
            });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity activeOpacity={1} style={{ marginHorizontal: 10 }}>
            <View
                style={{
                    margin: 6,
                    flexDirection: 'row',
                    backgroundColor: WHITE,

                    marginTop: 10,
                    elevation: 3,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    source={item.image}
                    style={{ resizeMode: 'contain', marginHorizontal: 20, padding: 10 }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        padding: 13,
                        backgroundColor: YELLOW,
                        borderTopEndRadius: 25,
                        borderBottomEndRadius: 25,
                    }}>
                    <OVText size={medium} fontType={poppinsMedium} color={WHITE}>
                        {item.message}
                    </OVText>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Reminders"
            />
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        backgroundColor: WHITE,
                    }}>
                    <View
                        style={{
                            width: '40%',
                            marginTop: 20,
                            borderColor: YELLOW,
                            borderRadius: 14,
                            borderWidth: 2,
                            padding: 6,
                            alignSelf: 'center',
                        }}>
                        <OVText
                            size={large}
                            fontType={poppinsMedium}
                            color={APP_THEME_COLOR}
                            style={{ textAlign: 'center' }}>
                            {reminderDay}
                        </OVText>
                        <OVText
                            size={small}
                            fontType={poppinsMedium}
                            color={APP_THEME_COLOR}
                            style={{ textAlign: 'center', marginTop: 4, fontSize: 10 }}>
                            {reminderDate}
                        </OVText>
                    </View>
                    {reminderData.length ? 
                        <FlatList
                            data={reminderData}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            style={{ marginTop: 10 }}
                        />
                        :
                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={APP_THEME_COLOR}
                            style={{ textAlign: 'center', marginTop: 4,paddingBottom:10 }}>
                            No Reminder Found.
                        </OVText>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Reminders;
