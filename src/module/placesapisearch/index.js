/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View } from 'react-native';
import LocationView from 'react-native-location-view';
import { AuthContext } from '../../services/authProvider';

const PlacesApiSearch = props => {

    const navigation = useNavigation();
    const isGloballocation =
        props.route.params && props.route.params?.isGloballocation;
    const { onAddressSelect } = props.route.params;
    const { user } = useContext(AuthContext);
    const latitude = parseFloat(props.route.params.latitude) || 28.7041;
    const longitude = parseFloat(props.route.params.longitude) || 77.1025;

    console.log("props.route.params", props.route.params);
    return (
        <>
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <LocationView
                    apiKey={'AIzaSyB_dtelxfbq8bkbZCWzYTsrDqvptG2V8c4'}
                    initialLocation={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    onLocationSelect={location => {
                        // props.navigation.route.params.onSelectAddress({address: location});
                        onAddressSelect(location);
                        props.navigation.goBack();
                    }}
                />
                {/* <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FAA41A', '#906445', '#28246F']}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              height: 70,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image
                source={BACK_ARROW}
                resizeMode="contain"
                style={{padding: 2, width: 20, height: 20, marginEnd: 10}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'absolute',
              width: windowWidth - 60,
              marginLeft: 40,
              marginTop: 12,
              marginRight: 40,
            }}>
            <GooglePlacesAutocomplete
              styles={{
                textInput: {
                  color: BLACK,
                  fontSize: 16,
                },
              }}
              placeholder="Search Location"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log('details== ', data, details);
                props.navigation.goBack();
                let locationName = data && data.description;
                const location =
                  details &&
                  details.geometry &&
                  details.geometry.location &&
                  details.geometry.location;
                let latitude = location && location.lat;
                let longitude = location && location.lng;

                const addressComponents = details && details.address_components;
                console.log(addressComponents);

                const zipcode =
                  addressComponents &&
                  addressComponents.filter(
                    x => x.types.filter(t => t == 'postal_code').length > 0,
                  ).length > 0 &&
                  addressComponents.filter(
                    x => x.types.filter(t => t == 'postal_code').length > 0,
                  )[0].long_name;
                const city =
                  addressComponents &&
                  addressComponents.filter(
                    x => x.types.filter(t => t == 'locality').length > 0,
                  ).length > 0 &&
                  addressComponents.filter(
                    x => x.types.filter(t => t == 'locality').length > 0,
                  )[0].long_name;
                const state =
                  addressComponents &&
                  addressComponents.filter(
                    x =>
                      x.types.filter(t => t == 'administrative_area_level_1')
                        .length > 0,
                  ).length > 0 &&
                  addressComponents.filter(
                    x =>
                      x.types.filter(t => t == 'administrative_area_level_1')
                        .length > 0,
                  )[0].short_name;
                const area =
                  addressComponents &&
                  addressComponents.filter(
                    x =>
                      x.types.filter(t => t == 'sublocality_level_1').length >
                      0,
                  ).length > 0 &&
                  addressComponents.filter(
                    x =>
                      x.types.filter(t => t == 'administrative_area_level_2')
                        .length > 0,
                  ).length > 0 &&
                  `${
                    addressComponents.filter(
                      x =>
                        x.types.filter(t => t == 'sublocality_level_1').length >
                        0,
                    )[0].long_name
                  } ${
                    addressComponents.filter(
                      x =>
                        x.types.filter(t => t == 'administrative_area_level_2')
                          .length > 0,
                    )[0].long_name
                  }`;
                const country =
                  addressComponents &&
                  addressComponents.filter(
                    x => x.types.filter(t => t == 'country').length > 0,
                  ).length > 0 &&
                  `${
                    addressComponents.filter(
                      x => x.types.filter(t => t == 'country').length > 0,
                    )[0].long_name
                  }`;

                // const city =
                const userCurrentLocation = {
                  name: details && details.formatted_address,
                  latitude: latitude,
                  longitude: longitude,
                  city: city,
                  state: state,
                  country: country,
                  zipcode: zipcode,
                  area: area,
                };
                console.log(userCurrentLocation);
                if (isGloballocation !== false) {
                  console.log('caleed');
                  onAddressSelect(userCurrentLocation);
                  //navigation.goBack();
                } else {
                  console.log('caleed');
                  props.navigation.navigate('AddNewAddress', {
                    location: userCurrentLocation,
                  });
                }
              }}
              query={{
                key: 'AIzaSyDmlNTCny_Z8PpEhOcnjMK5P1jRPbU_L_Q',
                language: 'en',
              }}
              fetchDetails={true}
              onFail={data => {
                console.log(data);
              }}
            />
          </View>
        </LinearGradient>
        <View>
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{width: '100%', height: '100%'}}
          />
        </View> */}
            </View>
        </>
    );
};

export default PlacesApiSearch;
