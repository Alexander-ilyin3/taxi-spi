const rules = [
  { requestType: 'location_id', stateType: 'pickupLocation.location_id', dataType: 'int' },
  { requestType: 'location_details', stateType: '', dataType: '' },
  { requestType: 'destination_id', stateType: 'destinationLocation.location_id', dataType: 'int' },
  { requestType: 'destination_details', stateType: '', dataType: '' },
  { requestType: 'passengers', stateType: 'numberOfPassengers', dataType: 'int' },
  { requestType: 'roundtrip', stateType: 'roadTripReservation', dataType: '1|0' },
  { requestType: 'vehicle_id', stateType: 'selectedCar.vehicleId', dataType: 'int' },
  { requestType: 'booking_date', stateType: 'bookingDate', dataType: 'date' },
  { requestType: 'booking_time', stateType: 'bookinglTime', dataType: 'time' },

  { requestType: 'booking_date', stateType: 'arrivalDate', dataType: 'date' },
  { requestType: 'booking_time', stateType: 'arrivalTime', dataType: 'time' },
  { requestType: 'arrival_flight_airline', stateType: 'arrivalAirline', dataType: 'str' },
  { requestType: 'arrival_flight_number', stateType: 'arrivalFlightNumber', dataType: 'str' },
  { requestType: 'booking_notes', stateType: 'bookingDetailsNotes', dataType: 'str' },
  { requestType: 'departure_date', stateType: 'departureDate', dataType: 'date' },
  { requestType: 'departure_time', stateType: 'departureTime', dataType: 'time' },
  { requestType: 'departure_airline', stateType: 'departureAirline', dataType: 'str' },
  { requestType: 'departure_flight_number', stateType: 'departureFlightNumber', dataType: 'str' },

  { requestType: 'firstname', stateType: 'firstName', dataType: 'str' },
  { requestType: 'lastname', stateType: 'lastName', dataType: 'str' },
  { requestType: 'email', stateType: 'emailAddress', dataType: 'str' },
  { requestType: 'phone', stateType: 'mobilePhone', dataType: 'str' },
  { requestType: 'phone2', stateType: 'additionalPhone', dataType: 'str' },
  { requestType: 'country_id', stateType: 'country.country_id', dataType: 'int' },
  { requestType: 'state_id', stateType: 'state.state_id', dataType: 'int' },
  { requestType: 'address', stateType: 'address', dataType: 'str' },
  { requestType: 'address2', stateType: 'address2', dataType: 'str' },
  { requestType: 'city', stateType: 'city', dataType: 'str' },
  { requestType: 'zip', stateType: 'postalCode', dataType: 'str' },

  { requestType: 'coupon_id', stateType: '', dataType: '' },
  { requestType: 'addon_ids', stateType: '', dataType: '' },

  { requestType: 'custom_location', stateType: 'customDestination', dataType: 'str' },
  { requestType: 'is_custom_location', stateType: 'isCustomDestination', dataType: '1|0' },
]

const reduceToNeededType = (value, type) => {
  switch (type) {
    case 'int':
      return !isNaN(Number(value)) ? Number(value) : undefined
    case '1|0':
      return typeof value === 'boolean' ? value - 0 : undefined
    case 'date':
      return value instanceof Date && !isNaN(value) ? value.toLocaleDateString('fr-CA') : undefined
    case 'time':
      return value instanceof Date && !isNaN(value) ? value.toLocaleTimeString('ua', { hour: '2-digit', minute: '2-digit' }) : undefined
    case 'str':
      return value ? value.toString() : undefined

    default:
      return undefined
  }
}

export const mapStateToParams = (outerStateValues) => {
  const paramObject = {}
  const stateValues = outerStateValues?.isCustomDestination ? {
    numberOfPassengers: outerStateValues.numberOfPassengers,
    customDestination: outerStateValues.customDestination,
    isCustomDestination: outerStateValues.isCustomDestination
  } : outerStateValues

  for (let key in stateValues) {
    const ruleObject = rules.find(rule => rule.stateType.replace(/(.*)\..*/g, '$1') === key) //TODO several rules for the same stateValues object
    let paramValue

    if (ruleObject && /\./.test(ruleObject.stateType)) {

      const objectKeysDepth = ruleObject.stateType.split('.')

      paramValue = objectKeysDepth.reduce((prev, next) => {
        if (prev === undefined) return undefined
        return prev[next]
      }, stateValues)

    } else if (ruleObject) {
      paramValue = stateValues[key]
    }

    if (ruleObject) {
      const reducedParamValue = reduceToNeededType(paramValue, ruleObject.dataType)

      if (reducedParamValue !== undefined) {
        paramObject[ruleObject.requestType] = reducedParamValue
      }
    }


    //TODO DEV 
    if (
      !ruleObject &&
      key !== 'isCustomDestination' &&
      key !== 'selectedVehicle' &&
      key !== 'confirmEmailAddress'
    ) {
      throw new Error('No rule specified for ' + key)
    }
    // DEV
  }

  return paramObject
}
