import { apiMiddleware } from 'api/instance'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
} from './allSteps.reducer'
// import {
//   pageSteps,
//   axiosError,
//   isLoading,
//   globalStepsData,
//   vehicles,
//   selectedVehicle,
//   isAirportStates,
//   addonList,
//   states,
//   coutries,
//   selectedCountryAndState,
//   bookingId,
//   isCustomDestination,
// } from './global.reducers'

import * as globalReducers from './global.reducers'

const rootReducer = combineReducers(
  {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    step7,
    ...globalReducers
    // pageSteps,
    // axiosError,
    // isLoading,
    // globalStepsData,
    // vehicles,
    // selectedVehicle,
    // isAirportStates,
    // addonList,
    // states,
    // coutries,
    // selectedCountryAndState,
    // bookingId,
  }
)

export const store = createStore(
  rootReducer,
  // undefined,
  // { pageSteps: [] },
  composeWithDevTools(applyMiddleware(apiMiddleware, )) // (q) => (w) => console.log(111111, q,w))
  // composedEnhancer
)
