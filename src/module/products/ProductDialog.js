/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {Image, Modal, TouchableOpacity, View, StyleSheet, SafeAreaView,
  ScrollView, Alert} from 'react-native';
import {OVButton} from '../../components/OVButton';
import OVText, {medium, poppinsRegular,poppinsSemiBold, small, poppinsMedium} from '../../components/OVText';
import {OVTextInput} from '../../components/OVTextInput';
import {CLOSE_DIALOG, BOARDING_LOCATION, BOARDING_PRICE, DASHBOARD, PLUS, BOTTOM_ARROW} from '../../images';
import { APP_THEME_COLOR,
  BG_COLOR,
  BLACK,
  GRAY_200,
  ORANGE,
  TEXT_COLOR_AUTH_TITLES,
  WHITE,
  YELLOW,} from '../../utils/Colors';
  import { AuthContext } from '../../services/authProvider';
import ImagePicker from '../../components/ImagePicker';
import Network from '../../network/Network';
import CategoriesDialog from './CategoriesDialog';
import {Header} from '../../common/Header';
import {showToastMessage, validateNumber} from '../../utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const initialData = {
  productBrand : "",
  productId : "",
  productCategory : "",
  productWeight : "",
  productUnits : "",
  suitedForAge : "",
  suitedForSize : "",
  meatType : "",
  categoryId : 1,
  unitId : 1,
  suitAgeId :1,
  suitPetId :1,
  productType : 'General'
}
import {LoaderIndicator} from '../../common/LoaderIndicator';

