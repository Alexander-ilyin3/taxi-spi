import { Button, ButtonBase, Typography as T } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { useTheme } from '@mui/system'

import { SectionBox } from 'components/atoms/SectionBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import StepperComponent  from 'components/molecules/Stepper'
import { SectionWrapper } from 'components/atoms/SectionWrapper'
import { PageContentWrapper } from 'components/atoms/PageContentWrapper'
import { CongratsWrapper } from 'components/atoms/CongratsWrapper'
import { SiteFooter } from 'components/molecules/SiteFooter'
import { testAddons } from 'testData/testAddons'

const Step7 = () => {
  const steps = ['Service Selection', 'Vehicle Selection', 'Flight Details', 'Select Add-Ons', 'Contact Information', 'Billing Information']
  /*//TODO display appropriate step name*/
  const { watch, formState, setValue } = useFormContext()

  useEffect(() => {
    setValue('numberOfPassengers', "5")
    setValue('selectedCar', { "carName": "Nissan Pathfinder", "price": 25, "numberOfSeats": 1, "picturePath": "images/cars/Nissan Pathfinder.png", "index": 1 }) //TODO test data
    setValue('arrivalDate', new Date())
    setValue('arrivalTime', new Date())
    setValue('departureDate', new Date())
    setValue('departureTime', new Date())
  }, [])

  const selectedCar = watch('selectedCar')
  const oneSeatAllowed = selectedCar?.oneSeatAllowed

  const { arrivalIsAirport, departureIsAirport } = { arrivalIsAirport: true, departureIsAirport: true } //TODO test data
  const cardsData = testAddons

  const { palette: { primary: { blue, white }, secondary: { darkGrey } } } = useTheme()

  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={6} steps={steps} />
      <PageContentWrapper>
        <SectionWrapper fullWidth>
          <SectionBox>
            <CongratsWrapper>
              <img src="CongratsCkeckmark.svg"></img>
              <T variant='h5rg' sx={{ color: darkGrey }}>Reservation #12345678</T>
              <T variant='h1'> Your Reservation has been created successfully </T>
              <T variant='h5md' sx={{ textAlign: 'center' }}> Reservation details  have been sent to your email.<br />To print it click here</T>
              <Button
                sx={{
                  paddingLeft: 6,
                  paddingRight: 6,
                  width: '260px',
                  height: '60px',
                  backgroundColor: blue,
                  color: white,
                  fontWeight: 600,
                  borderRadius: '10px',
                  marginTop: 4,
                }}
              >OK</Button>
            </CongratsWrapper>
          </SectionBox>
        </SectionWrapper>
      </PageContentWrapper>
      <SiteFooter />
    </>
  )
}

export default Step7
