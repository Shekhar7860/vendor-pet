import { hitPostAPI } from '../../network';
import Const from '../../utils/Const';
import { validateEmail } from '../../utils';

/**
 *
 * @param {*} email
 * @param {*} password
 * Login api will be call here.
 */
const login = (email, password, checked) => {
  return new Promise((resolve, reject) => {
    if (!validateEmail(email)) {
      reject('Please enter valid email address');
    } else if (password.length === 0) {
      reject('Please enter password');
    }
    let body = new FormData();
    body.append('user_email', email);
    body.append('user_pass', password);
    body.append('device_id', '123456');

    hitPostAPI(body, Const.LOGIN_URL, '', '')
      .then(([, json]) => {
        if (json.code === 200) {
          resolve(json);
        } else {
          reject(json.message);
        }
      })
      .catch(([err]) => {
        reject(err);
        console.log('error =>', err);
      });
  });
};

/**
 *
 * @param {*} email
 * Forgot Password api will be call here.
 */
const forgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    if (!validateEmail(email)) {
      reject('Please enter valid email address');
    }
    let body = new FormData();
    body.append('user_email', email);

    hitPostAPI(body, 'forgotpassword', '', '')
      .then(([, json]) => {
        if (json.code === 200) {
          resolve(json);
        } else {
          reject(json.message);
        }
      })
      .catch(([err]) => {
        reject(err);
        console.log('error =>', err);
      });
  });
};

const resendVerificationCode = (userId) => {
  return new Promise((resolve, reject) => {
    let body = new FormData();
    body.append('userid', userId);
    hitPostAPI(body, 'resendverificationcode', '', '')
      .then(([, json]) => {
        if (json.code === 200) {
          resolve(json);
        } else {
          reject(json.message);
        }
      })
      .catch(([err]) => {
        reject(err);
        console.log('error =>', err);
      });
  });
}



export { login, forgotPassword, resendVerificationCode };
