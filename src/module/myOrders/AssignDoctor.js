/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../common/Header';
import {OVButton} from '../../components/OVButton';
import OVText, {
  large,
  medium,
  poppinsMedium,
  poppinsRegular,
} from '../../components/OVText';
import {APP_ICON} from '../../images';
import {
  APP_THEME_COLOR,
  BLACK,
  GREEN,
  TEXT_COLOR_AUTH_TITLES,
  WHITE,
} from '../../utils/Colors';
import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';
import {showToastMessage} from '../../utils';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import EmptyView from '../../common/EmptyView';
import LinearGradient from 'react-native-linear-gradient';

const AssignDoctor = props => {
  const {itemData} = props.route.params;
  const navigation = useNavigation();
  const {token} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const [lastSelectedPosition, setLastSelectedPosition] = useState(-1);

  useEffect(() => {
    getAllDoctor();
  }, []);

  const getAllDoctor = () => {
    setLoading(true);
    Network('user/get-clinic-doctors', 'get', null, token)
      .then(async res => {
        console.log(' /n/n Result ', JSON.stringify(res));
        if (res.status) {
          var result = res.data;
          setCategoryData(result);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        showToastMessage("Something went wrong.");
      });
  };

  const assignDoctor = () => {
    setLoading(true);
    const payload = {
      appointment_id: itemData.id,
      doctor_id: categoryData[lastSelectedPosition].id,
    };
    Network('user/assign-appointment-doctor', 'post', payload, token)
      .then(async res => {
        console.log(' /n/n Result ', JSON.stringify(res));

        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        showToastMessage("Something went wrong.");
      });
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setLastSelectedPosition(index);
        setRefreshList(!refreshList);
      }}>
      <View
        style={{
          margin: 10,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {item.image !== null ? (
          <Image
            source={{uri: item.image}}
            style={{width: 80, height: 80, borderRadius: 10}}
          />
        ) : (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FAA41A', '#906445', '#28246F']}
            style={{
              padding: 10,
              width: 80,
              height: 80,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={APP_ICON}
              style={{width: 40, height: 40, resizeMode: 'contain'}}
            />
          </LinearGradient>
        )}
        <OVText
          size={medium}
          fontType={poppinsRegular}
          color={
            lastSelectedPosition === index ? GREEN : TEXT_COLOR_AUTH_TITLES
          }
          style={{textAlign: 'center', marginTop: 10}}>
          {item.name}
        </OVText>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Assign Doctor"
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
                Pet Owner:
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_AUTH_TITLES}>
                {itemData.pet_owner}
              </OVText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                Breed:
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_AUTH_TITLES}>
                {itemData.pet_breed}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                Pet Age:
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_AUTH_TITLES}>
                {itemData.pet_age} Years
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
                Appointment Time:
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_AUTH_TITLES}>
                {itemData.time}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                Appointment Date:
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_AUTH_TITLES}>
                {itemData.date}
              </OVText>
            </View>
          </View>
          <View style={{marginStart: 20, marginVertical: 10}}>
            <OVText size={large} fontType={poppinsRegular} color={BLACK}>
              ASSIGN TO
            </OVText>
            <View
              style={{
                backgroundColor: APP_THEME_COLOR,
                height: 5,
                width: '25%',
              }}
            />
          </View>
          <FlatList
            data={categoryData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{marginTop: 10}}
            numColumns={3}
            extraData={refreshList}
            ListEmptyComponent={
              <EmptyView
                title="No doctor associated with your clinic"
                textColor={BLACK}
              />
            }
          />
          {categoryData.length > 0 && lastSelectedPosition !== -1 && (
            <OVButton
              title="Confirm"
              color={APP_THEME_COLOR}
              textColor={WHITE}
              marginTop={20}
              onPress={() => assignDoctor()}
              borderRadius={20}
            />
          )}
        </View>
      </ScrollView>
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default AssignDoctor;
