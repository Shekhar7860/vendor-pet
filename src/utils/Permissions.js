import {
  checkMultiple,
  PERMISSIONS,
  RESULTS,
  requestMultiple,
  openSettings,
} from 'react-native-permissions';
import {Alert, Platform} from 'react-native';
/**
 * Request permission to access camera and Audio
 */
const requestCameraAndRecordAudioPermissions = () => {
  requestMultiple([
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.MICROPHONE,
  ])
    .then(statuses => {
      if (
        statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.BLOCKED ||
        statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.BLOCKED ||
        statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.BLOCKED ||
        statuses[PERMISSIONS.IOS.MICROPHONE] === RESULTS.BLOCKED
      ) {
        Alert.alert(
          'Permission Request',
          'We need Camera and microphone permission for video call. So please allow.',
          [
            {
              text: 'OK',
              onPress: () =>
                openSettings().catch(err => {
                  Alert.alert(err);
                }),
            },
          ],
          {cancelable: false},
        );
      }
    })
    .catch(err => {});
};

/**
 * Check permissions are allowed to the app camera and audio
 *@returns true if both permissions are allowed or not
 */
const checkCameraAndMicrophonePermission = () => {
  return new Promise((resolve, reject) => {
    checkMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.MICROPHONE,
    ])
      .then(statuses => {
        if (
          Platform.OS === 'android' &&
          statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.GRANTED
        ) {
          resolve(true);
        } else if (
          Platform.OS === 'ios' &&
          statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.IOS.MICROPHONE] == RESULTS.GRANTED
        ) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => {});
  });
};

const requestReadWriteExternalStoragePermissions = () => {
  requestMultiple([
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.IOS.READ_EXTERNAL_STORAGE,
    PERMISSIONS.IOS.WRITE_EXTERNAL_STORAGE,
  ])
    .then(statuses => {
      if (
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
          RESULTS.BLOCKED ||
        statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
          RESULTS.BLOCKED ||
        statuses[PERMISSIONS.IOS.READ_EXTERNAL_STORAGE] === RESULTS.BLOCKED ||
        statuses[PERMISSIONS.IOS.WRITE_EXTERNAL_STORAGE] === RESULTS.BLOCKED
      ) {
        Alert.alert(
          'Permission Request',
          'We need external storage permission for download data. So please allow.',
          [
            {
              text: 'OK',
              onPress: () =>
                openSettings().catch(err => {
                  Alert.alert(err);
                }),
            },
          ],
          {cancelable: false},
        );
      }
    })
    .catch(err => {});
};

const checkReadWriteExternalStoragePermissions = () => {
  return new Promise((resolve, reject) => {
    requestMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.IOS.READ_EXTERNAL_STORAGE,
      PERMISSIONS.IOS.WRITE_EXTERNAL_STORAGE,
    ])
      .then(statuses => {
        if (
          Platform.OS === 'android' &&
          statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
            RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
            RESULTS.GRANTED
        ) {
          resolve(true);
        } else if (Platform.OS === 'ios') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => {});
  });
};

const checkLocationPermissions = () => {
  return new Promise((resolve, reject) => {
    requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.IOS.ACCESS_FINE_LOCATION,
    ])
      .then(statuses => {
        if (
          Platform.OS === 'android' &&
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED
        ) {
          resolve(true);
        } else if (Platform.OS === 'ios') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        console.log('permission error== ', err);
      });
  });
};

export {
  checkLocationPermissions,
  requestCameraAndRecordAudioPermissions,
  checkCameraAndMicrophonePermission,
  checkReadWriteExternalStoragePermissions,
  requestReadWriteExternalStoragePermissions,
};
