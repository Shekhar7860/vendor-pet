/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import labels from '../assets/labels';
import { RED, WHITE } from '../utils/Colors';

export const LoaderIndicator = props => {
    const { loading } = props;

    return (
        <View
            style={{
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                backgroundColor: '#00000097',
                flex: 1,
                position: 'absolute',
                elevation:9
            }}>
            {loading && (
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator size="large" color={WHITE} />
                        <Text style={{ color: WHITE, marginTop: 10, fontSize: 18 }}>
                            {labels?.please_wait}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};
