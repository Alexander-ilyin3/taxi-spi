import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useStore } from 'react-redux'

import { FlexBoxRow } from 'components/atoms/FlexBoxRow'
import { SectionBox } from 'components/atoms/SectionBox'
import { CheckBoxLabelBox } from 'components/molecules/CheckBoxLabelBox'
import { InputBox } from 'components/molecules/InputBox'
import { InputNumberBox } from 'components/molecules/InputNumberBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import { StepperComponent } from 'components/molecules/Stepper'
import { FormControlButtons } from 'components/molecules/FormContolButtons'
import { SectionWrapper } from 'components/atoms/SectionWrapper'
import { OrderSummaryContainer } from 'components/molecules/OrderSummaryContainer'
import { PageContentWrapper } from 'components/atoms/PageContentWrapper'
import { OrderSummaryPlug } from 'components/atoms/OrderSummaryPlug'
import { SiteFooter } from 'components/molecules/SiteFooter'
import { LocationInputSelect } from 'components/molecules/LocationInputSelect'
import { testDestinationData2, testPickupData2 } from 'testData/testDestinationData'
import { Typography as T } from '@mui/material'

const Step1 = () => {

  const { watch, getValues, formState, handleSubmit } = useFormContext()
  const { dispatch, getState } = useStore()

  const isCustomDestination = watch('isCustomDestination')
  const onSubmit = (data, e) => {
    console.log('Form Submitted', data, e)
    dispatch({type: 'SET_STORE', payload: data })
  }

  const onError = (errors, e) => console.log('error submitting', errors, e)

  const initialSteps = ['Service Selection', 'Vehicle Selection', 'Select Add-Ons', 'Contact Information', 'Billing Information']
  const [steps, setSteps] = useState(initialSteps)

  useEffect(() => {
    const pickupLocation = watch('pickupLocation')
    const destinationLocation = watch('destinationLocation')

    if (pickupLocation?.isAirport || destinationLocation?.isAirport) {
      setSteps(['Service Selection', 'Vehicle Selection', 'Flight Details', 'Select Add-Ons', 'Contact Information', 'Billing Information'])
    } else {
      setSteps(initialSteps)
    }
  }, [formState, watch])

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
      <StepperComponent activeStep={0} steps={steps} />
      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox>
            <T variant='h1'> Service Selection </T>
            <CheckBoxLabelBox r={isCustomDestination ? true : false} labelText={'My Destination/Departure is a AirBNB/VRBO/Rental Property'} name={'isCustomDestination'}>
              {
                isCustomDestination ? (
                  <InputBox name={'customDestination'} />
                ) : (
                  <InputBox disabled />
                )
              }
              <T variant="secondaryText">*Shared Shuttle is not allowed to go to any AirBNB, VRBO or Rental Property</T>
            </CheckBoxLabelBox>
            <FlexBoxRow>
              {isCustomDestination ? (
                <>
                  <InputBox disabled labelText="Pickup Location" />
                  <InputBox disabled labelText="Destination" />
                </>
              ) : (
                <>
                  <LocationInputSelect name={'pickupLocation'} autocompleteData={testPickupData2} labelText="Pickup Location" r />
                  <LocationInputSelect name={'destinationLocation'} autocompleteData={testDestinationData2} labelText="Destination" r />
                </>
              )}
            </FlexBoxRow>
            <InputNumberBox r labelText="How many people are you travelling with (including yourself)?" name={'numberOfPassengers'} labelErrorText={'The field cannot be empty'}></InputNumberBox>
            <CheckBoxLabelBox labelText={'Make this a Round-Trip Reservation'} name="roadTripReservation">
              <T variant="secondaryText">Save yourself a travel headache! we’ll pick you from the destination we dropped you off at, and take you to the airport 3 hours before flight’s departure!</T>
            </CheckBoxLabelBox>
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
