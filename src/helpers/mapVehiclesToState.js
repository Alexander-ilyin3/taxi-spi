import { getIsRoundTrip } from "redux/selectors/global.selectors"
import { ReactReduxContext } from 'react-redux'

export const mapVehiclesToState = (responseVehicles, isRoundTrip) => {

  if (!responseVehicles || !responseVehicles.length) return []

  // const isRoundTrip = parseFloat(roundTripNumber) === 0 || parseFloat(roundTripNumber) === 1 ? Boolean(parseFloat(roundTripNumber)) : undefined
  if (isRoundTrip === undefined) return []


  const cutPrefix = (value) => {

    if (process.env.NODE_ENV === 'development') {
      return value.replace('https://sjd-taxi.requestumdemo.com', '')
    }

    return value
  }

  const mappedVehicles = responseVehicles.map(vehicle => {


    return {
      carName: vehicle.name,
      price: isRoundTrip ? parseFloat(vehicle.roundtrip_price) : parseFloat(vehicle.oneway_price),
      vehicleId: vehicle.vehicle_id,
      numberOfSeats: parseFloat(vehicle.passenger_limit),
      picturePath: cutPrefix(vehicle.image),
      oneSeatAllowed: false, // vehicle.type === 'shuttle' ? true : false, // the rule has been cancelled 
      noMoreThenAmountOfPeople: vehicle.type === 'shuttle' ? Number(vehicle.passenger_limit) : null
    }
  })

  console.log('mapped -------- vehicles -------- , ', mappedVehicles)
  return mappedVehicles
  // image: "https://sjd-taxi.requestumdemo.com/wp-content/uploads/2021/09/land-rover-range-rover-sport-2021.jpg"
  // name: "Range Rover Sport"
  // oneway_price: "200"
  // passenger_limit: "3"
  // roundtrip_price: "300"
  // type: "Private"
  // vehicle_id: "1"

}