export const getNumberOfPassengers = state => state?.globalStepsData?.passengers 
export const getLocation = state => state?.globalStepsData?.location?.name || ''
export const getDestination = state => state?.globalStepsData?.destination?.name || ''
export const summaryGetSelectedVehicle = state => state?.globalStepsData?.vehicle || {}

// export const 

// globalStepsData: {
//   location: {
//     location_id: 1,
//     name: 'Rancho Paraiso Estates',
//     is_airport: '0',
//     is_areas: '0'
//   },
//   destination: {
//     destination_id: 2,
//     name: 'Lighthouse Point Estates',
//     is_airport: '0',
//     is_areas: '0'
//   },
//   passengers: 1,
//   roundtrip: 0,
//   booking_date: '2021-11-12',
//   booking_time: '11:57',
//   vehicle: {
//     vehicle_id: 1,
//     name: 'Range Rover Sport',
//     price: '200',
//     passenger_limit: '3',
//     vehicle_count: 1
//   },
//   subtotal: 210,
//   total: 210,
//   contact: {
//     firstname: '1',
//     lastname: '2',
//     email: '3',
//     phone: '5',
//     phone2: '6',
//     country_id: 4,
//     state_id: 30,
//     address: '1',
//     address2: '2',
//     city: '3',
//     zip: '123456'
//   },
//   addons: [
//     {
//       addon_id: 1,
//       count: 1,
//       price: '10'
//     }
//   ]
// },
