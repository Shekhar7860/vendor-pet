import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {GRAY_300, GRAY_600} from '../utils/Colors';
import TextInputMask from 'react-native-text-input-mask';

/**
 *
 * @param {*} props
 * This is a common input field.
 * If you pass the  @param props.leftIcon , Left icon will be display.
 * If you pass the  @param props.rightIcon , Right icon will be display.
 */
export const TextInputFieldMasked = (props) => {
  const {
    placeHolderText,
    value,
    onChangeText,
    editable,
    rightIcon,
    leftIcon,
    onRightPress,
    rightText,
  } = props;
  return (
    <View style={styles.inputContainerStyle}>
      {leftIcon && (
        <Image
          width={30}
          height={30}
          source={leftIcon}
          style={{marginRight: 7}}
        />
      )}

      <TextInputMask
        refInput={() => {}}
        value={value}
        placeholder={placeHolderText}
        onChangeText={(formatted, extracted) => {
          onChangeText(formatted, extracted);
          console.log(formatted); // +1 (123) 456-78-90
          console.log(extracted); // 1234567890
        }}
        style={editable == false ? styles.unEditableText : styles.editableText}
        mask={'+1 ([000]) [000]-[00][00]'}
      />

      {rightIcon && (
        <TouchableOpacity onPress={onRightPress}>
          {rightText && (
            <Text style={{marginRight: 10, color: GRAY_600}}>{rightText}</Text>
          )}
          <Image width={30} height={30} source={rightIcon} padding={0} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomColor: GRAY_300,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.8,
  },
  editableText: {
    paddingVertical: 7,
    flex: 1,
  },

  unEditableText: {
    paddingVertical: 7,
    marginStart: 5,
    flex: 1,
    color: 'black',
  },
});