export default function ProductDialog(props) {
  const {dialogVisible, setDialogVisible} = props;
  const [showImagePickerDialog, setShowImagePickerDialog] = useState(false);
  const { user, token, setUser } = useContext(AuthContext);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [categoriesDialog, setCategoriesDialog] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [filterType, setFilterType] = useState(1);
  const [experianceData, setExperianceData] = useState('');
  const [error, setError] = useState(false);
  const [image, setImagePath] = useState("")
  const [state, setState] = useState(initialData)
  const [searchDegree, setSearchDegree] = useState([]);
  const [loading, setLoading] = useState(false);
  const [experiance, setExperiance] = useState(
    user?.exprience === null || user?.exprience == 0 ||
        user?.exprience_name === null || user?.exprience_name == ''
        ? {
            id: 0,
            name: 'Select experience',
        }
        : {
            id: user?.exprience,
            name: user.exprience_name,
        },
);
useEffect(() => {
 
  console.log("user session", user);
}, []);

useEffect(() => {
if(props.route.params && props.route.params.data)
{
  console.log('paramas',  props.route.params.data)
  setProductName(props.route.params.data.p_name)
  setProductDescription(props.route.params.data.p_description)
  setImagePath(props.route.params.data.img_path)
  setProductPrice(props.route.params.data.p_rate.toString())
  setState({
    ...state,
    productId : props.route.params.data.id,
    productBrand : props.route.params.data.product_brand,
    productCategory : props.route.params.data.product_category_id,
    productWeight : props.route.params.data.product_measure,
    productUnits : "",
    suitedForAge : "",
    suitedForSize : "",
    meatType : props.route.params.data.meat_type,
    categoryId : 1,
    unitId : 1,
    suitAgeId :1,
    suitPetId :1,
    productType : 'General'
  })
  
}
}, [props.route.params]);
const getExperianceList = () => {
  Network('user/get-exprience-list', 'get', null, token)
      .then(async res => {
          // console.log(' \n\n Result ', JSON.stringify(res));
          if (res.status === true) {
            
              setExperianceData(res.data);
          }
      })
      .catch(error => {
          setLoading(false);
      });
};


  const getVisibleData = type => {
    switch (type) {
          case 1:
            return experianceData;
            case 2:
            return [{
              name : 1
            }];
            case 3:
            return [{
              name : 1
            }];
            case 4:
            return [{
              name : 10
            }];
            case 5:
              return [{
                name : 20
              }];
              case 6:
              return [{
                name : 'General'
              }];
    }
};
const getVisibleTitle = type => {
  switch (type) {
      case 1:
          return 'Select Experience';
  }
};

const setUpdatedDegree = (arr) => {
  setSearchDegree(arr)
}

const submitData = async () => {
  console.log('state', state)
  if(!image)
  {
    return Alert.alert("Please Upload Image")
  }
  if(!productName)
  {
    return Alert.alert("Please Enter Product Name")
  }
  if(state.productBrand == "")
  {
    return Alert.alert("Please Enter Product Brand")
  }
  if(!state.productWeight)
  {
    return Alert.alert("Please Enter Product Weight")
  }
  if(!state.meatType)
  {
    return Alert.alert("Please Enter Meat Type")
  }
  if(!productDescription)
  {
    return Alert.alert("Please Enter Product Description")
  }
  if(!productPrice)
  {
    return Alert.alert("Please Enter Product Price")
  }
  saveProductList()
}

const saveProductList = () => {
  setLoading(true);
  let data = new FormData();
  data.append('p_name', productName);
  data.append('p_code', 12325462);
  data.append('p_description', productDescription);
  data.append('pet_type', 1);
  data.append('product_category_id', 1);
  data.append('product_subcategory_id', 1);
  data.append('product_brand', 1);
  data.append('product_type', 'General');
  data.append('p_rate', productPrice);
  data.append('p_rate_sale', productPrice);
  data.append('quantity', 15);
  data.append('gross_amt', productPrice);
  data.append('discount', 5);
  data.append('net_amt', productPrice);
  data.append('shipping_cost', 10);
  data.append('img_path', {
    uri: image,
    name: Date.parse(new Date()) + 'productImage.png',
    filename: 'productImage.png',
    type: 'image/png',
});
data.append('meat_type', state.meatType);
data.append('size', state.suitAgeId);
data.append('status', 1);
data.append('sku', 1);
data.append('hsn_code', "GD124");
data.append('color', 'red');
data.append('product_measure', state.productWeight);

if(!state.productId)
{
  Network('user/add-product', 'post', data, token)
    .then(async res => {
      console.log('inres', res)
      if (res.status === true) {
        console.log(' \n\n Result ', JSON.stringify(res));
        props.navigation.goBack()
      }
      setLoading(false);
      showToastMessage(res.message);
    })
    .catch(error => {
      console.log('error', error)
      setLoading(false);
      showToastMessage("Something went wrong.");
    });
  }
  else {
    data.append('p_id', state.productId);
    Network('user/update-product', 'post', data, token)
    .then(async res => {
      console.log('inres', res)
      if (res.status === true) {
        console.log(' \n\n Result ', JSON.stringify(res));
        props.navigation.navigate('Products')
      }
      setLoading(false);
      showToastMessage(res.message);
    })
    .catch(error => {
      console.log('error', error)
      setLoading(false);
      showToastMessage("Something went wrong.");
    });
  }
};

  return (
    <>
    <SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
      <Header
        isHome={false}
        navigation={props.navigation}
        onBackPressed={() => props.navigation.goBack()}
        title="Add Product"
      />
      <KeyboardAwareScrollView style={{flex : 1}}>
      <TouchableOpacity  onPress={() => setShowImagePickerDialog(true)} style={{height : 80, width : 120, backgroundColor: WHITE,
    alignSelf : 'center',
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : 20,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.4)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.7,
        shadowRadius: 20,
      },
      android: {
        elevation: 2,
      },
    })}
    }>
      {image == "" ?  <Image source={PLUS} /> :  <Image
        source={{ uri: image }} style={styles.images}
      />}
      <OVText
                size={small}
                fontType={poppinsMedium}
                >
                Upload Image
              </OVText>
    </TouchableOpacity>
            <View style={{flexDirection : 'column'}}>
             <View style={{margin: 20}}>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={BLACK}
              style={{marginTop: 10}}>
              Product Name
            </OVText>
            <OVTextInput
              editable={true}
              isBackground={true}
              placeHolderText=""
              value={productName}
              onChange={value => setProductName(value)}
            />
             <OVText
              size={medium}
              fontType={poppinsRegular}
              color={BLACK}
              style={{marginTop: 10}}>
              Product Brand
            </OVText>
            <OVTextInput
              editable={true}
              isBackground={true}
              placeHolderText=""
              value={state.productBrand}
              onChange={value => setState({...state, productBrand : value})}
            />
              <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ margin: 10 }}>
                               Category
                            </OVText>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    setFilterType(2);
                                    setCategoriesDialog(true);
                                }}>
                                <View
                                    style={{
                                        backgroundColor: GRAY_200,
                                        paddingVertical: 2,
                                        flexDirection: 'column',
                                    }}>
                                    <OVTextInput
                                        editable={false}
                                        keyboardType="number"
                                        isBackground={false}
                                        value={"1"}
                                        onChange={value => setExperiance(value)}
                                        rightIcon={BOTTOM_ARROW}
                                    />
                                </View>
                            </TouchableOpacity>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ margin: 10 }}>
                               Product Type
                            </OVText>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    setFilterType(6);
                                    setCategoriesDialog(true);
                                }}>
                                <View
                                    style={{
                                        backgroundColor: GRAY_200,
                                        paddingVertical: 2,
                                        flexDirection: 'column',
                                    }}>
                                    <OVTextInput
                                        editable={false}
                                        keyboardType="number"
                                        isBackground={false}
                                        value={"General"}
                                        onChange={value => setExperiance(value)}
                                        rightIcon={BOTTOM_ARROW}
                                    />
                                </View>
                            </TouchableOpacity>
                            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={BLACK}
              style={{marginTop: 10}}>
              Product Weight
            </OVText>
            <OVTextInput
              editable={true}
              isBackground={true}
              placeHolderText=""
              value={state.productWeight}
              onChange={value => setState({...state, productWeight : value})}
            />
            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ margin: 10 }}>
                               Number Of Units (In Inventory)
                            </OVText>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    setFilterType(2);
                                    setCategoriesDialog(true);
                                }}>
                                <View
                                    style={{
                                        backgroundColor: GRAY_200,
                                        paddingVertical: 2,
                                        flexDirection: 'column',
                                    }}>
                                    <OVTextInput
                                        editable={false}
                                        keyboardType="number"
                                        isBackground={false}
                                        value={"1"}
                                        onChange={value => setExperiance(value)}
                                        rightIcon={BOTTOM_ARROW}
                                    />
                                </View>
                            </TouchableOpacity>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ margin: 10 }}>
                               Suited for age
                            </OVText>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    setFilterType(4);
                                    setCategoriesDialog(true);
                                }}>
                                <View
                                    style={{
                                        backgroundColor: GRAY_200,
                                        paddingVertical: 2,
                                        flexDirection: 'column',
                                    }}>
                                    <OVTextInput
                                        editable={false}
                                        keyboardType="number"
                                        isBackground={false}
                                        value={"10"}
                                        onChange={value => setExperiance(value)}
                                        rightIcon={BOTTOM_ARROW}
                                    />
                                </View>
                            </TouchableOpacity>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ margin: 10 }}>
                               Suited for size of pet
                            </OVText>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    setFilterType(5);
                                    setCategoriesDialog(true);
                                }}>
                                <View
                                    style={{
                                        backgroundColor: GRAY_200,
                                        paddingVertical: 2,
                                        flexDirection: 'column',
                                    }}>
                                    <OVTextInput
                                        editable={false}
                                        keyboardType="number"
                                        isBackground={false}
                                        value={"20"}
                                        onChange={value => setExperiance(value)}
                                        rightIcon={BOTTOM_ARROW}
                                    />
                                </View>
                            </TouchableOpacity>
                            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={BLACK}
              style={{marginTop: 10}}>
             Meat Type
            </OVText>
            <OVTextInput
              editable={true}
              isBackground={true}
              placeHolderText=""
              value={state.meatType}
              onChange={value => setState({...state, meatType : value})}
            />
         
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={BLACK}
              style={{marginTop: 20}}>
              Description
            </OVText>
            <OVTextInput
              editable={true}
              height={100}
              keyboardType="text"
              isBackground={true}
              placeHolderText=""
              value={productDescription}
              leftIcon={BOARDING_LOCATION}
              onChange={value => setProductDescription(value)}
            />
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={BLACK}
              style={{marginTop: 20}}>
              Price Of The Product
            </OVText>
            <OVTextInput
              editable={true}
              keyboardType="number"
              isBackground={true}
              placeHolderText=""
              value={productPrice}
              leftIcon={BOARDING_PRICE}
              onChange={value => setProductPrice(value)}
            />
            

            {error && (
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={RED}
                style={{marginTop: 10}}>
                Please enter valid data
              </OVText>
            )}
 </View>
 </View>
          <OVButton
              title="Save"
              color={APP_THEME_COLOR}
              textColor={WHITE}
              marginTop={20}
              marginBottom={20}
              onPress={() => {
               submitData()
              }}
              width={200}
            />
   
      </KeyboardAwareScrollView>
      <ImagePicker
        selectedImagePath={path => {
          setShowImagePickerDialog(false);
          console.log('path', path)
          setImagePath(path);
        }}
        dialogVisible={showImagePickerDialog}
        setDialogVisible={() => setShowImagePickerDialog(false)}
      />
         <CategoriesDialog
                    data={getVisibleData(filterType)}
                    dialogVisible={categoriesDialog}
                    setUpdatedDegree={setUpdatedDegree} 
                    searchDegree={searchDegree}
                    setDialogVisible={() => setCategoriesDialog(false)}
                    onSelectedItem={item => {
                        switch (filterType) {
                            case 1:
                                setExperiance(item);
                                break;
                            case 2:
                                setState({...state, categoryId : 1})
                                break;
                            case 3:
                              setState({...state, unitId : 1})
                              break;
                            case 4:
                              setState({...state, suitAgeId : 1})
                                break;
                             case 5:
                              setState({...state, suitPetId : 1})
                              break;
                        }
                        setCategoriesDialog(false);
                    }}
                    title={getVisibleTitle(filterType)}
                />
                </SafeAreaView>
                {loading && <LoaderIndicator loading={loading} />}
                </>
   
  );
}

const styles = StyleSheet.create({
  images: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    marginHorizontal: 3
  },
  
});
