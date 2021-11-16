/* eslint-disable curly */
/* eslint-disable no-undef */
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

export default Network = (endpoint, method, body, authToken, mesibo) => {
  debugger;
  var BASE_URL = 'https://myappsdevelopment.in/demos/pets/public/api/';

  // if (mesibo) BASE_URL = 'https://api.mesibo.com/api.php?';
  // else BASE_URL = 'https://onlinewebdemos.in/demos/pets/public/api/';

  console.log('End Point', `${BASE_URL}${endpoint}`);
  console.log('Body ', JSON.stringify(body));
  console.log('Token ', authToken);

  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        axios(
          method == 'get'
            ? {
                method,
                url: `${BASE_URL}${endpoint}`,
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Bearer ${authToken}`,
                },
                // data: body,
              }
            : {
                method,
                url: `${BASE_URL}${endpoint}`,
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Bearer ${authToken}`,
                },
                data: body,
              },
        )
          .then(function (response) {
            //console.log(JSON.stringify(response));
            resolve(response.data);
          })
          .catch(function (error) {
            console.log('in error', JSON.stringify(error));
            reject(error);
          });
      } else {
        reject('No connection');
      }
    });
  });
};
