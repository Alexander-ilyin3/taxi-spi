export const getStep1 = state => state.step1 || {}
export const getPassengers = state => getStep1(state).numberOfPassengers || ''
