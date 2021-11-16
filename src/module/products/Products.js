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
  medium,
  poppinsBlack,
  xLarge
} from '../../components/OVText';
import {VACCINATION_ICON, PERSON} from '../../images';
import {AuthContext} from '../../services/authProvider';
import {APP_THEME_COLOR, BLACK, ORANGE, RED, WHITE} from '../../utils/Colors';
import Network from '../../network/Network';
import {showToastMessage, validateNumber} from '../../utils';
import ProductDialog from './ProductDialog';
import EmptyView from '../../common/EmptyView';
import { useIsFocused } from "@react-navigation/native";
const windowWidth = Dimensions.get('window').width;

const Products = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {user, token, setUser} = useContext(AuthContext);
  const [productData, setProductData] = useState([]);
  const [vaccinationDialog, setVaccinationDialog] = useState(false);

  useEffect(() => {
    getProductList();
  }, [isFocused]);

  const getProductList = () => {
    Network('user/get-products', 'get', null, token)
      .then(async res => {
        if (res.status === true) {
          console.log(' \n\n Result ', JSON.stringify(res));
          setProductData(res.data);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        showToastMessage("Something went wrong.");
      });
  };

  const editProduct = (item, index) => {
    navigation.navigate('AddProduct', {data : item})
  }

  const deleteProduct = (id, index) => {
    console.log('id', id)
   
    // return false
    setLoading(true);
    // let data = new FormData();
    // data.append('id', id);

    Network(`user/delete-product/${id}`, 'get', null, token)
      .then(async res => {
        if (res.status === true) {
          console.log(' \n\n Result ', JSON.stringify(res));
          let updated = [...productData] 
          updated.splice(index, 1);
          setProductData(updated)
        }
        setLoading(false);
        showToastMessage(res.message);
      })
      .catch(error => {
        setLoading(false);
        showToastMessage("Something went wrong.");
      });
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity activeOpacity={1} style={{marginHorizontal: 10, height : 100}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Image
          style={{ width: 100, height: 80, borderWidth: 1 }}
          source={{
            uri: item.img_path
          }}
        />
        <View style={{flexDirection : 'column', width : '35%'}}>
          <OVText
              size={xLarge}
              fontType={poppinsRegular}
              color={BLACK}
              style={{ textTransform: 'capitalize'}}
              >
             {item.p_name}
            </OVText>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={BLACK}
              style={{ textTransform: 'capitalize'}}
              >
              {item.p_description}
            </OVText>
            <OVText
              size={large}
              fontType={poppinsRegular}
              color={BLACK}
              >
              {'Rs. ' +  item.net_amt}
            </OVText>
            </View>
            <View style={{flexDirection : 'column', justifyContent : 'space-between'}}>
            <Image source={PERSON} style={{ width : 50, height : 50 }} />
        <View
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <OVText
              size={small}
              fontType={poppinsRegular}
              color={RED}
              onPress={() => deleteProduct(item.id)}
              >
              DELETE
            </OVText>
            <View style={{width : '2%'}}/>
            <OVText
              size={small}
              fontType={poppinsRegular}
              color={RED}
              onPress={() => editProduct(item)}>
              EDIT
            </OVText>
          </View>
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
        title="Products Details For Listing"
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
            Add product details for listing
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
          {productData.length > 0 && (
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
                data={productData}
                renderItem={renderItem}
                keyExtractor={item => item.image}
                style={{marginTop: 10}}
              />
            </View>
          )}

          {productData.length === 0 && (
            <View style={{flex: 1}}>
              <EmptyView title="No Product available" textColor={BLACK} />
            </View>
          )}
          <OVText
            onPress={() => {
              navigation.navigate('AddProduct')
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
            Add Product
          </OVText>
        </View>
      </ScrollView>
      {/* <ProductDialog
        dialogVisible={vaccinationDialog}
        setDialogVisible={(status, productName, productPrice, productDescription, image) => {
          if (status) {
            saveProductList(productName, productPrice, productDescription, image);
          }
          setVaccinationDialog(false);
        }}
      /> */}
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default Products;
