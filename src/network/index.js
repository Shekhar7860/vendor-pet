import Const from '../utils/Const';

var hitPostAPI = async function (params, URL) {
  console.log(
    'hitting man ==>',
    Const.LIVE_BASE_URL + URL + ' params=>' + JSON.stringify(params),
  );

  return fetch(Const.LIVE_BASE_URL + URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
    body: params,
  }).then((response) => Promise.all([response, response.json()]));
};

var hitGetAPI = async function (URL) {
  console.log('hitting man ==>', URL);

  return fetch(Const.LIVE_BASE_URL + URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => Promise.all([response, response.json()]));
};

var hitPostAPIwithImage = async function (body, URL, userToken) {
  console.log(
    'hitting man ==>',
    URL + ' body =>  ' + JSON.stringify(body) + ' User Token => ' + userToken,
  );

  return fetch(URL, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((response) => Promise.all([response, response.json()]));
};

export {hitPostAPI, hitGetAPI, hitPostAPIwithImage};
