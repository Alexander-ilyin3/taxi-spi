import { Paper, Typography as T } from "@mui/material"
import { Box, useTheme } from "@mui/system"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

export const OrderSummaryContainer = ({ children, selectedCar, oneSeatAllowed }) => {
  const { palette: { warning: { main: warning }, secondary: { lightGrayBlue }, primary: { blue, white } } } = useTheme()
  const { watch } = useFormContext()
  const numberOfPassengers = watch('numberOfPassengers')
  const [displayingPrice, setDisplayingPrice] = useState()
  const [numberOfCars, setNumberOfCars] = useState()
  const [feesCount, setFeesCount] = useState()
  const [totalPrice, setTotalPrice] = useState()
  const [oneSeatRuleBroken, setOneSeatRuleBroken] = useState()

  useEffect(() => {
    if (selectedCar?.numberOfSeats && numberOfPassengers) {
      const passengerCoefficient = numberOfPassengers / selectedCar.numberOfSeats
      setNumberOfCars(Math.ceil(passengerCoefficient))
      console.log('number of cars ', numberOfCars)
    }
  }, [selectedCar, numberOfPassengers])

  useEffect(() => {
    if (selectedCar?.price && numberOfCars) {
      setDisplayingPrice(selectedCar.price * numberOfCars)
    }
  }, [numberOfCars, selectedCar])

  useEffect(() => {
    if (displayingPrice) {
      setFeesCount((displayingPrice / 100 * 16))
    }
  }, [displayingPrice])

  useEffect(() => {
    if (displayingPrice && feesCount) {
      console.log('displayingPrice && feesCount', displayingPrice, feesCount)
      setTotalPrice((displayingPrice + feesCount).toFixed(2))
    }
  }, [displayingPrice, feesCount])

  useEffect(() => {
    if (oneSeatAllowed && parseFloat(numberOfPassengers) !== 1 && numberOfPassengers !== '') {
      setOneSeatRuleBroken(true)
    } else {
      setOneSeatRuleBroken(false)
    }
  }, [oneSeatAllowed, numberOfPassengers])

  return (
    <Paper elevation={10} sx={{
      padding: [2, 4, 6, 8],
      paddingTop: 7,
      width: '40%',
      height: 'fit-content',
      display: 'flex',
      flexDirection: "column",
      gap: [0, 4],
      borderRadius: 4,
    }}>
      <T variant='h1'>Order Summary</T>
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
              <T variant="h5sb" sx={{ flexGrow: 2 }}>Round-trip from SJD Airport to Casa Juarez</T>
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
