import { mapToState } from "helpers/mapUpdateCartResponseToState"

export const getStep1 = state => mapToState(state.globalStepsData, 1) || {}
export const getStep2 = state => mapToState(state.globalStepsData, 2) || {}
export const getStep3 = state => mapToState(state.globalStepsData, 3) || {}
export const getStep4 = state => mapToState(state.globalStepsData, 4) || {}
export const getStep5 = state => mapToState(state.globalStepsData, 5) || {}
export const getStep6 = state => mapToState(state.globalStepsData, 6) || {}
export const getStep7 = state => mapToState(state.globalStepsData, 7) || {}

export const getPassengers = state => getStep1(state).numberOfPassengers || ''
