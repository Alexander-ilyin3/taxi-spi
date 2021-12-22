import { mapVehiclesToState } from "helpers/mapVehiclesToState"
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
  TOTAL_LOADING
} from "redux/constants"

export const pageSteps = (state, { type, payload }) => {
  switch (type) {
    case SET_STEPS:
      return { ...state, steps: payload }

    default:
      return { ...state }
  }
}

export const axiosError = (state, { type, payload }) => {
  switch (type) {
    case SET_AXIOS_ERROR:
      return { ...state, text: payload }

    default:
      return { ...state }
  }
}

export const isLoading = (state = [], { type }) => {
  switch (type) {
    case CLEAR_REQUESTS_QUEUE:
      return []
    case POP_REQUESTS_QUEUE:
      const newState = [...state]
      newState.pop()
      return newState
    case PUSH_REQUESTS_QUEUE:
      return [...state, true]

    default:
      return []
  }
}

export const globalStepsData = (state, { type, payload }) => {
  switch (type) {
    case SET_GLOBAL_STEPS_DATA:
      return { ...payload, booking_date: payload.booking_date || '', booking_date: payload.booking_date || ''}

    default:
      return { ...state }
  }
}

export const vehicles = (state = [], { type, payload }) => {
  switch (type) {
    case SET_VEHICLES:
      return payload || []

    default:
      return state
  }
}

export const vehiclesWereFetched = (state = false, { type, payload }) => {
  switch (type) {
    case SET_VEHICLES_WERE_FETCHED:
      return payload

    default:
      return state 
  }
}


export const selectedVehicle = (state = null, { type, payload }) => {
  switch (type) {
    case SET_SELECTED_VEHICLE:
      return payload?.vehicle?.vehicle_id || null

    default:
      return state
  }
}

export const isAirportStates = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_LOCATION_IS_AIRPORT:
      return { ...state, locationIsAirport: payload }
    case SET_DESTINATION_IS_AIRPORT:
      return { ...state, destinationIsAirport: payload }

    default:
      return { ...state }
  }
}

export const isCustomDestination = (state = false, { type, payload }) => {
  switch (type) {
    case SET_IS_CUSTOM_DESTINATION:
      return payload || false

    default:
      return state
  }
}

export const addonList = (state = [], { type, payload }) => {
  switch (type) {
    case SET_ADDONS:
      return payload || []

    default:
      return [...state]
  }
}

export const coutries = (state = [], { type, payload }) => {
  switch (type) {
    case SET_COUNTRIES:
      return payload || []

    default:
      return [...state]
  }
}

export const states = (state = [], { type, payload }) => {
  switch (type) {
    case SET_STATES:
      return payload || []

    default:
      return [...state]
  }
}

const countryStateDefault = {
  country_id: null,
  state_id: null,
}

export const selectedCountryAndState = (state = countryStateDefault, { type, payload }) => {
  switch (type) {
    case SET_SELECTED_COUNTRY_AND_STATE:
      return {
        country_id: payload?.contact?.country_id || null,
        state_id: payload?.contact?.state_id || null,
      }

    default:
      return state
  }
}

export const bookingId = (state = null, { type, payload }) => {
  switch (type) {
    case SET_BOOKING_ID:
      return payload || null

    default:
      return state
  }
}

export const fee = (state = { tax: 22.4, rate: 16 }, { type, payload }) => {
  switch (type) {
    case SET_FEE:
      return payload
  default:
    return state
  }
}

export const totalLoading = (state = false, { type, payload }) => {
  switch (type) {
    case TOTAL_LOADING:
      return payload
  default:
    return state
  }
}
