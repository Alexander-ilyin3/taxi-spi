import { Paper, Typography as T, Typography } from "@mui/material"
import { Box, useTheme } from "@mui/system"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { FlexBoxRow } from "components/atoms/FlexBoxRow"
import { bringToFormVehicle, calculateAddonPrices, countCouponValueObject, findPriceForAddons, mapCouponForDisplay, pickFirst, reduceCouponToFlatValue, reduceToDate } from "helpers/orderSummaryHelpers"
import { useSelector } from "react-redux"
import { getDestination, getLocation, getNumberOfPassengers, getIsRoundTrip, summaryGetSelectedVehicle, summaryGetSelectedAddons, summaryGetCouponObject } from "redux/selectors"
import { isEqual } from "underscore"
import { getAddons } from "redux/selectors/global.selectors"
import { getArrivalDate, getArrivalTime, getBookingDate, getBookinglTime, getDepartureDate, getDepartureTime } from "redux/selectors/orderSummary.selectors"
import { getIsAirportStates, getSteps } from "redux/selectors"
import { reduceIconPath } from "helpers/reduceIconPath"

const SummaryDateElement = ({ data: { date, time, label } }) => {
  const { palette: { primary: { blue } } } = useTheme()
  const [formattedDate, setFormattedDate] = useState('')
  const [formattedTime, setFormattedTime] = useState('')

  useEffect(() => {
    if (date instanceof Date) {
      setFormattedDate(
        date.toLocaleString('en', { day: 'numeric' })
        + ' ' + date.toLocaleString('en', { month: 'long' })
        + ', ' + date.toLocaleString('en', { year: "numeric" })
      )
    }

    if (time instanceof Date) {
      setFormattedTime(
        time.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true })
      )
    }
  }, [date, time])

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        <img src={reduceIconPath("images/Calendar.svg")} />
        <T variant="h5sb" color={blue} sx={{ paddingLeft: 1 }}>{label}</T>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <T
          variant="cardLabelText"
          sx={{
            paddingLeft: '36px'
          }}
        >
          {formattedDate}
        </T>
        <T
          variant="cardLabelText"
          sx={{
            paddingLeft: '36px'
          }}
        >
          {formattedTime}
        </T>
      </Box>
    </Box>
  )
}

const SummaryDateComponent = () => {
  const { watch } = useFormContext()

  const isAirportStates = useSelector(getIsAirportStates)
  const locationIsAirport = isAirportStates.locationIsAirport
  const destinationIsAirport = isAirportStates.destinationIsAirport
  const nothingIsAirport = !isAirportStates.locationIsAirport && !isAirportStates.destinationIsAirport
  const isRoundTrip = useSelector(getIsRoundTrip)

  const reduxArrivalDate = reduceToDate(useSelector(getArrivalDate))
  const reduxArrivalTime = reduceToDate(useSelector(getArrivalTime))
  const reduxDepartureDate = reduceToDate(useSelector(getDepartureDate))
  const reduxDepartureTime = reduceToDate(useSelector(getDepartureTime))
  const reduxBookingDate = reduceToDate(useSelector(getBookingDate))
  const reduxBookinglTime = reduceToDate(useSelector(getBookinglTime))

  const formArrivalDate = watch('bookingDate')
  const formArrivalTime = watch('bookinglTime')
  const formDepartureDate = watch('departureDate')
  const formDepartureTime = watch('departureTime')
  const formBookingDate = watch('bookingDate')
  const formBookinglTime = watch('bookinglTime')

  const arrivalDate = pickFirst([formArrivalDate, reduxArrivalDate])
  const arrivalTime = pickFirst([formArrivalTime, reduxArrivalTime])
  const departureDate = pickFirst([formDepartureDate, reduxDepartureDate])
  const departureTime = pickFirst([formDepartureTime, reduxDepartureTime])
  const bookingDate = pickFirst([formBookingDate, reduxBookingDate])
  const bookinglTime = pickFirst([formBookinglTime, reduxBookinglTime])

  return (
    <FlexBoxRow>
      {bookingDate && nothingIsAirport && (
        <SummaryDateElement data={{ date: bookingDate, time: bookinglTime, label: 'Booking Date' }} />
      )}
      {arrivalDate && locationIsAirport && (
        <SummaryDateElement data={{ date: arrivalDate, time: arrivalTime, label: 'Arrival Date' }} />
      )}
      {departureDate && (destinationIsAirport || isRoundTrip) && (
        <SummaryDateElement data={{ date: departureDate, time: departureTime, label: 'Departure Date' }} />
      )}
    </FlexBoxRow>
  )
}

