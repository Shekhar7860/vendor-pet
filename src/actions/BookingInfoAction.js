import {
  SET_BOOKING_DATA,
  BOOKING_SUCCESS,
  RESET_BOOKING_DATA,
} from '../constants'

/**
 *
 * @param {*} payload
 * When user click on any slot then set action to set data in redux
 */
export const setBookingData = (payload) => {
  console.log('--------setBookingData action------' + JSON.stringify(payload))

  return {
    type: SET_BOOKING_DATA,
    payload: payload,
  }
}

/**
 * booking data reset action
 */
export const resetBookingData = () => {
  return {
    type: RESET_BOOKING_DATA,
  }
}

/**
 * Booking success action
 */
export const setBookingSuccess = () => {
  return {
    type: BOOKING_SUCCESS,
  }
}
