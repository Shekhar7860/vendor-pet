import React from 'react'
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { DARK_RED } from '../utils/Colors';

const Search = () => {
    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: DARK_RED,
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            {/* <GooglePlacesAutocomplete
                placeholder='Search'
                style={{ backgroundColor: 'transparent', width: 100 }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: 'AIzaSyDmlNTCny_Z8PpEhOcnjMK5P1jRPbU_L_Q',
                    language: 'en',
                }}
                onFail={
                    (data) => {
                        console.log(data)
                    }
                }

            /> */}
        </View>

    )
}

export default Search