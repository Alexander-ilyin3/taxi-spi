import { Button, ButtonBase, Typography as T } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { useTheme } from '@mui/system'

import { SectionBox } from 'components/atoms/SectionBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import StepperComponent from 'components/molecules/Stepper'
import { SectionWrapper } from 'components/atoms/SectionWrapper'
import { PageContentWrapper } from 'components/atoms/PageContentWrapper'
import { CongratsWrapper } from 'components/atoms/CongratsWrapper'
import { SiteFooter } from 'components/molecules/SiteFooter'
import { testAddons } from 'testData/testAddons'
import { useSelector } from 'react-redux'
import { getBookingId } from 'redux/selectors'
import { reduceIconPath } from 'helpers/reduceIconPath'
import { useApiCall } from 'helpers/customHooks'
import { session } from 'api/sessionApi'
import { setGlobalStepsData } from 'redux/actions'
import { useHistory } from 'react-router'

const Step7 = () => {
  const steps = ['Service Selection', 'Vehicle Selection', 'Flight Details', 'Select Add-Ons', 'Contact Information', 'Billing Information']
  /*//TODO display appropriate step name*/
  const { watch, formState, setValue } = useFormContext()
  const history = useHistory()
  useApiCall({ handler: session.getSession, action: setGlobalStepsData })

  const bookingId = useSelector(getBookingId)
  const selectedCar = watch('selectedCar')
  const oneSeatAllowed = selectedCar?.oneSeatAllowed

  const { arrivalIsAirport, departureIsAirport } = { arrivalIsAirport: true, departureIsAirport: true } //TODO test data
  const cardsData = testAddons

  const { palette: { primary: { blue, white }, secondary: { darkGrey } } } = useTheme()
  const onClick = () => {
    history.push('step-1')
  }

  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={6} steps={steps} />
      <PageContentWrapper>
        <SectionWrapper fullWidth>
          <SectionBox>
            <CongratsWrapper>
              <img src={reduceIconPath("images/CongratsCkeckmark.svg")}></img>
              <T variant='h5rg' sx={{ color: darkGrey }}>Reservation #{bookingId}</T>
              <T variant='h1' sx={{ textAlign: 'center' }}> Your Reservation has been created successfully </T>
              <T variant='h5md' sx={{ textAlign: 'center' }}> Reservation details  have been sent to your email.</T>
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
                onClick={onClick}
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
