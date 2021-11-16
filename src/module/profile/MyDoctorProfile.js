/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {FlatList, Image, SafeAreaView, ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {windowWidth} from '../../App';
import {Header} from '../../common/Header';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import {OVButton} from '../../components/OVButton';
import OVText, {
  medium,
  poppinsLight,
  poppinsMedium,
  poppinsRegular,
  poppinsSemiBold,
  small,
} from '../../components/OVText';
import {OVTextInput} from '../../components/OVTextInput';
import {
  BOTTOM_ARROW,
  BTN_CHECKED,
  DOCTOR_1,
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHERS,
} from '../../images';
import {AuthContext} from '../../services/authProvider';
import {
  APP_THEME_COLOR,
  BG_COLOR,
  BLACK,
  GRAY_200,
  LIGHT_BLUE,
  ORANGE,
  TEXT_COLOR_AUTH_TITLES,
  WHITE,
  YELLOW,
} from '../../utils/Colors';

const MyDoctorProfile = props => {
  const navigation = useNavigation();
  const {user, token, setUser, setToken} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showImagePickerDialog, setShowImagePickerDialog] = useState(false);
  const [specializationUpdation, setSpecializationUpdation] = useState(false);
  const [specialityData, setSpecialityData] = useState([
    {
      designation: '',
      start_year: '',
      end_year: '',
      presently_working: '',
      isClinic: true,
    },
  ]);

  const pushAndPopSpeciality = type => {
    var array = specialityData;
    if (type) {
      const data = {
        designation: '',
        start_year: '',
        end_year: '',
        presently_working: '',
        isClinic: true,
      };
      array.push(data);
    } else {
      array.pop();
    }
    setSpecialityData(array);
    setSpecializationUpdation(!specializationUpdation);
  };

  const renderSpecialityItem = ({item}) => (
    <View style={{padding: 6, flexDirection: 'column'}}>
      <OVText
        size={medium}
        fontType={poppinsMedium}
        color={TEXT_COLOR_AUTH_TITLES}>
        Designation
      </OVText>
      <OVTextInput
        editable={true}
        keyboardType="email-address"
        isBackground={true}
      />
      <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
        <View style={{flex: 1, marginEnd: 20}}>
          <OVText
            size={medium}
            fontType={poppinsMedium}
            color={BLACK}
            style={{textAlign: 'center'}}>
            Start Year
          </OVText>
          <OVTextInput
            editable={true}
            keyboardType="email-address"
            isBackground={true}
            value="12/5/2021"
          />
        </View>
        <View style={{flex: 1, marginEnd: 20}}>
          <OVText
            size={medium}
            fontType={poppinsMedium}
            color={BLACK}
            style={{textAlign: 'center'}}>
            End Year
          </OVText>
          <OVTextInput
            editable={true}
            keyboardType="email-address"
            isBackground={true}
            value="12/5/2021"
          />
        </View>
        <View style={{flex: 1}}>
          <OVText
            size={medium}
            fontType={poppinsMedium}
            color={BLACK}
            style={{textAlign: 'center'}}>
            Presently working?
          </OVText>
        </View>
      </View>
      <OVText
        size={medium}
        fontType={poppinsSemiBold}
        color={BLACK}
        style={{textAlign: 'left', marginTop: 20}}>
        Clinic/Hospital
      </OVText>

      <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{marginEnd: 20, alignItems: 'center'}}>
            <Image source={BTN_CHECKED} />
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={BLACK}
              style={{textAlign: 'center', marginTop: 6}}>
              Clinic
            </OVText>
          </View>
          <View style={{marginStart: 10, alignItems: 'center'}}>
            <Image source={BTN_CHECKED} />
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={BLACK}
              style={{textAlign: 'center', marginTop: 6}}>
              Hospital
            </OVText>
          </View>
        </View>
        <OVText
          size={medium}
          fontType={poppinsRegular}
          color={WHITE}
          style={{
            textAlign: 'right',
            marginTop: 6,
            backgroundColor: APP_THEME_COLOR,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}>
          Save
        </OVText>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BG_COLOR}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.navigate('Home')}
        title="Profile"
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: BG_COLOR,
          }}>
          <View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FAA41A', '#906445', '#28246F']}
              style={{padding: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={DOCTOR_1}
                  style={{width: 70, height: 70, borderRadius: 35}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginStart: 20,
                    justifyContent: 'center',
                  }}>
                  <OVText
                    size={medium}
                    fontType={poppinsMedium}
                    color={WHITE}
                    style={{}}>
                    Dr. Sherley Abraham
                  </OVText>
                  <OVText
                    size={small}
                    fontType={poppinsLight}
                    color={WHITE}
                    style={{marginTop: 4}}>
                    General Vet
                  </OVText>
                  <OVText
                    size={small}
                    fontType={poppinsLight}
                    color={WHITE}
                    style={{marginTop: 4}}>
                    +91-9876543210
                  </OVText>
                  <OVText
                    size={small}
                    fontType={poppinsLight}
                    color={WHITE}
                    style={{marginTop: 4}}>
                    Rs. 400/Session
                  </OVText>
                </View>
              </View>
            </LinearGradient>

            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              VCI Reg. No.
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '40%'}}>
                <OVTextInput
                  editable={false}
                  keyboardType="email-address"
                  isBackground={false}
                  value="C n S Pet Grooming"
                />
              </View>

              <OVText
                size={small}
                fontType={poppinsMedium}
                color={APP_THEME_COLOR}
                style={{
                  textAlign: 'right',
                  borderColor: APP_THEME_COLOR,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                }}>
                Upload Certificate
              </OVText>

              <OVText
                size={small}
                fontType={poppinsMedium}
                color={LIGHT_BLUE}
                style={{textAlign: 'right', marginStart: 20}}>
                Edit
              </OVText>
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              Email Id
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <OVTextInput
                  editable={false}
                  keyboardType="email-address"
                  isBackground={false}
                  value="Sherleyabhraham@gmail.com"
                />
              </View>
              <OVText
                size={small}
                fontType={poppinsMedium}
                color={LIGHT_BLUE}
                style={{textAlign: 'right', marginEnd: 20}}>
                Edit
              </OVText>
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              Date of Birth
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <OVTextInput
                  editable={false}
                  keyboardType="email-address"
                  isBackground={false}
                  value="28/07/1969"
                />
              </View>

              <OVText
                size={small}
                fontType={poppinsMedium}
                color={LIGHT_BLUE}
                style={{textAlign: 'right', marginEnd: 20, marginBottom: 6}}>
                Edit
              </OVText>
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              Moblie Number
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <OVTextInput
                  editable={false}
                  keyboardType="email-address"
                  isBackground={false}
                  value="+91 9876543210"
                />
              </View>

              <OVText
                size={small}
                fontType={poppinsMedium}
                color={LIGHT_BLUE}
                style={{textAlign: 'right', marginEnd: 20, marginBottom: 6}}>
                Edit
              </OVText>
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              Gender
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Image source={GENDER_MALE} />
                <OVText
                  size={small}
                  fontType={poppinsSemiBold}
                  color={YELLOW}
                  style={{marginTop: 4}}>
                  Male
                </OVText>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  marginHorizontal: 30,
                }}>
                <Image source={GENDER_FEMALE} />
                <OVText
                  size={small}
                  fontType={poppinsSemiBold}
                  color={BLACK}
                  style={{marginTop: 4}}>
                  Female
                </OVText>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Image source={GENDER_OTHERS} />
                <OVText
                  size={small}
                  fontType={poppinsSemiBold}
                  color={BLACK}
                  style={{marginTop: 20}}>
                  Others
                </OVText>
              </View>
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              Experience
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <OVTextInput
                  editable={false}
                  keyboardType="email-address"
                  isBackground={false}
                  value="5 Years"
                />
              </View>

              <OVText
                size={small}
                fontType={poppinsMedium}
                color={LIGHT_BLUE}
                style={{textAlign: 'right', marginEnd: 20, marginBottom: 6}}>
                Edit
              </OVText>
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              SPECIALISATIONS
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}>
              <FlatList
                data={specialityData}
                renderItem={renderSpecialityItem}
                keyExtractor={item => item.image}
                style={{marginTop: 10, width: '96%'}}
                extraData={() => specializationUpdation}
              />
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={ORANGE}
              style={{margin: 10, alignSelf: 'flex-end'}}
              onPress={() => pushAndPopSpeciality(true)}>
              Add More?
            </OVText>
          </View>
          <OVText
            size={medium}
            fontType={poppinsSemiBold}
            color={APP_THEME_COLOR}
            style={{margin: 10}}>
            Languages known
          </OVText>
          <View
            style={{
              backgroundColor: GRAY_200,
              paddingVertical: 2,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <OVTextInput
                editable={false}
                keyboardType="email-address"
                isBackground={false}
                value="Hindi, English, Tamil, Marathi"
              />
            </View>

            <OVText
              size={small}
              fontType={poppinsMedium}
              color={LIGHT_BLUE}
              style={{textAlign: 'right', marginEnd: 20, marginBottom: 6}}>
              Edit
            </OVText>
          </View>
          <OVText
            size={medium}
            fontType={poppinsSemiBold}
            color={APP_THEME_COLOR}
            style={{margin: 10}}>
            Educational Qualifications
          </OVText>
          <View
            style={{
              backgroundColor: GRAY_200,
              paddingVertical: 2,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: APP_THEME_COLOR,
                borderRadius: 10,
                elevation: 3,
                flexDirection: 'row',
                width: '96%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <OVText
                size={medium}
                fontType={poppinsSemiBold}
                color={WHITE}
                style={{margin: 10}}>
                Select degree from list
              </OVText>
              <Image source={BOTTOM_ARROW} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                width: '100%',
              }}>
              <OVText
                size={small}
                fontType={poppinsMedium}
                color={APP_THEME_COLOR}
                style={{
                  textAlign: 'right',
                  borderColor: APP_THEME_COLOR,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                }}>
                Upload Certificate
              </OVText>

              <OVText
                size={small}
                fontType={poppinsSemiBold}
                color={ORANGE}
                onPress={() => {}}>
                Add More?
              </OVText>
            </View>
          </View>
          <OVText
            size={medium}
            fontType={poppinsSemiBold}
            color={APP_THEME_COLOR}
            style={{margin: 10}}>
            Awards &amp; Recognition
          </OVText>
          <View
            style={{
              backgroundColor: GRAY_200,
              paddingVertical: 2,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1, marginHorizontal: 10}}>
              <OVTextInput
                editable={true}
                keyboardType="email-address"
                isBackground={true}
                placeHolderText="Add Awards &amp; Recognition, if any"
              />
            </View>
          </View>
          <View
            style={{
              borderRadius: 20,
              padding: 10,
              backgroundColor: WHITE,
              elevation: 3,
              marginTop: 20,
            }}>
            <View>
              <OVText
                size={medium}
                fontType={poppinsSemiBold}
                color={APP_THEME_COLOR}
                style={{margin: 10}}>
                CLINIC REGISTRATION
              </OVText>
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              Clinic Name
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <OVTextInput
                  editable={false}
                  keyboardType="email-address"
                  isBackground={false}
                  value="Shantabai Medical Clinic"
                />
              </View>
              <OVText
                size={small}
                fontType={poppinsMedium}
                color={LIGHT_BLUE}
                style={{textAlign: 'right', marginEnd: 20}}>
                Edit
              </OVText>
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              Clinic Registration Number
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '30%'}}>
                <OVTextInput
                  editable={false}
                  keyboardType="email-address"
                  isBackground={false}
                  value="515df32355f"
                />
              </View>

              <OVText
                size={small}
                fontType={poppinsMedium}
                color={APP_THEME_COLOR}
                style={{
                  textAlign: 'right',
                  borderColor: APP_THEME_COLOR,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                }}>
                Upload Certificate
              </OVText>

              <OVText
                size={small}
                fontType={poppinsMedium}
                color={LIGHT_BLUE}
                style={{textAlign: 'right', marginStart: 20}}>
                Edit
              </OVText>
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              Email Id
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <OVTextInput
                  editable={false}
                  keyboardType="email-address"
                  isBackground={false}
                  value="Shantabaiclinic@gmail.com"
                />
              </View>
              <OVText
                size={small}
                fontType={poppinsMedium}
                color={LIGHT_BLUE}
                style={{textAlign: 'right', marginEnd: 20}}>
                Edit
              </OVText>
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              Clinic Mobile Number
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <OVTextInput
                  editable={false}
                  keyboardType="email-address"
                  isBackground={false}
                  value="9876543210"
                />
              </View>
              <OVText
                size={small}
                fontType={poppinsMedium}
                color={LIGHT_BLUE}
                style={{textAlign: 'right', marginEnd: 20}}>
                Edit
              </OVText>
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              Clinic Year of Establisment
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <OVTextInput
                  editable={false}
                  keyboardType="email-address"
                  isBackground={false}
                  value="2017"
                />
              </View>
              <OVText
                size={small}
                fontType={poppinsMedium}
                color={LIGHT_BLUE}
                style={{textAlign: 'right', marginEnd: 20}}>
                Edit
              </OVText>
            </View>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{margin: 10}}>
              Clinic Address
            </OVText>
            <View
              style={{
                backgroundColor: GRAY_200,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <OVTextInput
                  editable={false}
                  keyboardType="email-address"
                  isBackground={false}
                  value="8, New Hiran Magri, New Delhi"
                />
              </View>
              <OVText
                size={small}
                fontType={poppinsMedium}
                color={LIGHT_BLUE}
                style={{textAlign: 'right', marginEnd: 20}}>
                Edit
              </OVText>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 10,
              backgroundColor: WHITE,
            }}>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{marginStart: 30}}>
              State
            </OVText>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{marginEnd: 30}}>
              City
            </OVText>
          </View>
          <View
            style={{
              backgroundColor: GRAY_200,
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                backgroundColor: APP_THEME_COLOR,
                borderRadius: 10,
                elevation: 3,
                flexDirection: 'row',
                width: '35%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <OVText
                size={medium}
                fontType={poppinsSemiBold}
                color={WHITE}
                style={{margin: 10}}>
                State
              </OVText>
              <Image source={BOTTOM_ARROW} />
            </View>
            <View
              style={{
                backgroundColor: APP_THEME_COLOR,
                borderRadius: 10,
                elevation: 3,
                flexDirection: 'row',
                width: '35%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <OVText
                size={medium}
                fontType={poppinsSemiBold}
                color={WHITE}
                style={{margin: 10}}>
                City
              </OVText>
              <Image source={BOTTOM_ARROW} />
            </View>
          </View>
          <OVText
            size={medium}
            fontType={poppinsSemiBold}
            color={APP_THEME_COLOR}
            style={{margin: 10}}>
            Address
          </OVText>
          <View
            style={{
              backgroundColor: GRAY_200,
              paddingVertical: 2,
              flexDirection: 'column',
            }}>
            <OVText
              size={small}
              fontType={poppinsSemiBold}
              color={TEXT_COLOR_AUTH_TITLES}
              style={{margin: 10}}>
              Pet Shop, Near Pula, Delhi - 500501
            </OVText>
            <OVText
              size={small}
              fontType={poppinsMedium}
              color={LIGHT_BLUE}
              style={{textAlign: 'right', marginEnd: 20, marginBottom: 6}}>
              Edit
            </OVText>
          </View>
          <OVButton
            title="Save"
            color={APP_THEME_COLOR}
            textColor={WHITE}
            marginTop={20}
            onPress={() => {}}
            width={windowWidth - 20}
            marginBottom={20}
          />
        </View>
      </ScrollView>

      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default MyDoctorProfile;
