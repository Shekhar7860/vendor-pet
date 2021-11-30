/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import EmptyView from '../../common/EmptyView';
import { Header } from '../../common/Header';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { OVButton } from '../../components/OVButton';
import OVText, {
    medium,
    poppinsMedium,
    poppinsRegular,
} from '../../components/OVText';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import {
    APP_THEME_COLOR,
    BLACK,
    GRAY_400,
    ORANGE,
    TEXT_COLOR_AUTH_TITLES,
    WHITE,
} from '../../utils/Colors';

const windowWidth = Dimensions.get('window').width;

var orderListData;
const MyOrders = props => {
    const navigation = useNavigation();
    const [isUpcoming, setIsUpcoming] = useState(true);
    const { user, token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        getMyOrders();
    }, []);

    const getMyOrders = date => {
        setLoading(true);
        Network('user/get-vendor-orders', 'get', null, token)
            .then(async res => {
                console.log(' /n/n Result ', res);
                if (res.status) {
                   orderListData = res.data;
                   setOrderData(orderListData)
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                showToastMessage("Something went wrong.");
            });
    };

    const filterOrderList = (data, type) => {
        let filterArray = [];
        if (type) {
            filterArray = data.filter(function (e) {
                return new Date(e.date) >= new Date();
            });
        } else {
            filterArray = data.filter(function (e) {
                return new Date(e.date) < new Date();
            });
        }
        setOrderData(filterArray);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
        onPress={() => {
            navigation.navigate('OrderDetails', { order_id: item.id });
          }}
            style={{
                margin: 10,
                flexDirection: 'column',
                backgroundColor: WHITE,
                marginTop: 10,
                elevation: 3,
                borderRadius: 25,
                paddingVertical: 10,
                paddingHorizontal: 20,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                    Name:
                </OVText>
                <OVText
                    size={medium}
                    fontType={poppinsRegular}
                    color={TEXT_COLOR_AUTH_TITLES}>
                    {item.p_name}
                </OVText>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                }}>
                <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                    Description:
                </OVText>
                <OVText
                    size={medium}
                    fontType={poppinsRegular}
                    color={TEXT_COLOR_AUTH_TITLES}>
                    {item.p_description}
                </OVText>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                }}>
                <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                  Rate:
                </OVText>
                <OVText
                    size={medium}
                    fontType={poppinsRegular}
                    color={TEXT_COLOR_AUTH_TITLES}>
                    {item.p_rate}
                </OVText>
            </View>

            {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
          List of Services Booked:
        </OVText>
        <OVText
          size={medium}
          fontType={poppinsRegular}
          color={TEXT_COLOR_AUTH_TITLES}>
          Grooming
        </OVText>
      </View> */}

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                }}>
                <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                    Order Weight:
                </OVText>
                <OVText
                    size={medium}
                    fontType={poppinsRegular}
                    color={TEXT_COLOR_AUTH_TITLES}>
                    {item.weight}
                </OVText>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                }}>
                <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                    Total Price:
                </OVText>
                <OVText
                    size={medium}
                    fontType={poppinsRegular}
                    color={TEXT_COLOR_AUTH_TITLES}>
                    {item.total_price}
                </OVText>
            </View>
            {/* {isUpcoming && (
                <OVButton
                    title="Assign"
                    color={APP_THEME_COLOR}
                    textColor={WHITE}
                    marginTop={20}
                    onPress={() => {
                        navigation.navigate('AssignDoctor', { itemData: item });
                    }}
                    width={windowWidth / 2}
                    borderRadius={20}
                />
            )} */}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Orders"
            />
            <View
                style={{
                    borderBottomStartRadius: 30,
                    borderBottomEndRadius: 30,
                    backgroundColor: WHITE,
                    elevation: 4,
                    flexDirection: 'row',
                }}>
                <View style={{ backgroundColor: GRAY_400, width: 1, height: '100%' }} />
                
            </View>
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        backgroundColor: WHITE,
                    }}>
                    <FlatList
                        data={orderData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={{ marginTop: 10 }}
                        ListEmptyComponent={
                            <EmptyView title="No data found" textColor={BLACK} />
                        }
                    />
                </View>
            </ScrollView>
            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

export default MyOrders;