const AddOnsContainer = ({ addonsToDisplay }) => {
  const { palette: { secondary: { lightBlue, lightGrayBlue }, primary: { blue } } } = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: lightBlue,
        borderRadius: '25px 25px 0 0',
        padding: '16px 26px',
        gap: 1
      }}
    >
      {addonsToDisplay.map((addon, i) => {
        if (!addon?.count) return null
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            key={i}
          >
            <T variant="h5sb">{addon.name} (x{addon.count}) </T>
            <T variant="h5sb" sx={{ color: blue }}>${addon.price || 0}</T>
          </Box>
        )
      })}
    </Box>
  )
}

export const OrderSummaryContainer = ({ children, oneSeatAllowed, page6Variant }) => {
  const { palette: { warning: { main: warning }, secondary: { lightGrayBlue }, primary: { blue, white, grey } } } = useTheme()
  const { watch } = useFormContext()

  //redux values -------
  const numberOfPassengersRedux = useSelector(getNumberOfPassengers, isEqual)
  const isRoundTrip = useSelector(getIsRoundTrip)
  const location = useSelector(getLocation)
  const destination = useSelector(getDestination)
  const reduxSelectedVehicle = bringToFormVehicle(useSelector(summaryGetSelectedVehicle))
  const reduxAddonList = useSelector(getAddons)
  const reduxSelectedAddons = useSelector(summaryGetSelectedAddons)
  const couponObject = useSelector(summaryGetCouponObject, isEqual)
  //redux values -------
  const formAddons = watch('Addon')
  const formAddonsWithPrice = findPriceForAddons(formAddons, reduxAddonList)

  const addonsToDisplay = pickFirst([formAddonsWithPrice, reduxSelectedAddons], 'arrays') || []

  const formSelectedCar = watch('selectedCar')

  const addonSummPrice = calculateAddonPrices(addonsToDisplay)


  const selectedCar = pickFirst([formSelectedCar, reduxSelectedVehicle])

  const numberOfPassengers = pickFirst([watch('numberOfPassengers'), numberOfPassengersRedux])
  const [displayingPrice, setDisplayingPrice] = useState()
  const [numberOfCars, setNumberOfCars] = useState()
  const [feesCount, setFeesCount] = useState()
  const [totalPrice, setTotalPrice] = useState()
  const [oneSeatRuleBroken, setOneSeatRuleBroken] = useState()
  const [couponDisplayingAmount, setCouponDisplayingAmount] = useState()
  const [flatCouponAmount, setFlatCouponAmount] = useState(0)

  useEffect(() => {
    if (selectedCar?.numberOfSeats && numberOfPassengers) {
      const passengerCoefficient = numberOfPassengers / selectedCar.numberOfSeats
      setNumberOfCars(Math.ceil(passengerCoefficient))
    }
  }, [selectedCar, numberOfPassengers])

  useEffect(() => {
    if (!selectedCar?.price || !numberOfCars) return

    setDisplayingPrice(selectedCar.price * numberOfCars + addonSummPrice)
  }, [numberOfCars, selectedCar, addonSummPrice])

  useEffect(() => {
    if (displayingPrice) {
      setFeesCount((displayingPrice / 100 * 16))
    }
  }, [displayingPrice])

  useEffect(() => {
    if (!displayingPrice || !feesCount) return

    setTotalPrice((displayingPrice - flatCouponAmount + feesCount).toFixed(2))
  }, [displayingPrice, feesCount, flatCouponAmount])

  useEffect(() => {
    if (oneSeatAllowed && parseFloat(numberOfPassengers) !== 1 && numberOfPassengers !== '') {
      setOneSeatRuleBroken(true)
    } else {
      setOneSeatRuleBroken(false)
    }
  }, [oneSeatAllowed, numberOfPassengers])

  useEffect(() => {
    setCouponDisplayingAmount(mapCouponForDisplay(couponObject))
    setFlatCouponAmount(reduceCouponToFlatValue(couponObject, displayingPrice || 0))
  }, [couponObject, displayingPrice])

  return (
    <Paper elevation={page6Variant ? 0 : 10} sx={{
      padding: page6Variant ? '30px' : [2, 4, 6, 8],
      paddingTop: page6Variant ? 4 : 7,
      width: page6Variant ? '100%' : '40%',
      height: 'fit-content',
      display: 'flex',
      flexDirection: "column",
      gap: [0, 4],
      borderRadius: 4,
      border: page6Variant ? `1px solid ${grey}` : 'none'
    }}>
      {page6Variant ? (
        <T variant='h2' sx={{ alignSelf: 'center', color: blue }}>Order Summary</T>
      ) : (
        <T variant='h1'>Order Summary</T>
      )}
      {page6Variant ? null : <SummaryDateComponent />}

      {selectedCar ? (
        oneSeatRuleBroken ? (
          <Box sx={{
            borderRadius: '20px',
            width: '100%',
            padding: '26px',
            backgroundColor: lightGrayBlue,
          }}
          >
            <T variant='h4' color={warning}>Only one seat allowed for this type of vehicle</T>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: lightGrayBlue,
              borderRadius: '20px',
              // padding: '26px 26px 0 26px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '26px'
              }}
            >
              <T
                variant="h5sb"
                sx={{ flexGrow: 2 }}
              >
                {isRoundTrip ? 'Round-trip' : 'One way trip' + ' '}
                from {location} to {destination}
              </T>
              <T variant="h5sb" sx={{ color: blue, flexGrow: 1 }}>${selectedCar.price.toFixed(2)}</T>
            </Box>
            <Box
              sx={{
                padding: '0 40px 20px'
              }}
            >
              <T variant="h5sb" sx={{ color: blue, display: 'block' }}>QUANTITY OF PASSENGERS:</T>
              {numberOfPassengers ? (
                <T variant="cardLabelText">{numberOfPassengers}</T>
              ) : (
                <T variant="cardLabelText" color={warning}>Please enter the number of passengers</T>
              )}
              <T variant="h5sb" sx={{ color: blue, display: 'block' }}>VEHICLE SELECTION:</T>
              <T variant="cardLabelText">
                {numberOfCars > 1 ? (
                  `${selectedCar.carName} (x${numberOfCars})`
                ) : (
                  selectedCar.carName
                )}
              </T>
            </Box>
            <AddOnsContainer addonsToDisplay={addonsToDisplay} />
            <Box
              sx={{
                backgroundColor: blue,
                color: white,
                padding: '20px',
                borderRadius: '20px'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <T variant='h4' color='inherit'>SubTotal</T>
                <T>${displayingPrice}</T>
              </Box>

              {couponDisplayingAmount && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <T variant='h4' color='inherit'>Coupon</T>
                  <T>- {couponDisplayingAmount}</T>
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <T variant='h4' color='inherit'>Fees (16%)</T>
                <T>${feesCount?.toFixed(2)}</T>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <T variant='h3' color='inherit'>TOTAL</T>
                <T>${totalPrice}</T>
              </Box>
            </Box>
          </Box>
        )
      ) : (
        children
      )}
    </Paper >
  )
}
