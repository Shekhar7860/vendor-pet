
/**
 * 
 * @param {*} payload 
 */

const fetchTokenSuccess = payload => {
  return {
    type: FETCH_TOKEN_SUCESS,
    payload: payload
  };
};
