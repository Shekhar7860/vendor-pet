import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return {error: e};
  }
};

const setItem = async (key, value) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    return {error: e};
  }
};

const removeItem = async key => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    return {error: e};
  }
};

const removeAllItem = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (e) {
    return {error: e};
  }
};

const getAllItem = async () => {
  try {
    return await AsyncStorage.getItem();
  } catch (e) {
    return {error: e};
  }
};

export {getItem, setItem, removeItem, getAllItem, removeAllItem};
