const rules = [
  { requestType: 'location_id', stateType: 'pickupLocation.location_id', dataType: 'int' },
  { requestType: 'location_details', stateType: '', dataType: '' },
  { requestType: 'destination_id', stateType: 'destinationLocation.location_id', dataType: 'int' },
  { requestType: 'destination_details', stateType: '', dataType: '' },
  { requestType: 'passenger', stateType: 'numberOfPassengers', dataType: 'int' },
  { requestType: 'roundtrip', stateType: 'roadTripReservation', dataType: '1|0' },
  { requestType: 'vehicle_id', stateType: '', dataType: '' },
  { requestType: 'booking_date', stateType: '', dataType: '' },
  { requestType: 'booking_time', stateType: '', dataType: '' },
  { requestType: 'arrival_flight_airline', stateType: '', dataType: '' },
  { requestType: 'arrival_flight_number', stateType: '', dataType: '' },
  { requestType: 'booking_notes', stateType: '', dataType: '' },
  { requestType: 'departure_date', stateType: '', dataType: '' },
  { requestType: 'departure_time', stateType: '', dataType: '' },
  { requestType: 'departure_airline', stateType: '', dataType: '' },
  { requestType: 'departure_flight_number', stateType: '', dataType: '' },
  { requestType: 'firstname', stateType: '', dataType: '' },
  { requestType: 'lastname', stateType: '', dataType: '' },
  { requestType: 'email', stateType: '', dataType: '' },
  { requestType: 'phone', stateType: '', dataType: '' },
  { requestType: 'phone2', stateType: '', dataType: '' },
  { requestType: 'country_id', stateType: '', dataType: '' },
  { requestType: 'state_id', stateType: '', dataType: '' },
  { requestType: 'address', stateType: '', dataType: '' },
  { requestType: 'address2', stateType: '', dataType: '' },
  { requestType: 'city', stateType: '', dataType: '' },
  { requestType: 'zip', stateType: '', dataType: '' },
  { requestType: 'coupon_id', stateType: '', dataType: '' },
  { requestType: 'addon_id', stateType: '', dataType: '' },
]

const reduceToNeededType = (value, type) => {
  switch (type) {
    case 'int':
      return !isNaN(parseFloat(value)) ? parseFloat(value) : undefined
    case '1|0':
      return typeof value === 'boolean' ? value - 0 : undefined

    default:
      return undefined
  }
}

export const mapStateToParams = (stateValues) => {
  const paramObject = {}

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


    // DEV 
    if (
      !ruleObject &&
        key !== 'isCustomDestination'
    ) {
      throw new Error('No rule specified for ' + key)
    }
    // DEV
  }

  return paramObject
}
