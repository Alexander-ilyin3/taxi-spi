import { useFormContext } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { isEqual } from 'underscore'
import { Typography as T } from '@mui/material'

import { FlexBoxRow } from 'components/atoms/FlexBoxRow'
import { SectionBox } from 'components/atoms/SectionBox'
import { CheckBoxLabelBox } from 'components/molecules/CheckBoxLabelBox'
import { InputBox } from 'components/molecules/InputBox'
import { InputNumberBox } from 'components/molecules/InputNumberBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import StepperComponent from 'components/molecules/Stepper'
import { FormControlButtons } from 'components/molecules/FormContolButtons'
import { SectionWrapper } from 'components/atoms/SectionWrapper'
import { OrderSummaryContainer } from 'components/molecules/OrderSummaryContainer'
import { PageContentWrapper } from 'components/atoms/PageContentWrapper'
import { OrderSummaryPlug } from 'components/atoms/OrderSummaryPlug'
import { SiteFooter } from 'components/molecules/SiteFooter'
import { LocationInputSelect } from 'components/molecules/LocationInputSelect'

import { setGlobalStepsData } from 'redux/actions'
import { getStep1 } from 'redux/selectors'

import { locations } from 'api/locationsApi'
import { session } from 'api/sessionApi'

import { mapStateToParams } from 'helpers/mapStateForUpdateCart'
import { useResetForm } from 'helpers/resetForm'
import { useApiCall } from 'helpers/customHooks'
import { defaultValues, defaultValuesFor } from 'formDefaultValues'
import { useEffect } from 'react'

const Step1 = () => {

  const { watch, handleSubmit, setValue } = useFormContext()
  const history = useHistory()

  const defaults = defaultValues[1]
  const state = useSelector(getStep1, isEqual)
  // console.log({state})
  useResetForm({ state, defaults })

  const locationIsAirport = watch('pickupLocation')?.is_airport === '1' ? true : false
  // reset()

  useEffect(() => {
    if ( !locationIsAirport ) {
      setValue('roadTripReservation', false)
    }
  }, [locationIsAirport])

  const { result: locationsResult = [] } = useApiCall({ handler: locations.getLocations })
  useApiCall({ handler: session.getSession, action: setGlobalStepsData })

  const isCustomDestination = watch('isCustomDestination')

  const onSubmit = async (data, e) => {
    const mappedForParams = mapStateToParams(data)

    await session.updateSession(mappedForParams)

    history.push('step-2')
  }

  const onError = (errors, e) => console.log('error submitting', errors, e)

  const nextHandle = () => {
    handleSubmit(onSubmit, onError)()
    console.log('next clicked')
  }

  const backHandle = () => {
    console.log('back clicked')
  }

  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={0} />
      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox>
            <T variant='h1'> Service Selection </T>
            <CheckBoxLabelBox labelText={<>My Destination/&#8203;Departure is a AirBNB/&#8203;VRBO/&#8203;Rental Property</>} name={'isCustomDestination'}>
              {
                isCustomDestination ? (
                  <InputBox name={'customDestination'} r />
                ) : (
                  <InputBox disabled />
                )
              }
              <T variant="secondaryText" sx={{marginTop: '15px'}}>*Shared Shuttle is not allowed to go to any AirBNB, VRBO or Rental Property</T>
            </CheckBoxLabelBox>
            <FlexBoxRow>
              {isCustomDestination ? (
                <>
                  <InputBox disabled labelText="Pickup Location" />
                  <InputBox disabled labelText="Destination" />
                </>
              ) : (
                <>
                  <LocationInputSelect name={'pickupLocation'} autocompleteData={locationsResult} labelText="Pickup Location" r />
                  <LocationInputSelect name={'destinationLocation'} autocompleteData={locationsResult} labelText="Destination" r />
                </>
              )}
            </FlexBoxRow>
            <InputNumberBox r labelText="How many people are you travelling with (including yourself)?" name={'numberOfPassengers'} labelErrorText={'The field cannot be empty'}></InputNumberBox>
            {locationIsAirport &&
              <CheckBoxLabelBox labelText={'Make this a Round-Trip Reservation'} name="roadTripReservation">
                <T variant="secondaryText">Save yourself a travel headache! we’ll pick you from the destination we dropped you off at, and take you to the airport 3 hours before flight’s departure!</T>
              </CheckBoxLabelBox>}
          </SectionBox>
          <FormControlButtons backHandle={backHandle} nextHandle={nextHandle} disableBackButton />
        </SectionWrapper>
        <OrderSummaryContainer >
          <OrderSummaryPlug />
        </OrderSummaryContainer>
      </PageContentWrapper>
      <SiteFooter />
    </>
  )
}

export default Step1
