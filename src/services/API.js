// @flow
import axios from 'axios';
import {merge as _merge} from 'lodash';
import _ from 'lodash';
import Snackbar from 'react-native-snackbar';

function baseAxios(options) {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return axios.create({
    baseURL: 'https://snap.optimaldevelopments.com/api/',
    timeout: options.timeout || 30000,
    headers: defaultHeaders,
  });
}

function executeRequest(method, pathname, data, options = {}) {
  const body = method === 'get' || !data ? {} : {data};
  const reqObj = options.query
    ? {method, url: pathname, params: options.query, ...body}
    : {method, url: pathname, ...body};
  const baseAxiosRequest = baseAxios(options);
  return new Promise((resolve, reject) => {
    return baseAxiosRequest
      .request(reqObj)
      .then(res => {
        console.log('res', res);
        resolve(res.data);
      })
      .catch(error => {
        // console.log('error', error);
        reject(error);
      });
  });
}

export default {
  get(pathname, options) {
    return executeRequest('get', pathname, null, options);
  },

  post(pathname, data, options) {
    return executeRequest('post', pathname, data, options);
  },

  put(pathname, data, options) {
    return executeRequest('put', pathname, data, options);
  },

  delete(pathname, data, options) {
    return executeRequest('delete', pathname, data, options);
  },

  all(promises) {
    return axios.all(promises);
  },

  handleResponse(response) {
    if (response) {
      if (response && response.code == 200) {
        return {success: true, data: response.data};
      } else {
        let message =
          typeof response.message === 'string'
            ? response.message
            : typeof response.message === 'object'
            ? response.message.denied
              ? this.handleError(response.message.denied)
              : response.message.incorrect_password
              ? this.handleError(response.message.incorrect_password)
              : response.message.invalid_email
              ? this.handleError(response.message.invalid_email)
              : 'Some Error'
            : 'Some Error!';
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
        });
        return {success: false, data: response.message};
      }
    }
  },

  handleLoginResponse(response) {
    if (response) {
      if (response && response.code == 200) {
        return {success: true, data: response.data};
      } else {
        let message =
          typeof response.message === 'string'
            ? response.message
            : typeof response.message === 'object'
            ? response.message.denied
              ? this.handleError(response.message.denied)
              : response.message.incorrect_password
              ? this.handleError(response.message.incorrect_password)
              : response.message.invalid_email
              ? this.handleError(response.message.invalid_email)
              : 'Some Error'
            : 'Some Error!';
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
        });
        return {
          success: false,
          data: response.message,
          id:
            response.data &&
            response.data.length > 0 &&
            response.data[0] &&
            response.data[0].id,
        };
      }
    }
  },

  handleResponseForMessage(response) {
    if (response) {
      console.log('handleResponseForMessage==', response.message);
      if (response && response.code == 200) {
        const message = response.message;
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
        });
        return {success: true, data: message};
      } else {
        let message =
          typeof response.message === 'string'
            ? response.message
            : typeof response.message === 'object'
            ? response.message.denied
              ? this.handleError(response.message.denied)
              : response.message.incorrect_password
              ? this.handleError(response.message.incorrect_password)
              : response.message.invalid_email
              ? this.handleError(response.message.invalid_email)
              : 'Some Error'
            : 'Some Error!';
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
        });
        return {success: false, data: response.message};
      }
    }
  },

  handleError(message) {
    return typeof message === 'object' &&
      Array.isArray(message) &&
      message.length > 0
      ? message[0]
      : 'Some Error';
  },
};
