/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OVText, {large, poppinsMedium} from '../components/OVText';
import {
  BACK_ARROW,
  NOTIFICATION,
  NOTIFICATION_WHITE,
  PET_IMAGE_SMALL,
  AUDIO_CALL,
  VIDEO_CALL,
} from '../images';
import {APP_THEME_COLOR, TEXT_COLOR_BLUE, WHITE} from '../utils/Colors';

/**
 *
 * @param {*} props
 * This is a common header component among most of the screen.
 *
 */
export const Header = props => {
  const {
    isHome = true,
    onBackPressed,
    navigation,
    title = 'Home',
    onSidemenuClick,
    notification = true,
    audio = false,
    video = false,
    onAudioCall,
    onVideoCall,
  } = props;

  const [] = useState(false);
  return (
    <View style={{flexDirection: 'column'}}>
      {isHome && (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: APP_THEME_COLOR,
            padding: 4,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity activeOpacity={1} onPress={() => onSidemenuClick()}>
            <Image
              source={PET_IMAGE_SMALL}
              resizeMode="contain"
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
          {isHome === true && (
            <View
              style={{
                color: TEXT_COLOR_BLUE,
                flex: 1,
                borderBottomColor: WHITE,
                marginStart: 20,
                flexDirection: 'row',
                marginEnd: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <OVText
                size={large}
                fontType={poppinsMedium}
                color={WHITE}
                style={{textAlign: 'center'}}>
                {title}
              </OVText>
            </View>
          )}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Notificatios')}>
            <Image
              source={NOTIFICATION}
              resizeMode="contain"
              style={{width: 30, height: 30, marginEnd: 10}}
            />
          </TouchableOpacity>
        </View>
      )}
      {!isHome && (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FAA41A', '#906445', '#28246F']}
          style={{padding: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity activeOpacity={.7} onPress={() => onBackPressed()} style={{ padding:20}}>
              <Image source={BACK_ARROW} resizeMode="contain" />
            </TouchableOpacity>

            <View
              style={{
                color: TEXT_COLOR_BLUE,
                flex: 1,
                borderBottomColor: WHITE,
                marginStart: 20,
                flexDirection: 'row',
                marginEnd: 10,
              }}>
              <OVText
                size={large}
                fontType={poppinsMedium}
                color={WHITE}
                style={{textAlign: 'left'}}>
                {title}
              </OVText>
            </View>

            {notification && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('Notificatios')}>
                <Image
                  source={NOTIFICATION}
                  resizeMode="contain"
                  style={{width: 30, height: 30, marginEnd: 10}}
                />
              </TouchableOpacity>
            )}

            {audio && (
              <TouchableOpacity activeOpacity={1} onPress={() => onAudioCall()}>
                <Image
                  source={AUDIO_CALL}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: WHITE,
                    marginEnd: 20,
                  }}
                />
              </TouchableOpacity>
            )}
            {video && (
              <TouchableOpacity activeOpacity={1} onPress={() => onVideoCall()}>
                <Image
                  source={VIDEO_CALL}
                  resizeMode="contain"
                  style={{width: 30, height: 30, tintColor: WHITE}}
                />
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      )}
    </View>
  );
};
