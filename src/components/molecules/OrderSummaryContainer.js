import {
  Paper,
  Typography as T,
  Typography,
  Drawer,
  Button,
  SwipeableDrawer,
  CircularProgress,
  IconButton
} from "@mui/material"
import { makeStyles } from '@mui/styles'
import { Box, useTheme } from "@mui/system"
import { createRef, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { FlexBoxRow } from "components/atoms/FlexBoxRow"
import { Close } from '@mui/icons-material'
import {
  bringToFormVehicle,
  calculateAddonPrices,
  countCouponValueObject,
  findPriceForAddons,
  mapCouponForDisplay,
  pickFirst,
  reduceCouponToFlatValue,
  reduceToDate
} from "helpers/orderSummaryHelpers"
import { useSelector } from "react-redux"
import {
  getDestination,
  getLocation,
  getNumberOfPassengers,
  getIsRoundTrip,
  summaryGetSelectedVehicle,
  summaryGetSelectedAddons,
  summaryGetCouponObject,
  getFee,
  getTotalLoading,
} from "redux/selectors"
import { isEqual } from "underscore"
import { getAddons } from "redux/selectors/global.selectors"
import {
  getArrivalDate,
  getArrivalTime,
  getBookingDate,
  getBookinglTime,
  getDepartureDate,
  getDepartureTime,
} from "redux/selectors/orderSummary.selectors"
import { getIsAirportStates, getSteps } from "redux/selectors"
import { reduceIconPath } from "helpers/reduceIconPath"
import useMediaQuery from '@mui/material/useMediaQuery'
import { useWindowScroll } from 'helpers/customHooks'
import { getMountPoint } from "helpers/shadowRoot"

const useStyles = makeStyles(theme => ({
  mobileTotalButton: {
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    top: '30vh',
    right: '0',
    zIndex: '999',
    height: '58px',
    width: '100px',
    fontSize: '12px',
    borderRadius: '10px 0 0 10px',
    backgroundColor: theme.palette.primary.blue,
    color: theme.palette.primary.white
  },
}))

const SummaryDateElement = ({ data: { date, time, label } }) => {
  const { palette: { primary: { blue } }, breakpoints: { down } } = useTheme()
  const [formattedDate, setFormattedDate] = useState('')
  const [formattedTime, setFormattedTime] = useState('')

  const mobile = useMediaQuery(down('sm'))

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
        {mobile ? (
          <img src={reduceIconPath("images/MobileCalendar.svg")} />
        ) : (
          <img src={reduceIconPath("images/Calendar.svg")} />
        )}

        <T variant="h5sb" color={blue} sx={{ paddingLeft: 1 }}>{label}</T>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <T
          variant="dateTimeSummaryText"
          sx={{
            paddingLeft: '36px'
          }}
        >
          {formattedDate}
        </T>
        <T
          variant="dateTimeSummaryText"
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
    <FlexBoxRow
      styleProps={{
        flexWrap: 'wrap',
        gap: 4,
        flexDirection: 'row'
      }}
    >
      {bookingDate && nothingIsAirport && (
        <SummaryDateElement data={{ date: bookingDate, time: bookinglTime, label: <>Booking&nbsp;Date</> }} />
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
        padding: '16px 30px',
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
            <T variant="h5sb">{addon.name} ({addon.count}) </T>
            <T variant="h5sb" sx={{ color: blue }}>${addon.price || 0}</T>
          </Box>
        )
      })}
    </Box>
  )
}

