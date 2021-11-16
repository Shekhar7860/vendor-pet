/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  GRAY_300,
  GRAY_600,
  TEXT_COLOR_AUTH_TITLES,
  WHITE,
  BLACK,
} from '../utils/Colors';

/**
 *
 * @param {*} props
 * This is a common input field.
 * If you pass the  @param props.leftIcon , Left icon will be display.
 * If you pass the  @param props.rightIcon , Right icon will be display.
 */
export const OVTextInput = props => {
  const {
    keyboardType,
    placeHolderText,
    value,
    onChange,
    secureTextEntry,
    editable,
    contentType,
    returnKeyType,
    multiline = false,
    textContentType = 'none',
    numberOfLines = 1,
    onPress,
    onFocus,
    ref,
    onBlur,
    rightIcon,
    height,
    leftIcon,
    onRightPress,
    autoCapitalize = 'none',
    fontFamily = 'Poppins-Regular',
    pointerEvents = 'auto',
    onSubmitEditing,
    passwordRules,
    rightText,
    maxLength,
    isBackground = true,
  } = props;

  return (
    <View
      style={
        isBackground === true
          ? styles.inputContainerStyle
          : styles.transparentInputContainerStyle
      }>
      {leftIcon && (
        <Image
          width={30}
          height={30}
          source={leftIcon}
          style={{marginLeft: 7}}
        />
      )}

      <TextInput
        placeholder={placeHolderText}
        contentType={contentType}
        value={value}
        ref={ref}
        onBlur={onBlur}
        passwordRules={passwordRules}
        textContentType={textContentType}
        onChangeText={onChange}
        onSubmitEditing={onSubmitEditing}
        numberOfLines={numberOfLines}
        keyboardType={
          keyboardType === 'number'
            ? 'number-pad'
            : keyboardType && keyboardType != ''
            ? keyboardType
            : 'default'
        }
        secureTextEntry={secureTextEntry}
        editable={editable}
        returnKeyType={returnKeyType}
        style={editable === false ? styles.unEditableText : styles.editableText}
        onPress={onPress}
        onFocus={onFocus}
        height={height}
        multiline={multiline}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        fontFamily={fontFamily}
        pointerEvents={pointerEvents}
      />

      {rightIcon && (
        <TouchableOpacity
          style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}
          onPress={onRightPress}>
          {rightText && (
            <Text style={{marginRight: 10, color: GRAY_600}}>{rightText}</Text>
          )}
          <Image
            width={30}
            height={30}
            source={rightIcon}
            padding={0}
            style={{tintColor: BLACK}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 20,
    marginTop: 10,
    paddingStart: 10,
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
    }),
  },
  transparentInputContainerStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editableText: {
    paddingVertical: 7,
    flex: 1,
    fontFamily: 'Poppins-Regular',
    paddingStart: 10,
    fontSize: 14,
    color: TEXT_COLOR_AUTH_TITLES,
  },

  unEditableText: {
    paddingVertical: 7,
    marginStart: 5,
    flex: 1,
    color: 'black',
    fontSize: 14,
  },
});
