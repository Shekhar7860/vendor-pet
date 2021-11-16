/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../common/Header';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import ImagePicker from '../../components/ImagePicker';
import DocumentPicker from 'react-native-document-picker';
import { OVButton } from '../../components/OVButton';
import OVText, {
    medium,
    poppinsMedium,
    poppinsRegular,
    poppinsSemiBold,
    small,
} from '../../components/OVText';
import { OVTextInput } from '../../components/OVTextInput';
import {
    APP_ICON,
    BOTTOM_ARROW,
    CROSS,
    DOCTOR_1,
    EDIT_IMAGE,
    GENDER_FEMALE,
    GENDER_MALE,
    GENDER_OTHERS,
} from '../../images';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage, validateNumber } from '../../utils';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    BLACK,
    GRAY_200,
    ORANGE,
    TEXT_COLOR_AUTH_TITLES,
    WHITE,
    YELLOW,
} from '../../utils/Colors';
import AllDegreeDialog from './AllDegreeDialog';
import AssignClinicDialog from './AssignClinicDialog';
import CommonSearchDialog from '../dialog/CommonSearchDialog';
import { validateEmail, validatePhone } from '../../utils';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { DOCTOR_IMAGE_URL } from '../../utils/AppConstant';

const MyProfile = props => {

    const navigation = useNavigation();
    const { user, token, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [mobileNumber, setMobileNumber] = useState(user.mobile_number);
    const [alternateMobileNumber, setAlternateMobileNumber] = useState(
        user?.alternet_number
    );
    const [address, setAddress] = useState(setVal(user.address));
    const [houseNo, setHouseNo] = useState(setVal(user?.house_no));
    const [landmark, setLandmark] = useState(setVal(user?.landmark));
    const [doctor_id, setDoctor] = useState(setVal(user?.doctor_id));
    const [doctor_vci_no, setDoctorVCINo] = useState(setVal(user?.doctor_vci_no));
    const [doctor_error, setDoctorError] = useState('');
    const [city, setCity] = useState(setVal(user.city));
    const [price, setPrice] = useState(setVal(user.price));
    const [showImagePickerDialog, setShowImagePickerDialog] = useState(false);
    const [gender, setGender] = useState(setVal(user.gender));
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
    //const [speciality, setSpeciality] = useState(user.speciality);
    const [speciality, setSpeciality] = useState([]);
    const [refreshView, setRefreshView] = useState(false);
    const [language, setLanguage] = useState([]);
    const [degreeList, setDegreeList] = useState([]);
    const [degreeValue, setDegreeValue] = useState(
        user?.qualification === null || user?.qualification == 0 ||
            user?.qualification_name === null || user?.qualification_name == ''
            ? {
                id: 0,
                name: 'Select degree from list',
            }
            : {
                id: user?.qualification,
                name: user?.qualification_name,
            },
    );
    const [degreeDialog, setDegreeDialog] = useState(false);
    const [profilePath, setProfilePath] = useState('');
    const [specialityData, setSpecialityData] = useState('');
    const [languageData, setLanguageData] = useState('');
    const [experianceData, setExperianceData] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [filterType, setFilterType] = useState(1);
    const [clinicyData, setClinicData] = useState([]);
    const [clinicDialog, setClinicDialog] = useState([]);


    const [searchCollage, setSearchCollage] = useState([]);
    const [searchDegree, setSearchDegree] = useState([]);
    const [searchClinic, setSearchClinic] = useState([]);


    const [clinicValue, setClinicValue] = useState({
        id: 0,
        name: 'Select Clinic',
    });
    const [collegeData, setCollegeData] = useState([]);
    const [collegeDialog, setCollegeDialog] = useState([]);
    const [collegeValue, setCollegeValue] = useState(
        user?.college === null || user?.college == 0 ||
            user?.college_name === null || user?.college_name == ''
            ? {
                id: 0,
                name: 'Select College',
            }
            : {
                id: user?.college,
                name: user?.college_name,
            },
    );
    const [vciRegNo, setVciRegNo] = useState(user.vci_no);
    const [stateData, setStateData] = useState([]);
    const [stateDialog, setStateDialog] = useState([]);
    const [stateValue, setStateValue] = useState(
        user?.state_of_registration === null || user?.state_of_registration == 0 ||
            user?.state_of_registration_name === null || user?.state_of_registration_name == ''
            ? {
                id: 0,
                name: 'Select state',
            }
            : {
                id: user?.state_of_registration,
                name: user?.state_of_registration_name,
            },
    );

    const setSearchdata = (arr) => {
        console.log('coming in chek>>', arr)
        // setCollegeData(arr)
        setSearchCollage(arr)
    }

    const setUpdatedDegree = (arr) => {
        console.log('coming in setUpdatedDegree>>', arr)
        setSearchDegree(arr)
    }
    const setUpdatedClinic = (arr) => {
        console.log('coming in clinic are>>', arr)
        setSearchClinic(arr)
    }


    useEffect(() => {
        getProfile();
        getAllDegree();
        getExperianceList();
        getStateList();
        if (user.user_type === 2) {
            getClinicList();
            getCollegeList();
        } else {
            getLanguageList();
        }

        console.log("user session", user);
    }, []);

    function setVal(val) {
        if (typeof val != 'undefined' && val != null && val != 'null') {
            return val;
        }
        return '';
    }

    const onUploadDocumentPress = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            console.log('picked document is: ', res);

            if (res.size > 5000) {
                alert('The maximum allowed file size is 3 MB, please select another one.')
            }

            // this.setState({
            //     resumeUri: res.uri,
            //     resume: res.name,
            //     rsize: res.size,
            //     resumeName: res.name
            // });
        } catch (error) {
            console.log('document picker error: ', error);
            if (DocumentPicker.isCancel(error)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            }
        }
    };

    const checkPermission = async () => {
        requestMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ]).then(statuses => {
            if (statuses[PERMISSIONS.ANDROID.CAMERA] === 'denied') checkPermission();
            else setShowImagePickerDialog(true);
        });
    };

    const getProfile = () => {
        Network('user/get-vendor-profile', 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    setUser(res.data);
                    if (typeof res.data.image != 'undefined' && res.data.image != '' && res.data.image != null) {
                        setProfilePath(DOCTOR_IMAGE_URL + res.data.image);
                    }
                }
            })
            .catch(error => {
                setLoading(false);
            });
    };

    const getCollegeList = () => {
        Network('user/get-college-list', 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    // console.log(' \n\n Result ', JSON.stringify(res));
                    setCollegeData(res.data);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    };

    const getStateList = () => {
        Network('user/get-states-list', 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    // console.log(' \n\n Result ', JSON.stringify(res));
                    setStateData(res.data);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    };

    const getClinicList = () => {
        Network('user/get-all-clinic', 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    // console.log(' \n\n Result ', JSON.stringify(res));
                    setClinicData(res.data);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    };

    const getSpecialityList = () => {
        Network('user/get-specilities-list', 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    // console.log(' \n\n Result ', JSON.stringify(res));
                    setSpecialityData(res.data);
                    getLanguageList();
                    parseSpecialityId(res.data);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    };

    const getLanguageList = () => {
        Network('user/get-languages-list', 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    // console.log(' \n\n Result ', JSON.stringify(res));
                    setLanguageData(res.data);
                    parseLanguageId(res.data);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    };

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

    const searchDoctor = (val) => {

        setDoctorVCINo(val);
        if (val.length >= 10) {
            Network('user/get-vendor-by-vci?vci_no=' + val, 'get', null, token)
                .then(async res => {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    if (res.status === true) {
                        setDoctor(res.data.id);
                        setDoctorError(res.data.name);
                        // setDoctorError('');
                    }
                    else {
                        setDoctorError(res.message);
                    }
                })
                .catch(error => {
                    // setLoading(false);
                });
        }
    };

    const updateProfile = () => {

        if (userName.length === 0) {
            showToastMessage('Please enter valid user name');
        } else if (!validateEmail(email)) {
            showToastMessage('Please enter valid email address');
        } else if (!validateNumber(mobileNumber)) {
            showToastMessage('Please enter valid mobile number');
        } else {
            setLoading(true);
            let data = new FormData();

            data.append('name', userName);
            data.append('email', email);
            data.append('mobile_no', mobileNumber);
            if (typeof alternateMobileNumber != 'undefined' && alternateMobileNumber != null && alternateMobileNumber != '') {
                data.append('alternet_number', alternateMobileNumber);
            }

            if (latitude != null || latitude != '') {
                data.append('latitude', latitude);
            }
            if (longitude != null || longitude != '') {
                data.append('longitude', longitude);
            }
            data.append('house_no', houseNo);
            data.append('landmark', landmark);

            if (typeof experiance.id != 'undefined' && experiance.id != 0) {
                data.append('exprience', experiance.id);
            }

            if (degreeValue.id !== 0) {
                data.append('qualification', degreeValue.id);
            }

            if (collegeValue.id !== 0) {
                data.append('college', collegeValue.id);
            }

            if (user.user_type === 2) {
                data.append('vci_no', vciRegNo);
                data.append('speciality', getSpecialityId());
                data.append('language', getLanguageId());
                // data.append('price', price);
                data.append('gender', gender);
            }

            if (user.user_type === 1 || 2) {
                data.append('doctor_id', doctor_id);
            }

            if (address) {
                data.append('address', address);
                data.append('city', city);
            }

            if (stateValue) {
                data.append('state_of_registration', stateValue.id);
            }

            if (profilePath != '') {
                data.append('image', {
                    uri: profilePath,
                    name: Date.parse(new Date()) + 'userImage.png',
                    filename: 'userImage.png',
                    type: 'image/png',
                });
            }

            Network('user/updateVendor', 'post', data, token)
                .then(async res => {
                    console.log(' /n/n Result ', JSON.stringify(res.data));
                    setLoading(false);
                    if (res.status) {
                        setUser(res.data);
                        if (clinicValue.id !== 0) {
                            updateClinicAction();
                        } else {
                            showToastMessage('Profile Successfully updated');
                            navigation.goBack('');
                        }
                    }
                    else {
                        showToastMessage(res.message);
                    }
                })
                .catch(error => {
                    setLoading(false);
                    showToastMessage('Something went wrong');
                });
        }
    };

    const parseSpecialityId = data => {
        var res = user.speciality.split(', ');

        var array = [];
        for (let j = 0; j < res.length; j++) {
            for (let i = 0; i < data.length; i++) {
                if (res[j] == data[i].id.toString()) {
                    const item = { id: data[i].id, name: data[i].name };
                    array.push(item);
                }
            }
        }
        console.log('RArararra', JSON.stringify(array));
        setSpeciality(array);
    };

    const getSpecialityId = () => {
        var id = '';
        for (let i = 0; i < speciality.length; i++) {
            id = id + ', ' + speciality[i].id;
        }
        return id.substring(1);
    };

    const parseLanguageId = data => {
        var res = user.language.split(', ');

        var array = [];
        for (let j = 0; j < res.length; j++) {
            for (let i = 0; i < data.length; i++) {
                if (res[j] == data[i].id.toString()) {
                    const item = { id: data[i].id, name: data[i].name };
                    array.push(item);
                }
            }
        }
        console.log('RArararra', JSON.stringify(array));
        setLanguage(array);
    };

    const getLanguageId = () => {
        var id = '';
        for (let i = 0; i < language.length; i++) {
            id = id + ', ' + language[i].id;
        }
        return id.substring(1);
    };

    const updateClinicAction = () => {
        let data = new FormData();
        data.append('clinic_id', clinicValue.id);
        Network('user/associate-clinic', 'post', data, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                setLoading(false);
                if (res.status) {
                    showToastMessage('Profile Successfully updated');
                    navigation.goBack('');
                }
            })
            .catch(error => {
                setLoading(false);
                showToastMessage(error);
            });
    };

    const getAllDegree = () => {
        setLoading(true);
        Network('user/get-degrer-list', 'get', null, token)
            .then(async res => {
                // console.log(' /n/n Result ', JSON.stringify(res));
                const data = res.data;
                setDegreeList(data);
                setLoading(false);
                if (user.user_type === 2) {
                    getSpecialityList();
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
                return specialityData;
            case 3:
                return languageData;
            case 4:
                return degreeList;
        }
    };

    const getVisibleTitle = type => {
        switch (type) {
            case 1:
                return 'Select Experience';
            case 2:
                return 'Select Speciality';
            case 3:
                return 'Select Language';
            case 4:
                return 'Select Degree';
        }
    };

    const renderItem = ({ item, index }) => (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: APP_THEME_COLOR,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 4,
                marginEnd: 20,
            }}>
            <OVText size={medium} fontType={poppinsMedium} color={WHITE}>
                {item.name}
            </OVText>
            <TouchableOpacity
                onPress={() => {
                    setRefreshView(!refreshView);
                    if (filterType === 2) {
                        var array = speciality;
                        array.splice(index, 1);
                        setSpeciality(array);
                    } else {
                        console.log('language', JSON.stringify(language));
                        var array = language;
                        array.splice(index, 1);
                        setLanguage(array);
                    }
                }}>
                <Image source={CROSS} style={{ padding: 10, marginStart: 10 }} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
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
                        backgroundColor: WHITE,
                    }}>
                    <View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => checkPermission()}
                            style={{ alignSelf: 'center', padding: 20 }}>
                            {profilePath ? (
                                <Image
                                    source={profilePath !== '' ? { uri: profilePath } : DOCTOR_1}
                                    style={{ width: 100, height: 100, borderRadius: 50 }}
                                />
                            ) : (
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['#FAA41A', '#906445', '#28246F']}
                                    style={{
                                        padding: 10,
                                        width: 100,
                                        height: 100,
                                        borderRadius: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Image
                                        source={APP_ICON}
                                        style={{ width: 80, height: 80, resizeMode: 'contain' }}
                                    />
                                    <View
                                        style={{
                                            alignSelf: 'flex-end',
                                            backgroundColor: ORANGE,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'absolute',
                                            bottom: 0,
                                        }}>
                                        <Image
                                            source={EDIT_IMAGE}
                                            style={{
                                                width: 25,
                                                height: 25,
                                                resizeMode: 'contain',
                                                tintColor: WHITE,
                                            }}
                                        />
                                    </View>
                                </LinearGradient>
                            )}
                        </TouchableOpacity>

                        {user.user_type === 2 && (
                            <View>
                                <OVText
                                    size={medium}
                                    fontType={poppinsSemiBold}
                                    color={APP_THEME_COLOR}
                                    style={{ margin: 10 }}>
                                    VCI Reg. No.
                                </OVText>
                                <View
                                    style={{
                                        backgroundColor: GRAY_200,
                                        paddingVertical: 2,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <OVTextInput
                                        editable={true}
                                        keyboardType="email-address"
                                        isBackground={false}
                                        value={vciRegNo == 'undefined' ? '' : vciRegNo}
                                        onChange={value => setVciRegNo(value)}
                                    />
                                </View>
                            </View>
                        )}
                        <OVText
                            size={medium}
                            fontType={poppinsSemiBold}
                            color={APP_THEME_COLOR}
                            style={{ marginStart: 10, marginBottom: 10 }}>
                            Name
                        </OVText>
                        <View
                            style={{
                                backgroundColor: GRAY_200,
                                paddingVertical: 2,
                                flexDirection: 'column',
                            }}>
                            <OVTextInput
                                editable={true}
                                keyboardType="email-address"
                                isBackground={false}
                                value={userName}
                                onChange={value =>
                                    setUserName(value.replace(/[^A-Za-z]/gi, ''))
                                }
                            />
                        </View>
                        <OVText
                            size={medium}
                            fontType={poppinsSemiBold}
                            color={APP_THEME_COLOR}
                            style={{ margin: 10 }}>
                            Email Id
                        </OVText>
                        <View
                            style={{
                                backgroundColor: GRAY_200,
                                paddingVertical: 2,
                                flexDirection: 'column',
                            }}>
                            <OVTextInput
                                editable={true}
                                keyboardType="email-address"
                                isBackground={false}
                                value={email}
                                onChange={value => setEmail(value)}
                            />
                        </View>
                        <OVText
                            size={medium}
                            fontType={poppinsSemiBold}
                            color={APP_THEME_COLOR}
                            style={{ margin: 10 }}>
                            Moblie Number
                        </OVText>
                        <View
                            style={{
                                backgroundColor: GRAY_200,
                                paddingVertical: 2,
                                flexDirection: 'column',
                            }}>
                            <OVTextInput
                                editable={true}
                                keyboardType="number"
                                isBackground={false}
                                value={mobileNumber}
                                maxLength={10}
                                onChange={value =>
                                    setMobileNumber(value.replace(/[^0-9]/g, ''))
                                }
                            />
                        </View>
                        <OVText
                            size={medium}
                            fontType={poppinsSemiBold}
                            color={APP_THEME_COLOR}
                            style={{ margin: 10 }}>
                            Alternate Moblie Number
                        </OVText>
                        <View
                            style={{
                                backgroundColor: GRAY_200,
                                paddingVertical: 2,
                                flexDirection: 'column',
                            }}>
                            <OVTextInput
                                editable={true}
                                keyboardType="number"
                                isBackground={false}
                                maxLength={10}
                                value={alternateMobileNumber}
                                onChange={value =>
                                    setAlternateMobileNumber(value.replace(/[^0-9]/g, ''))
                                }
                            />
                        </View>

                        {/* {user.user_type === 2 && (
                            <View>
                                <OVText
                                    size={medium}
                                    fontType={poppinsSemiBold}
                                    color={APP_THEME_COLOR}
                                    style={{ margin: 10 }}>
                                    Price
                                </OVText>
                                <View
                                    style={{
                                        backgroundColor: GRAY_200,
                                        paddingVertical: 2,
                                        flexDirection: 'column',
                                    }}>
                                    <OVTextInput
                                        editable={true}
                                        keyboardType="number"
                                        isBackground={false}
                                        value={`${price}`}
                                        onChange={value => setPrice(value.replace(/[^0-9]/g, ''))}
                                        maxLength={4}
                                    />
                                </View>
                            </View>
                        )} */}
                        <OVText
                            size={medium}
                            fontType={poppinsSemiBold}
                            color={APP_THEME_COLOR}
                            style={{ margin: 10 }}>
                            Address
                        </OVText>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('PlacesApiSearch', {
                                    onAddressSelect: data => {
                                        console.log("PlacesApiSearch", data);
                                        setAddress(data.address);
                                        setLatitude(data.latitude);
                                        setLongitude(data.longitude);
                                        setCity(typeof data.city != 'undefined' ? data.city : '');
                                    },
                                    latitude: user?.latitude,
                                    longitude: user?.longitude,
                                })
                            }>
                            <View
                                style={{
                                    backgroundColor: GRAY_200,
                                    paddingVertical: 2,
                                    flexDirection: 'column',
                                }}>
                                <OVText
                                    size={medium}
                                    fontType={poppinsRegular}
                                    color={TEXT_COLOR_AUTH_TITLES}
                                    style={{ margin: 10 }}>
                                    {address}
                                </OVText>
                            </View>
                        </TouchableOpacity>

                        <View>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ margin: 10 }}>
                                House No./Flat No.
                            </OVText>
                            <View
                                style={{
                                    backgroundColor: GRAY_200,
                                    paddingVertical: 2,
                                    flexDirection: 'column',
                                }}>
                                <OVTextInput
                                    editable={true}
                                    keyboardType="default"
                                    isBackground={false}
                                    value={houseNo}
                                    onChange={value => setHouseNo(value)}
                                    maxLength={55}
                                />
                            </View>
                        </View>

                        <View>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ margin: 10 }}>
                                Landmark
                            </OVText>
                            <View
                                style={{
                                    backgroundColor: GRAY_200,
                                    paddingVertical: 2,
                                    flexDirection: 'column',
                                }}>
                                <OVTextInput
                                    editable={true}
                                    keyboardType="default"
                                    isBackground={false}
                                    value={landmark}
                                    onChange={value => setLandmark(value)}
                                    maxLength={55}
                                />
                            </View>
                        </View>
                        {user.user_type === 1 && (
                            <View>
                                <OVText
                                    size={medium}
                                    fontType={poppinsSemiBold}
                                    color={APP_THEME_COLOR}
                                    style={{ margin: 10 }}>
                                    Add Doctor
                                </OVText>
                                <View
                                    style={{
                                        backgroundColor: GRAY_200,
                                        paddingVertical: 2,
                                        flexDirection: 'column',
                                    }}>
                                    <OVTextInput
                                        placeHolderText="Enter Doctor VCI Register No."
                                        editable={true}
                                        keyboardType="default"
                                        isBackground={false}
                                        value={doctor_vci_no}
                                        onChange={value => searchDoctor(value)}
                                        maxLength={25}
                                    />
                                </View>
                                {doctor_error != '' && (
                                    <OVText
                                        size={medium}
                                        fontType={poppinsSemiBold}
                                        color={BLACK}
                                        style={{ margin: 10 }}>
                                        {doctor_error}
                                    </OVText>
                                )}

                            </View>
                        )}

                        <View>
                            {user.user_type === 2 && (
                                <View>
                                    <OVText
                                        size={medium}
                                        fontType={poppinsSemiBold}
                                        color={APP_THEME_COLOR}
                                        style={{ margin: 10 }}>
                                        Gender
                                    </OVText>
                                    <View
                                        style={{
                                            backgroundColor: GRAY_200,
                                            paddingVertical: 2,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                        }}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => setGender('Male')}>
                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 10,
                                                }}>
                                                <Image
                                                    source={GENDER_MALE}
                                                    style={{
                                                        tintColor: gender === 'Male' ? YELLOW : BLACK,
                                                    }}
                                                />
                                                <OVText
                                                    size={small}
                                                    fontType={poppinsSemiBold}
                                                    color={gender === 'Male' ? YELLOW : BLACK}
                                                    style={{ marginTop: 4 }}>
                                                    Male
                                                </OVText>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => setGender('Female')}>
                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 10,
                                                    marginHorizontal: 30,
                                                }}>
                                                <Image
                                                    source={GENDER_FEMALE}
                                                    style={{
                                                        tintColor: gender === 'Female' ? YELLOW : BLACK,
                                                    }}
                                                />
                                                <OVText
                                                    size={small}
                                                    fontType={poppinsSemiBold}
                                                    color={gender === 'Female' ? YELLOW : BLACK}
                                                    style={{ marginTop: 4 }}>
                                                    Female
                                                </OVText>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => setGender('Others')}>
                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 10,
                                                    marginTop: 5,
                                                }}>
                                                <Image
                                                    source={GENDER_OTHERS}
                                                    style={{
                                                        tintColor: gender === 'Others' ? YELLOW : BLACK,
                                                    }}
                                                />
                                                <OVText
                                                    size={small}
                                                    fontType={poppinsSemiBold}
                                                    color={gender === 'Others' ? YELLOW : BLACK}
                                                    style={{ marginTop: 10 }}>
                                                    Others
                                                </OVText>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ margin: 10 }}>
                                Experience (in years)
                            </OVText>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    setFilterType(1);
                                    setDegreeDialog(true);
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
                                        value={experiance === null ? '' : experiance.name}
                                        onChange={value => setExperiance(value)}
                                        rightIcon={BOTTOM_ARROW}
                                    />
                                </View>
                            </TouchableOpacity>

                            {user.user_type === 2 && (
                                <View>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            setFilterType(3);
                                            setDegreeDialog(true);
                                        }}>
                                        <OVText
                                            size={medium}
                                            fontType={poppinsSemiBold}
                                            color={APP_THEME_COLOR}
                                            style={{ margin: 10 }}>
                                            Languages known
                                        </OVText>
                                        <View
                                            style={{
                                                backgroundColor: GRAY_200,
                                                paddingVertical: 2,
                                                flexDirection: 'column',
                                            }}>
                                            <FlatList
                                                data={language}
                                                renderItem={renderItem}
                                                keyExtractor={item => item.id + Math.random()}
                                                style={{ margin: 10 }}
                                                horizontal={true}
                                                extraData={refreshView}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        {user.user_type === 2 && (
                            <View>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        setFilterType(2);
                                        setDegreeDialog(true);
                                    }}>
                                    <OVText
                                        size={medium}
                                        fontType={poppinsSemiBold}
                                        color={APP_THEME_COLOR}
                                        style={{ margin: 10 }}>
                                        Specialization
                                    </OVText>
                                    <View
                                        style={{
                                            backgroundColor: GRAY_200,
                                            paddingVertical: 2,
                                            flexDirection: 'column',
                                        }}>
                                        <FlatList
                                            data={speciality}
                                            renderItem={renderItem}
                                            keyExtractor={item => item.id}
                                            style={{ margin: 10 }}
                                            horizontal={true}
                                            extraData={refreshView}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <OVText
                                    size={medium}
                                    fontType={poppinsSemiBold}
                                    color={APP_THEME_COLOR}
                                    style={{ margin: 10 }}>
                                    Educational Qualifications
                                </OVText>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        setFilterType(4);
                                        setDegreeDialog(true);
                                    }}>
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
                                                style={{ margin: 10 }}>
                                                {degreeValue.name}
                                            </OVText>
                                            <Image source={BOTTOM_ARROW} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}

                        <OVText
                            size={medium}
                            fontType={poppinsSemiBold}
                            color={APP_THEME_COLOR}
                            style={{ margin: 10 }}>
                            Time Slot
                        </OVText>

                        <View
                            style={{
                                backgroundColor: GRAY_200,
                                paddingVertical: 2,
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: APP_THEME_COLOR,
                                    borderRadius: 10,
                                    elevation: 3,
                                    flexDirection: 'row',
                                    width: '96%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                activeOpacity={1}
                                onPress={() => navigation.navigate('AddTimeSlotDialog')}>
                                <OVText
                                    size={medium}
                                    fontType={poppinsSemiBold}
                                    color={WHITE}
                                    style={{ margin: 10 }}>
                                    Add Time Slot
                                </OVText>
                                <Image source={BOTTOM_ARROW} />
                            </TouchableOpacity>
                        </View>

                        {user.user_type != 2 && (
                            <View>
                                <OVText
                                    size={medium}
                                    fontType={poppinsSemiBold}
                                    color={APP_THEME_COLOR}
                                    style={{ margin: 10 }}>
                                    {user.user_type !== 2 ? 'Attach Clinic' : 'Available Timings'}
                                </OVText>

                                <View
                                    style={{
                                        backgroundColor: GRAY_200,
                                        paddingVertical: 2,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: APP_THEME_COLOR,
                                            borderRadius: 10,
                                            elevation: 3,
                                            flexDirection: 'row',
                                            width: '96%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        activeOpacity={1}
                                        onPress={() => setClinicDialog(true)}>
                                        <OVText
                                            size={medium}
                                            fontType={poppinsSemiBold}
                                            color={WHITE}
                                            style={{ margin: 10 }}>
                                            {clinicValue.name}
                                        </OVText>
                                        <Image source={BOTTOM_ARROW} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        {user.user_type === 2 && (
                            <View>
                                <OVText
                                    size={medium}
                                    fontType={poppinsSemiBold}
                                    color={APP_THEME_COLOR}
                                    style={{ margin: 10 }}>
                                    {'Select College'}
                                </OVText>
                                <View
                                    style={{
                                        backgroundColor: GRAY_200,
                                        paddingVertical: 2,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: APP_THEME_COLOR,
                                            borderRadius: 10,
                                            elevation: 3,
                                            flexDirection: 'row',
                                            width: '96%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        activeOpacity={1}
                                        onPress={() => setCollegeDialog(true)}>
                                        <OVText
                                            size={medium}
                                            fontType={poppinsSemiBold}
                                            color={WHITE}
                                            style={{ margin: 10 }}>
                                            {collegeValue.name}
                                        </OVText>
                                        <Image source={BOTTOM_ARROW} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        {user.user_type === 2 && (
                            <View>
                                <OVText
                                    size={medium}
                                    fontType={poppinsSemiBold}
                                    color={APP_THEME_COLOR}
                                    style={{ margin: 10 }}>
                                    {'Select state of registration'}
                                </OVText>
                                <View
                                    style={{
                                        backgroundColor: GRAY_200,
                                        paddingVertical: 2,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: APP_THEME_COLOR,
                                            borderRadius: 10,
                                            elevation: 3,
                                            flexDirection: 'row',
                                            width: '96%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        activeOpacity={1}
                                        onPress={() => setStateDialog(true)}>
                                        <OVText
                                            size={medium}
                                            fontType={poppinsSemiBold}
                                            color={WHITE}
                                            style={{ margin: 10 }}>
                                            {stateValue.name}
                                        </OVText>
                                        <Image source={BOTTOM_ARROW} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {/* <View>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{ margin: 10 }}>
                                {'upload documents'}
                            </OVText>

                            <View
                                style={{
                                    backgroundColor: GRAY_200,
                                    paddingVertical: 2,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: APP_THEME_COLOR,
                                        borderRadius: 10,
                                        elevation: 3,
                                        flexDirection: 'row',
                                        width: '96%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    activeOpacity={1}
                                    onPress={onUploadDocumentPress}

                                >
                                    <OVText
                                        size={medium}
                                        fontType={poppinsSemiBold}
                                        color={WHITE}
                                        style={{ margin: 10 }}>
                                        {'Upload docs'}
                                    </OVText>
                                    <Image source={BOTTOM_ARROW} />
                                </TouchableOpacity>
                            </View>
                        </View> */}


                        <OVButton
                            title="Update Profile"
                            color={APP_THEME_COLOR}
                            textColor={WHITE}
                            marginTop={20}
                            marginBottom={20}
                            onPress={() => updateProfile()}
                        />
                    </View>
                </View>
                <ImagePicker
                    selectedImagePath={path => {
                        setShowImagePickerDialog(false);
                        setProfilePath(path);
                    }}
                    dialogVisible={showImagePickerDialog}
                    setDialogVisible={() => setShowImagePickerDialog(false)}
                />
                <AllDegreeDialog
                    data={getVisibleData(filterType)}
                    dialogVisible={degreeDialog}
                    setUpdatedDegree={setUpdatedDegree} 
                    searchDegree={searchDegree}
                    setDialogVisible={() => setDegreeDialog(false)}
                    onSelectedItem={item => {
                        switch (filterType) {
                            case 1:
                                setExperiance(item);
                                break;
                            case 2:
                                var array = speciality;
                                if (typeof array != 'undefined' && array.findIndex(row => row.id == item.id) == -1) {
                                    array.push(item);
                                }
                                setSpeciality(array);
                                break;
                            case 3:
                                var array = language;
                                if (typeof array != 'undefined' && array.findIndex(row => row.id == item.id) == -1) {
                                    array.push(item);
                                }
                                setLanguage(array);
                                break;
                            case 4:
                                setDegreeValue(item);
                                break;
                        }
                        setDegreeDialog(false);
                    }}
                    title={getVisibleTitle(filterType)}
                />
                <AssignClinicDialog
                    data={clinicyData}
                    dialogVisible={clinicDialog}
                    setUpdatedDegree={setUpdatedDegree} 
                    searchDegree={searchDegree}

                    setDialogVisible={() => setClinicDialog(false)}
                    onSelectedItem={item => {
                        setClinicValue(item);
                        setClinicDialog(false);
                    }}
                    title="Assign clinic"
                />
                <CommonSearchDialog
                    data={collegeData}
                    setUpdatedData={setSearchdata}
                    searchCollage={searchCollage}
                    dialogVisible={collegeDialog}
                    setDialogVisible={() => setCollegeDialog(false)}
                    onSelectedItem={item => {
                        setCollegeValue(item);
                        setCollegeDialog(false);
                    }}
                    title="Select College"
                />
                <AssignClinicDialog
                    data={stateData}
                    dialogVisible={stateDialog}
                    setUpdatedClinic={setUpdatedClinic} 
                    searchClinic={searchClinic}
                    setDialogVisible={() => setStateDialog(false)}
                    onSelectedItem={item => {
                        setStateValue(item);
                        setStateDialog(false);
                    }}
                    title="Select State"
                />
            </ScrollView>

            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

export default MyProfile;