export const OrderSummaryContainer = ({
  children,
  oneSeatAllowed,
  page6Variant,
  plugForFirstStep,
  notshowOnMobile
}) => {
  const classes = useStyles()
  const { palette: { warning: { main: warning }, secondary: { lightGrayBlue }, primary: { blue, white, grey } }, breakpoints: { down } } = useTheme()
  const { watch } = useFormContext()
  const matches = useMediaQuery(down('sm'))

  //redux values -------
  const numberOfPassengersRedux = useSelector(getNumberOfPassengers, isEqual)
  const isRoundTrip = useSelector(getIsRoundTrip)
  const location = useSelector(getLocation)
  const destination = useSelector(getDestination)
  const reduxSelectedVehicle = bringToFormVehicle(useSelector(summaryGetSelectedVehicle))
  const reduxAddonList = useSelector(getAddons)
  const reduxSelectedAddons = useSelector(summaryGetSelectedAddons)
  const couponObject = useSelector(summaryGetCouponObject, isEqual)
  const fee = useSelector(getFee)
  const isTotalLoading = useSelector(getTotalLoading)
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
  const [feesCount, setFeesCount] = useState(0)
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
    if (isNaN(Number(displayingPrice)) || isNaN(Number(feesCount))) return

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

  const [isMobileTotalOpen, setMobileTotalOpen] = useState(false)


  const renderCloseButton = () => (
    <Box mt="-7px">
      <IconButton onClick={() => setMobileTotalOpen(false)}><Close fontSize="large" /></IconButton>
    </Box>
  )
  const RenderTotal = ({ mobileVariant }) => (
    <Paper
      elevation={page6Variant ? 0 : 10}
      sx={{
        ...(
          page6Variant
            ? {}
            : {
              maxHeight: '100vh',
              position: 'sticky',
              top: 0,
              '&::-webkit-scrollbar': {
                width: 0,
              },
              overflow: 'auto',
            }
        ),
        padding: page6Variant ? '30px' : [2, 4, 6, 8],
        paddingTop: page6Variant ? 4 : 7,
        // width: page6Variant ? '100%' : '40%',
        // width: 100%
        height: 'fit-content',
        display: 'flex',
        flexDirection: "column",
        gap: [2, 4],
        borderRadius: 4,
        border: page6Variant ? `1px solid ${grey}` : 'none',
        // flexGrow: 2,
        flexBasis: '40%',
        ...(mobileVariant && {
          minHeight: '100%',
          borderRadius: '16px 0 0 16px'
        })
      }}
    >
      {page6Variant ? (
        <T variant='h1'>Order Summary</T>
      ) : (
        <Box display="flex" justifyContent="space-between">
          <T variant='h2' sx={{ alignSelf: 'center', color: blue }}>Order Summary</T>
          {mobileVariant && renderCloseButton()}
        </Box>
      )}
      {page6Variant || plugForFirstStep ? null : <SummaryDateComponent />}

      {
        selectedCar && !plugForFirstStep ? (
          oneSeatRuleBroken ? (
            <Box sx={{
              boxSizing: 'border-box',
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
                  padding: '30px'
                }}
              >
                <T
                  variant="h5sb"
                  sx={{ flexGrow: 2 }}
                >
                  {isRoundTrip ? 'Round-trip' : 'One way trip'}
                  {' '}from {location} to {destination}
                </T>
                <T variant="h5sb" sx={{ color: blue, flexGrow: 1 }}>${selectedCar.price.toFixed(2)}</T>
              </Box>
              <Box
                sx={{
                  padding: '0 30px 20px'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <T variant="h5sb" sx={{ color: blue, display: 'block' }}>Number of Passengers:</T>
                  {numberOfPassengers ? (
                    <T variant="h5sb">{numberOfPassengers}</T>
                  ) : (
                    <T variant="h5sb" color={warning}>Please enter the number of passengers</T>
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <T variant="h5sb" sx={{ color: blue, display: 'block' }}>Vehicle Selection:</T>
                  <T variant="h5sb">
                    {numberOfCars > 1 ? (
                      `${selectedCar.carName} (${numberOfCars})`
                    ) : (
                      selectedCar.carName
                    )}
                  </T>
                </Box>
              </Box>
              <AddOnsContainer addonsToDisplay={addonsToDisplay} />
              <Box
                sx={{
                  backgroundColor: blue,
                  color: white,
                  padding: '20px',
                  borderRadius: '20px',
                  position: 'relative'
                }}
              >
                {isTotalLoading && (
                  <Box
                    position="absolute"
                    width="100%"
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    boxSizing="border-box"
                    margin="-20px -20px"
                    borderRadius="20px"
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, .38)'
                    }}
                  >
                    {/* <T variant='h4' color='textSecondary'>Loading...</T> */}
                    <CircularProgress />
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <T variant='h4' color='inherit'>SubTotal</T>
                  <T variant='h5sb' color='inherit'>${fee.subtotal}</T>
                </Box>

                {couponDisplayingAmount && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <T variant='h4' color='inherit'>Coupon Discount</T>
                    <T variant='h5sb' color='inherit'>- {couponDisplayingAmount}</T>
                  </Box>
                )}

                {fee && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <T variant='h4' color='inherit'>Fees ({fee.tax_rate}%)</T>
                    <T variant='h5sb' color='inherit'>${Number(fee.tax)?.toFixed(2)}</T>
                  </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <T variant='h3' color='inherit'>TOTAL</T>
                  <T variant='h3' color='inherit'>${fee.total}</T>
                </Box>
              </Box>
            </Box>
          )
        ) : (
          children
        )
      }
    </Paper >
  )

  if (matches && notshowOnMobile) return null

  if (matches && !page6Variant) return (
    <>
      <Button
        variant="contained"
        onClick={() => setMobileTotalOpen(true)}
        className={classes.mobileTotalButton}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>View&nbsp;Order</span>
          {totalPrice && (
            <T
              sx={{
                fontSize: '14px',
                display: 'block',
                textAlign: 'left'
              }}
            >
              ${totalPrice}
            </T>
          )}

        </Box>
        <Box sx={{ paddingLeft: '5px' }}>
          <img src={reduceIconPath("images/mobileSummaryArrowRight.svg")} alt="checkmark" />
        </Box>
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={isMobileTotalOpen}
        onClose={() => setMobileTotalOpen(false)}
        onOpen={() => setMobileTotalOpen(true)}
        hysteresis={0.2}
        ModalProps={{ container: getMountPoint() }}
        sx={{
          // width: '80% !important',
          // backgroundColor: 'green'
        }}
      >
        <Box
          sx={{
            // backgroundColor: 'green',
            width: '90vw',
            minHeight: '100%'
          }}
        >
          <RenderTotal mobileVariant />
        </Box>
      </SwipeableDrawer>
    </>
  )

  return <RenderTotal />
}
