import { SET_USER_AGENT } from "../constants";

/**
 * 
 * @param {*} payload 
 * This action is for set the user agent.
 */
const setUserAgentSuccess = payload => {
  return {
    type: SET_USER_AGENT,
    payload: payload
  };
};

export { setUserAgentSuccess };
