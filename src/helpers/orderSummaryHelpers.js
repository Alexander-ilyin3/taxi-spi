import { isEqual } from "underscore"


export const pickFirst = ([value1, value2]) => {
  if (value1 !== undefined && value1 !== null) {
    return value1
  }
  return value2
}

export const bringToFormVehicle = (reduxVehicle) => {
  console.log({ reduxVehicle })
  if (reduxVehicle && !isEqual(reduxVehicle, {})) {
    return {
      carName: reduxVehicle.name,
      numberOfSeats: Number(reduxVehicle.passenger_limit),
      vehicle_count: reduxVehicle.vehicle_count,
      price: Number(reduxVehicle.price),
      vehicleId: String(reduxVehicle.vehicle_id)
    }
  }

  return null

  //   name: "Range Rover Sport"
  // passenger_limit: "3"
  // price: "300"
  // vehicle_count: 1
  // vehicle_id: 1

  // carName: "Range Rover Sport"
  // numberOfSeats: 3
  // oneSeatAllowed: false
  // picturePath: "/wp-content/uploads/2021/09/land-rover-range-rover-sport-2021.jpg"
  // price: 300
  // vehicleId: "1"
}
