import AsyncStorage from '@react-native-async-storage/async-storage';

var setLoggedIn = async function (isLogin) {
  await AsyncStorage.setItem('loggedin', isLogin);
};

var getLoggedIn = async function () {
  return await AsyncStorage.getItem('loggedin');
};

var setToken = async function (token) {
  await AsyncStorage.setItem('token', token);
};

var getToken = async function () {
  return await AsyncStorage.getItem('token');
};

var setFcmToken = async function (token) {
  await AsyncStorage.setItem('fcmtoken', token);
};

var getFcmToken = async function () {
  return await AsyncStorage.getItem('fcmtoken');
};
var setEmailAddress = async function (emailAddress) {
  await AsyncStorage.setItem('emailAddress', emailAddress);
};

var getEmailAddress = async function () {
  return await AsyncStorage.getItem('emailAddress');
};

var setName = async function (firstName) {
  await AsyncStorage.setItem('name', firstName);
};

var getName = async function () {
  return await AsyncStorage.getItem('name');
};

var setUserId = async function (lastName) {
  await AsyncStorage.setItem('userId', lastName);
};

var getUserId = async function () {
  return await AsyncStorage.getItem('userId');
};

export {
  setLoggedIn,
  getLoggedIn,
  setToken,
  getToken,
  setFcmToken,
  getFcmToken,
  setName,
  getName,
  setEmailAddress,
  getEmailAddress,
  setUserId,
  getUserId,
};
