import { mapSelectedAddonsToForm } from "./mapSelectedAddonsToForm"

const rulesArray = [
  {
    step: 1,
    rulesData: [
      { requestType: 'roundtrip', stateType: 'roadTripReservation', dataType: 'boolean' },
      { requestType: 'location', stateType: 'pickupLocation', dataType: 'origin' },
      { requestType: 'destination', stateType: 'destinationLocation', dataType: 'origin' },
      { requestType: 'passengers', stateType: 'numberOfPassengers', dataType: 'origin' },
    ]
  },
  {
    step: 2,
    rulesData: [
      { requestType: 'passengers', stateType: 'numberOfPassengers', dataType: 'origin' }
    ]
  },
  {
    step: 3,
    rulesData: [
      { requestType: 'booking_date', stateType: 'bookingDate', dataType: 'date' },
      { requestType: 'booking_time', stateType: 'bookinglTime', dataType: 'date' },
      { requestType: 'notes', stateType: 'bookingDetailsNotes', dataType: 'origin' },

      { requestType: 'arrival_flight_airline', stateType: 'arrivalAirline', dataType: 'origin' },
      { requestType: 'arrival_flight_number', stateType: 'arrivalFlightNumber', dataType: 'origin' },
      // arrivalDate: null
      // arrivalTime: null

      { requestType: 'departure_date', stateType: 'departureDate', dataType: 'date' },
      { requestType: 'departure_time', stateType: 'departureTime', dataType: 'date' },
      { requestType: 'departure_airline', stateType: 'departureAirline', dataType: 'origin' },
      { requestType: 'departure_flight_number', stateType: 'departureFlightNumber', dataType: 'origin' },
    ]
  },

  {
    step: 4,
    rulesData: [
      { requestType: 'addons', stateType: 'Addon', dataType: 'origin', mapFunction: mapSelectedAddonsToForm },
    ]
  },

  {
    step: 5,
    rulesData: [
      { requestType: 'contact.firstname', stateType: 'firstName', dataType: 'origin' },
      { requestType: 'contact.lastname', stateType: 'lastName', dataType: 'origin' },
      { requestType: 'contact.email', stateType: 'emailAddress', dataType: 'origin' },
      { requestType: 'contact.email', stateType: 'confirmEmailAddress', dataType: 'origin' },
      { requestType: 'contact.phone', stateType: 'mobilePhone', dataType: 'origin' },
      { requestType: 'contact.phone2', stateType: 'additionalPhone', dataType: 'origin' },

      // { requestType: 'contact', stateType: '', dataType: 'origin' },
      // { requestType: 'contact', stateType: '', dataType: 'origin' },
      // { requestType: 'contact.state_id', stateType: 'state', dataType: 'origin' },
      // { requestType: 'contact.country_id', stateType: 'country', dataType: 'origin' },

      { requestType: 'contact.address', stateType: 'address', dataType: 'origin' },
      { requestType: 'contact.address2', stateType: 'address2', dataType: 'origin' },
      { requestType: 'contact.city', stateType: 'city', dataType: 'origin' },
      { requestType: 'contact.zip', stateType: 'postalCode', dataType: 'origin' },
    ]
  },
]

const reduceToBoolean = (valueToReduce) => {
  const number = parseFloat(valueToReduce)
  return number === 1 || number === 0 ? Boolean(number) : undefined
}

const reduceToDate = (value) => {
  const [_, hours, minutes] = value.match(/(\d{2}):(\d{2})/, 'g') || []

  if (hours && minutes) {
    const date = new Date()
    date.setHours(hours)
    date.setMinutes(minutes)
    return date
  }

  if (/\d{4}-\d{2}-\d{2}/.test(value)) {
    return new Date(value)
  }
}

const reduceToType = (value, type) => {

  if (value === undefined) return undefined

  if (type === 'origin') {
    return value
  }

  if (type === 'boolean') {
    return reduceToBoolean(value)
  }

  if (type === 'date') {
    return reduceToDate(value)
  }
}


export const mapToState = (session, step) => {

  const rules = rulesArray.find(rule => rule.step === step)

  if (!rules) return {}

  const resultObject = {}

  const getValueWithPath = (obj, path) => {
    return path.split('.').reduce((obj, p) => {
      if (obj === undefined) return undefined
      return obj[p]
    }, obj)
  }

  rules.rulesData.forEach(rule => {
    const key = rule.stateType
    const value = getValueWithPath(session, rule.requestType)
    const reducedValue = reduceToType(value, rule.dataType)

    const mappedValue = rule.mapFunction ? rule.mapFunction(reducedValue) : reducedValue

    if (value !== undefined) {
      Object.assign(resultObject, { [key]: mappedValue })
    }
  })

  return resultObject
}
