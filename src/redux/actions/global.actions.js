import {
  SET_STEPS,
  SET_AXIOS_ERROR,
  CLEAR_REQUESTS_QUEUE,
  POP_REQUESTS_QUEUE,
  PUSH_REQUESTS_QUEUE,
} from 'redux/constants'

export const setSteps = (steps) => ({
  type: SET_STEPS,
  payload: steps
})

export const setInitlalSteps = () => ({
  type: SET_STEPS,
  payload: ['Service Selection', 'Vehicle Selection', 'Details', 'Select Add-Ons', 'Contact Information', 'Billing Information']
})

export const setStepsWithBooking = () => ({
  type: SET_STEPS,
  payload: ['Service Selection', 'Vehicle Selection', 'Booking Details', 'Select Add-Ons', 'Contact Information', 'Billing Information']
})

export const setStepsWithFlight = () => ({
  type: SET_STEPS,
  payload: ['Service Selection', 'Vehicle Selection', 'Flight Details', 'Select Add-Ons', 'Contact Information', 'Billing Information']
})

export const clearRequestsQueue = () => ({
  type: CLEAR_REQUESTS_QUEUE,
})

export const popRequestsQueue = () => ({
  type: POP_REQUESTS_QUEUE,
})

export const pushRequestsQueue = () => ({
  type: PUSH_REQUESTS_QUEUE,
})

export const setAxiosError = (error) => {
  return ({
    type: SET_AXIOS_ERROR,
    payload: error
  })
}


