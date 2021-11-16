/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ActivityIndicator, Modal} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Toast from 'react-native-root-toast';
import {GRAY_900} from './Colors';
import moment from 'moment';
import {BASE_DATE_FROM_FORMAT, BASE_DATE_TO_FORMAT} from '../utils/DateFormats';

/**
 *
 * @param {*} email
 * @returns The email is valid or not
 * @returns If email is valid then true else false.
 */
export const validateEmail = email => {
  console.log('validate email =' + email);
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 *
 * @param {*} phone
 * @returns The phone is valid or not
 * @returns If phone is valid then true else false.
 */
export const validatePhone = phone => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return phone && phone.length >= 8;
};

/**
 *
 * @param {*} password
 * @param {*} confirmPassword
 * @returns password are equals or not
 * If both passwords are then true else false
 */
export const bothPasswordEqual = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * @returns the activity indicator or loaders
 */
export const activityIndicator = show => {
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: GRAY_900}}>
        <ActivityIndicator
          style={{alignSelf: 'center'}}
          animating={true}
          size="large"
        />
      </View>
    </Modal>
  );
};

/**
 *
 * @param {*} mobile
 * @returns the number is valid or not
 *If number is valid @returns true else false
 */
export const validateNumber = mobile => {
  const regex = /^[0]?[789]\d{9}$/;
  return regex.test(mobile);
};

/**
 *
 * @param {*} password
 * @returns the password is valid or not as per given regex
 */
export const validatePassword = password => {
  const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

  console.log('Password match =>', regex.test(password));
  return regex.test(password);
};

/**
 *
 * @param {*} password
 * @returns the @param password contains a number or not.
 * @returns if true if @param password contains a number else false.
 */
export const containsNumber = password => {
  const regex = /\d/;
  console.log('number  =>', regex.test(password));
  return regex.test(password);
};
/**
 *
 * @param {*} password
 * @returns password contains a char or not
 * If contains a char then @returns true else false
 */
export const containsUpperLowerChar = password => {
  const regex = /(?=.*[a-zA-Z])/;
  console.log('containsUpperLowerChar=>', regex.test(password));
  return regex.test(password);
};

/**
 *
 * @param {*} password
 * @returns password contains a special char or not
 * @returns true if contains a special char else false
 */
export const containsSpecialChar = password => {
  const regex = /^(?=.*[!@#\$%\^\&*\)\(+=._-])/;
  console.log('containsSpecialChar=>', regex.test(password));
  return regex.test(password);
};

export const showToastMessage = text => {
  Toast.show(text);
};

/**
 *
 * @param {*} message
 * @returns show error messages
 */
export const showErrorMessage = message => {
  Alert.alert('', message);
};

export const formatDate = (
  date,
  fromFormat = BASE_DATE_FROM_FORMAT,
  toFormat = BASE_DATE_TO_FORMAT,
) => {
  moment(date, fromFormat, true).format();
  return moment(date).format(toFormat);
};
