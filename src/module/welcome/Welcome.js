/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Dimensions, Image, SafeAreaView, ScrollView, View} from 'react-native';
import labels from '../../assets/labels';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import {OVButton} from '../../components/OVButton';
import OVText, {poppinsMedium, small} from '../../components/OVText';
import FlatListSlider from '../../flatListSlider/FlatListSlider';
import ImageSliderView from '../../flatListSlider/WelcomeImageSlider';
import {
  APP_ICON,
  LOGIN_BG,
  WELCOME_BANNER_1,
  WELCOME_BANNER_2,
  WELCOME_BG,
} from '../../images';
import {
  APP_THEME_COLOR,
  BLACK,
  GREEN_COLOR,
  WHITE,
  YELLOW,
} from '../../utils/Colors';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Welcome = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [sliderData, setSliderData] = useState([
    {image: WELCOME_BANNER_1, title: 'Hello 1'},
    {image: WELCOME_BANNER_2, title: 'Hello 2'},
  ]);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Image
            source={WELCOME_BG}
            style={{
              width: windowWidth,
              height: windowHeight,
              resizeMode: 'stretch',
            }}
          />
          <View
            style={{
              position: 'absolute',
              flexDirection: 'column',
              width: windowWidth,
              height: windowHeight,
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={APP_ICON}
                style={{
                  width: 150,
                  height: 40,
                  resizeMode: 'contain',
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />
            </View>

            <FlatListSlider
              width={windowWidth}
              height={200}
              data={sliderData}
              timer={5000}
              component={<ImageSliderView />}
              indicatorActiveWidth={10}
              contentContainerStyle={{paddingHorizontal: 8}}
              indicatorContainerStyle={{position: 'absolute', bottom: -20}}
              indicatorActiveColor={YELLOW}
              indicatorInActiveColor="gray"
              animation
            />

            {/* <PagerView /> */}

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 20,
              }}>
              <OVButton
                title="SIGN IN"
                color={WHITE}
                textColor={APP_THEME_COLOR}
                marginTop={20}
                onPress={() => navigation.navigate('Login')}
              />

              <OVButton
                title="SIGN UP"
                color={APP_THEME_COLOR}
                textColor={WHITE}
                marginTop={20}
                onPress={() => navigation.navigate('SignUp')}
              />
              <OVText
                size={small}
                fontType={poppinsMedium}
                color={BLACK}
                style={{marginTop: 20, textAlign: 'center'}}>
                {labels.privacyPolicy}
              </OVText>
            </View>
          </View>

          {loading && <LoaderIndicator loading={loading} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;

{
  /* <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: 'row',
              }}>
              <OVButton
                title="TRAINING CENTER"
                color={WHITE}
                textColor={APP_THEME_COLOR}
                marginTop={30}
                onPress={() => navigation.navigate('Login')}
                style={{flex: 1, marginEnd: 10}}
                fontSize={14}
              />

              <OVButton
                title="VETERINARY"
                color={WHITE}
                textColor={APP_THEME_COLOR}
                marginTop={30}
                onPress={() => navigation.navigate('Login')}
                style={{flex: 1, marginEnd: 10}}
                fontSize={14}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 20,
                flexDirection: 'row',
              }}>
              <OVButton
                title="PET CARE"
                color={APP_THEME_COLOR}
                textColor={WHITE}
                marginTop={20}
                onPress={() => navigation.navigate('Login')}
                style={{flex: 1, marginEnd: 10}}
                fontSize={14}
              />

              <OVButton
                title="PET SHOP"
                color={APP_THEME_COLOR}
                textColor={WHITE}
                marginTop={20}
                onPress={() => navigation.navigate('Login')}
                style={{flex: 1, marginEnd: 10}}
                fontSize={14}
              />
            </View>
            <OVButton
              title="PET SHOP"
              color={APP_THEME_COLOR}
              textColor={WHITE}
              marginTop={20}
              onPress={() => navigation.navigate('Login')}
              width="40%"
              fontSize={14}
            />
            <OVText
              size={small}
              fontType={poppinsMedium}
              color={BLACK}
              style={{marginTop: 20, textAlign: 'center'}}>
              {labels.privacyPolicy}
            </OVText> */
}
