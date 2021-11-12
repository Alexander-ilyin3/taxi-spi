export const getSteps = state => state.pageSteps.steps || []
export const getAxiosError = state => state.axiosError.text || null
export const getIsLoading = state => (state.isLoading || []).length > 0
export const getIsRoundTrip = state => state.globalStepsData.roundtrip || undefined
export const getVehicles = state => state.vehicles || []
export const getSelectedVehicle = state => state.selectedVehicle || null
export const getGlobalStepsData = state => state.globalStepsData || {}
export const getIsAirportStates = state => state.isAirportStates || {}
export const getLocationIsAirport = (state) => getIsAirportStates(state).locationIsAirport || false
export const getDestinationIsAirport = (state) => getIsAirportStates(state).destinationIsAirport || false
export const getSelectedVehicleIdObject = state => state?.globalStepsData?.vehicle?.vehicle_id ? { vehicle_id: state.globalStepsData.vehicle.vehicle_id } : {}
export const getAddons = state => state.addonList || []
export const getCountries = state => state.coutries || []
export const getStates = state => state.states || []
export const getSelectedCountryAndState = state => state.selectedCountryAndState || {}
export const getBookingId = state => state.bookingId || null
