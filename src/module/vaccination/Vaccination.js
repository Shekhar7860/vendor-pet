/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState, useEffect} from 'react';
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
import {LoaderIndicator} from '../../common/LoaderIndicator';
import OVText, {
  large,
  poppinsMedium,
  poppinsRegular,
  small,
} from '../../components/OVText';
import {VACCINATION_ICON} from '../../images';
import {AuthContext} from '../../services/authProvider';
import {APP_THEME_COLOR, BLACK, ORANGE, RED, WHITE} from '../../utils/Colors';
import Network from '../../network/Network';
import {showToastMessage, validateNumber} from '../../utils';
import AllVaccineDialog from './AllVaccineDialog';
import EmptyView from '../../common/EmptyView';

const windowWidth = Dimensions.get('window').width;

const Vaccination = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {user, token, setUser} = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState([]);
  const [vaccinationDialog, setVaccinationDialog] = useState(false);

  useEffect(() => {
    getVaccineList();
  }, []);

  const getVaccineList = () => {
    Network('user/get-clinic-vaccines', 'get', null, token)
      .then(async res => {
        if (res.status === true) {
          console.log(' \n\n Result ', JSON.stringify(res));
          setCategoryData(res.data);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        showToastMessage("Something went wrong.");
      });
  };

  const saveVaccineList = (vaccineName, vaccinePrice) => {
    setLoading(true);
    let data = new FormData();
    data.append('name', vaccineName);
    data.append('price', vaccinePrice);

    Network('user/add-clinic-vaccine', 'post', data, token)
      .then(async res => {
        if (res.status === true) {
          console.log(' \n\n Result ', JSON.stringify(res));
          getVaccineList();
        }
        setLoading(false);
        showToastMessage(res.message);
      })
      .catch(error => {
        setLoading(false);
        showToastMessage("Something went wrong.");
      });
  };

  const removeVaccineList = id => {
    setLoading(true);
    let data = new FormData();
    data.append('id', id);

    Network('user/delete-clinic-vaccine', 'post', data, token)
      .then(async res => {
        if (res.status === true) {
          console.log(' \n\n Result ', JSON.stringify(res));
          getVaccineList();
        }
        setLoading(false);
        showToastMessage(res.message);
      })
      .catch(error => {
        setLoading(false);
        showToastMessage("Something went wrong.");
      });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity activeOpacity={1} style={{marginHorizontal: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={VACCINATION_ICON}
          style={{resizeMode: 'contain', marginHorizontal: 20}}
        />
        <View
          style={{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 6,
              borderTopEndRadius: 25,
              borderBottomEndRadius: 25,
            }}>
            <OVText
              size={small}
              fontType={poppinsRegular}
              color={BLACK}
              style={{flex: 1}}>
              {item.name}
            </OVText>
            <OVText
              size={small}
              fontType={poppinsRegular}
              color={RED}
              onPress={() => removeVaccineList(item.id)}>
              Remove
            </OVText>
          </View>
          <View
            style={{
              backgroundColor: ORANGE,
              width: '100%',
              height: 1,
              marginTop: 6,
              marginBottom: 20,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Vaccines List"
      />

      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: WHITE,
            paddingTop: 20,
          }}>
          <OVText
            size={large}
            fontType={poppinsMedium}
            color={APP_THEME_COLOR}
            style={{textAlign: 'center'}}>
            List of Available Vaccnies
          </OVText>
          <View
            style={{
              backgroundColor: ORANGE,
              width: '70%',
              height: 5,
              marginHorizontal: 20,
              marginTop: 10,
              alignSelf: 'center',
              marginBottom: 20,
            }}
          />
          {categoryData.length > 0 && (
            <View
              style={{
                margin: 6,
                flexDirection: 'row',
                backgroundColor: WHITE,
                marginTop: 10,
                elevation: 3,
                borderRadius: 20,
                marginHorizontal: 10,
                flex: 1,
              }}>
              <FlatList
                data={categoryData}
                renderItem={renderItem}
                keyExtractor={item => item.image}
                style={{marginTop: 10}}
              />
            </View>
          )}

          {categoryData.length === 0 && (
            <View style={{flex: 1}}>
              <EmptyView title="No Vaccine list available" textColor={BLACK} />
            </View>
          )}
          <OVText
            onPress={() => {
              setVaccinationDialog(true);
            }}
            size={small}
            fontType={poppinsRegular}
            color={WHITE}
            style={{
              backgroundColor: APP_THEME_COLOR,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 20,
              elevation: 3,
              marginHorizontal: 10,
              textAlign: 'center',
              marginTop: 20,
              width: '30%',
              alignSelf: 'flex-end',
              marginBottom: 20,
            }}>
            Add Vaccine
          </OVText>
        </View>
      </ScrollView>
      <AllVaccineDialog
        dialogVisible={vaccinationDialog}
        setDialogVisible={(status, vaccineName, vaccinePrice) => {
          if (status) {
            saveVaccineList(vaccineName, vaccinePrice);
          }
          setVaccinationDialog(false);
        }}
      />
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default Vaccination;
