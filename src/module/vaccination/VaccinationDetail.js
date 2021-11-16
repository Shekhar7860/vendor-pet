/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../../common/Header';
import {OVButton} from '../../components/OVButton';
import OVText, {
  medium,
  poppinsLight,
  poppinsMedium,
  poppinsRegular,
  small,
} from '../../components/OVText';
import {
  CLINIC_IMAGE,
  SEARCH_BLACK,
  VACCINATION_ADD,
  VACCINATION_BANNER,
} from '../../images';
import {
  APP_THEME_COLOR,
  BLACK,
  TEXT_COLOR_LIGHT,
  WHITE,
  YELLOW,
} from '../../utils/Colors';

const windowWidth = Dimensions.get('window').width;

const categoryData = [
  {
    image: CLINIC_IMAGE,
    name: 'Annual Vaccination',
    desc: 'Vasant Vihar, Delhi',
    price: 'Rs. 500',
  },
  {
    image: CLINIC_IMAGE,
    name: 'Rabies Immunization',
    desc: 'Vasant Vihar, Delhi',
    price: 'Rs. 1500',
  },
  {
    image: CLINIC_IMAGE,
    name: 'Canine Corona Virus Immunization',
    desc: 'Vasant Vihar, Delhi',
    price: 'Rs. 1500',
  },
  {
    image: CLINIC_IMAGE,
    name: 'Parvovirus, Hepatitis, Distemper, Leptospirosis Adenovirus, Parainfluenza (DHPP)- 7 in 1',
    desc: 'Vasant Vihar, Delhi',
    price: 'Rs. 15000',
    service: 'Service: Doorstep',
  },
];
const VaccinationDetail = props => {
  const navigation = useNavigation();
  const [sliderData, setSliderData] = useState([
    {bannerImage: VACCINATION_BANNER},
    {bannerImage: VACCINATION_BANNER},
    {bannerImage: VACCINATION_BANNER},
    {bannerImage: VACCINATION_BANNER},
    {bannerImage: VACCINATION_BANNER},
    {bannerImage: VACCINATION_BANNER},
  ]);
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('PetShopDetail', {itemData: item})}
      style={{marginHorizontal: 10}}>
      <View
        style={{
          margin: 6,
          borderRadius: 10,
          flexDirection: 'row',
          backgroundColor: WHITE,
          justifyContent: 'center',
          padding: 10,
          marginTop: 10,
          elevation: 3,
          alignItems: 'center',
        }}>
        <OVText
          size={small}
          fontType={poppinsRegular}
          color={BLACK}
          style={{flex: 1, marginEnd: 10}}>
          {item.name}
        </OVText>
        <OVText
          size={small}
          fontType={poppinsRegular}
          color={BLACK}
          style={{marginEnd: 10}}>
          {item.price}
        </OVText>
        <Image source={VACCINATION_ADD} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Vaccination List"
      />
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: WHITE,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          elevation: 1,
        }}>
        <Image source={SEARCH_BLACK} style={{tintColor: BLACK}} />
        <OVText
          size={small}
          fontType={poppinsMedium}
          color={TEXT_COLOR_LIGHT}
          style={{textAlign: 'center', marginStart: 10}}>
          Search for Price Range, Location
        </OVText>
      </View>
      <ScrollView contentContainerStyle={{backgroundColor: WHITE}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: WHITE,
          }}>
          <OVText
            size={medium}
            fontType={poppinsMedium}
            color={BLACK}
            style={{textAlign: 'center', marginTop: 20, marginHorizontal: 20}}>
            Please Select from the below list of vaccinations available
          </OVText>
          <FlatList
            data={categoryData}
            renderItem={renderItem}
            keyExtractor={item => item.image}
            style={{marginTop: 10}}
          />
          <View
            style={{
              backgroundColor: WHITE,
              padding: 10,
              borderRadius: 20,
              marginTop: 20,
              elevation: 3,
              marginHorizontal: 20,
              flexDirection: 'column',
            }}>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={BLACK}
              style={{
                textAlign: 'center',
                marginTop: 20,
                marginHorizontal: 20,
              }}>
              Select the location for vaccination
            </OVText>

            <View
              style={{
                backgroundColor: YELLOW,
                height: 2,
                marginHorizontal: 30,
                marginTop: 10,
              }}
            />

            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                marginHorizontal: 30,
              }}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={BLACK}
                style={{
                  textAlign: 'center',
                  marginEnd: 10,
                  backgroundColor: YELLOW,
                  borderRadius: 4,
                  flex: 1,
                  padding: 10,
                  color: WHITE,
                  elevation: 3,
                }}>
                DOORSTEP
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={BLACK}
                style={{
                  textAlign: 'center',
                  marginStart: 10,
                  backgroundColor: YELLOW,
                  borderRadius: 4,
                  flex: 1,
                  padding: 10,
                  color: WHITE,
                  elevation: 3,
                }}>
                CLINIC
              </OVText>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={BLACK}
              style={{
                textAlign: 'center',
                marginTop: 20,
                marginStart: 10,
                backgroundColor: YELLOW,
                borderRadius: 4,
                padding: 10,
                color: WHITE,
                elevation: 3,
                marginEnd: 30,
              }}>
              Total : Rs.13000
            </OVText>
          </View>
          <OVButton
            title="Pay Now"
            color={APP_THEME_COLOR}
            textColor={WHITE}
            marginTop={20}
            marginBottom={20}
            onPress={() => navigation.navigate('Home')}
            width={windowWidth - 20}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VaccinationDetail;
