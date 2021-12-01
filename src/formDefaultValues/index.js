export const defaultValues = {
  1: {
    pickupLocation: null,
    destinationLocation: null,
    isCustomDestination: false,
    numberOfPassengers: '1',
    // roadTripReservation: false,
  },
  3: {
    locationIsAirport: {
      arrivalAirline: "",
      bookingDate: null,
      arrivalFlightNumber: "",
      bookinglTime: null,
      bookingDetailsNotes: "",
    },
    destinationIsAirport: {
      bookingDetailsNotes: "",
      departureAirline: "",
      departureDate: null,
      departureFlightNumber: "",
      departureTime: null,
    },
    bothIsAirport: {
      arrivalAirline: "",
      arrivalDate: null,
      arrivalFlightNumber: "",
      arrivalTime: null,
      bookingDetailsNotes: "",
      departureAirline: "",
      departureDate: null,
      departureFlightNumber: "",
      departureTime: null,
    },
    noneIsAirport: {
      bookingDate: null,
      bookingDetailsNotes: '',
      bookinglTime: null,
    }
  },
  4: {
    Addon: {}
  },
  5: {
    additionalPhone: "",
    address: "",
    address2: "",
    city: "",
    confirmEmailAddress: "",
    // country: null,
    emailAddress: "",
    firstName: "",
    lastName: "",
    mobilePhone: "",
    postalCode: "",
    // state: null,
  },
  6: {
    couponCode: "",
    paymentVariant: null,
    termsAndCondition: false,
  }
}

// export const defaultValuesFor = (step) => {
//   switch (step) {
//     case 1:
//       return {
//         pickupLocation: null,
//         destinationLocation: null,
//         isCustomDestination: false,
//         numberOfPassengers: '1',
//         roadTripReservation: false,
//       }

//     case 4:
//       return {

//       }

//     default:
//       throw new Error('No case for defaultValues')
//   }
// }
