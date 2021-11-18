import { isEqual } from "underscore"


export const pickFirst = ([value1, value2], type) => {

  if (type === 'arrays') {
    if (Array.isArray(value1) && value1.length) {
      return value1
    }
    return value2
  }

  if (value1 !== undefined && value1 !== null) {
    return value1
  }
  return value2
}

export const bringToFormVehicle = (reduxVehicle) => {
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

export const findPriceForAddons = (formAddons, reduxAddonList) => {
  if (!formAddons || !Object.keys(formAddons).length || !reduxAddonList?.length) return []

  const resultArray = []

  for (const key in formAddons) {
    const formAddon = formAddons[key]
    const searchId = formAddon.addon_id

    const reduxAddon = reduxAddonList.find(rdAddon => {
      return Number(rdAddon.addon_id) === Number(searchId)
    })

    if (reduxAddon.price) {
      Object.assign(formAddon, { price: Number(reduxAddon.price), name: reduxAddon.name })
    }

    resultArray.push(formAddon)
    console.log(44444444, formAddon)
  }

  return resultArray
  // addonList: [
  //   {
  //     addon_id: '1',
  //     name: 'Toddler or Baby Seat',
  //     description: 'Toddler or Baby Seat Description',
  //     image: 'https://sjd-taxi.requestumdemo.com/wp-content/uploads/2021/11/71wNWtNb0sL._SY355_.jpg',
  //     price: '10'
  //   },
  // ]


}

export const calculateAddonPrices = (addons) => {
  return addons.reduce((prev, next) => {
    if (!next.count) return prev
    return prev + Number(next.count) * Number(next.price)
  }, 0)
}

export const reduceToDate = (value) => {
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

export const mapCouponForDisplay = ({ amount, coupon_id, discount_type }) => {
  if (!amount || !coupon_id || !discount_type) return null

  if (discount_type === "percentage") {
    return amount + '%'
  } else if (discount_type === "flat") {
    return '$' + amount
  }
}

export const countCouponValueObject = ({ amount, coupon_id, discount_type }) => {
  if (!amount || !coupon_id || !discount_type) {
    return { amount: 0, discount_type: 'flat' }
  }

  return { amount: Number(amount), discount_type }
}

export const reduceCouponToFlatValue = ({ amount, coupon_id, discount_type }, displayingPrice) => {
  if (!amount || !coupon_id || !discount_type) return 0

  if (discount_type === 'percentage') {
    return displayingPrice / 100 * amount
  } else if (discount_type === 'flat') {
    return amount
  }
}
