/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {View} from 'react-native';

export default function signup2(props) {
  const {mode, onDateSelectChange, value, show} = props;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log('Current Date', currentDate.toString);
    onDateSelectChange(currentDate);
  };

  return (
    <View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
