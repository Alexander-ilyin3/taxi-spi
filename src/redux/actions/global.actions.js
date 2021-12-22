import {
  SET_STEPS,
  SET_AXIOS_ERROR,
  CLEAR_REQUESTS_QUEUE,
  POP_REQUESTS_QUEUE,
  PUSH_REQUESTS_QUEUE,
  SET_GLOBAL_STEPS_DATA,
  SET_VEHICLES,
  SET_SELECTED_VEHICLE,
  SET_LOCATION_IS_AIRPORT,
  SET_DESTINATION_IS_AIRPORT,
  SET_ADDONS,
  SET_COUNTRIES,
  SET_STATES,
  SET_SELECTED_COUNTRY_AND_STATE,
  SET_BOOKING_ID,
  SET_IS_CUSTOM_DESTINATION,
  SET_VEHICLES_WERE_FETCHED,
  SET_FEE,
  TOTAL_LOADING,
} from 'redux/constants'

export const setSteps = (steps) => ({
  type: SET_STEPS,
  payload: steps
})

export const setInitlalSteps = () => ({
  type: SET_STEPS,
  payload: ['Service Selection', 'Vehicle Selection', 'Details', <>Select Add&#8288;-&#8288;ons</>, 'Contact Information', 'Billing Information']
})

export const setStepsWithBooking = () => ({
  type: SET_STEPS,
  payload: ['Service Selection', 'Vehicle Selection', 'Booking Details', <>Select Add&#8288;-&#8288;ons</>, 'Contact Information', 'Billing Information']
})

export const setStepsWithFlight = () => ({
  type: SET_STEPS,
  payload: ['Service Selection', 'Vehicle Selection', 'Flight Details', <>Select Add&#8288;-&#8288;ons</>, 'Contact Information', 'Billing Information']
})

export const setCustomLocationStepsVariant = () => ({
  type: SET_STEPS,
  payload: ['Service Selection', 'Booking Details', 'Contact Information']
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

export const setGlobalStepsData = (data) => {
  return ({
    type: SET_GLOBAL_STEPS_DATA,
    payload: data,
  })
}

export const setIsCustomDestination = (data) => {
  return ({
    type: SET_IS_CUSTOM_DESTINATION,
    payload: data
  })
}

export const setVehicles = (data) => {
  return ({
    type: SET_VEHICLES,
    payload: data
  })
}

export const setVehiclesWereFetched = (data) => {
  return ({
    type: SET_VEHICLES_WERE_FETCHED,
    payload: data
  })
}

export const setSelectedVehicle = (data) => {
  return ({
    type: SET_SELECTED_VEHICLE,
    payload: data
  })
}

export const setLocationIsAirport = data => {
  return ({
    type: SET_LOCATION_IS_AIRPORT,
    payload: data
  })
}

export const setDestinationIsAirport = data => {
  return ({
    type: SET_DESTINATION_IS_AIRPORT,
    payload: data
  })
}

export const setAddons = data => {
  return ({
    type: SET_ADDONS,
    payload: data
  })
}

export const setStates = data => {
  return ({
    type: SET_STATES,
    payload: data
  })
}

export const setCountries = data => {
  return ({
    type: SET_COUNTRIES,
    payload: data
  })
}

export const setSelectedCountryAndState = data => {
  return ({
    type: SET_SELECTED_COUNTRY_AND_STATE,
    payload: data,
  })
}

export const clearSelectedCountryAndState = () => {
  return ({
    type: SET_SELECTED_COUNTRY_AND_STATE,
    payload: {
      country_id: null,
      state_id: null,
    }
  })
}

export const setBookingId = (data) => {
  return ({
    type: SET_BOOKING_ID,
    payload: data,
  })
}

export const setFee = (data) => {
  return ({
    type: SET_FEE,
    payload: data,
  })
}

export const setTotalLoading = (loading) => {
  return ({
    type: TOTAL_LOADING,
    payload: loading,
  })
}
