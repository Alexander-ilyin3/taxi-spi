import { useFormContext } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
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

import { setGlobalStepsData, setVehicles, setVehiclesWereFetched } from 'redux/actions'
import { getCustomDestination, getIfVehiclesWereFetched, getIsCustomDestination, getIsRoundTrip, getSessionLocations, getStep1, getVehicles } from 'redux/selectors'

import { locations } from 'api/locationsApi'
import { session } from 'api/sessionApi'

import { mapStateToParams } from 'helpers/mapStateForUpdateCart'
import { useResetForm } from 'helpers/resetForm'
import { useApiCall } from 'helpers/customHooks'
import { defaultValues, defaultValuesFor } from 'formDefaultValues'
import { useEffect, useState } from 'react'
import { stepHistoryHelper } from 'helpers/stepsButtonHelper'
import { bookingEdit } from 'api/bookingEditApi'
import { getOrderId } from 'helpers/getWindowLocationOrderId'
import { locationsMatchingSession } from 'helpers/locationsMatchingSession'
import { vehicles } from 'api/vehiclesApi'
import { useTheme } from '@mui/system'
import { NoVehiclesErrorComponent } from 'components/molecules/NoVehiclesErrorComponent'
import { GridWrapper } from 'components/atoms/GridWrapper'
import { mapVehiclesToState } from 'helpers/mapVehiclesToState'
import { vehiclesWereFetched } from 'redux/reducers/global.reducers'

const Step1 = () => {

  const { watch, handleSubmit, setValue, unregister } = useFormContext()
  const history = useHistory()
  const dispatch = useDispatch()

  const defaults = defaultValues[1]
  const state = useSelector(getStep1, isEqual)
  const isCustomDestinationRedux = useSelector(getIsCustomDestination, isEqual)
  const customDestinationState = useSelector(getCustomDestination, isEqual)
  useResetForm({ state, defaults })

  const locationIsAirport = watch('pickupLocation')?.is_airport === '1' ? true : false
  const formLocation = watch('pickupLocation')
  const formDestination = watch('destinationLocation')
  const formIsRoadTripReservation = watch('roadTripReservation')

  const sessionLocations = useSelector(getSessionLocations)
  const sessionIsRoundTrip = useSelector(getIsRoundTrip)
  const vehiclesWereFetched = useSelector(getIfVehiclesWereFetched)

  const [noVehiclesError, setNoVehiclesError] = useState(false)
  const vehiclesArrayRedux = useSelector(getVehicles, isEqual)

  useEffect(() => {
    if (!locationIsAirport) {
      setValue('roadTripReservation', false)
    } else if (locationIsAirport && sessionIsRoundTrip) {
      setValue('roadTripReservation', true)
    }
  }, [locationIsAirport])

  useEffect(() => {
    if(customDestinationState) {
      setValue('isCustomDestination', 1)
      setValue('customDestination', customDestinationState)
    }
  }, [customDestinationState])

  const orderId = getOrderId()
  const step1Data = useSelector(getStep1, isEqual)

  const { result: bookingEditResult } = useApiCall({ handler: bookingEdit.checkout, params: { order_id: orderId } })
  const { result: locationsResult = [] } = useApiCall({ handler: locations.getLocations })
  const { reFetch: refetchSession } = useApiCall({ handler: session.getSession, action: setGlobalStepsData, lazy: true })
  const { reFetch: refetchSubmitSession } = useApiCall({ handler: session.updateSession, action: setGlobalStepsData, lazy: true })
  const isCustomDestination = watch('isCustomDestination')

  useEffect(() => {
    if (bookingEditResult || bookingEditResult === 'skip') refetchSession({})
  }, [bookingEditResult])

  const onSubmit = async (data, e) => {
    const mappedForParams = mapStateToParams(data)

    const isLocationsMatchingSession = locationsMatchingSession({
      formDestination,
      formLocation,
      ...sessionLocations,
      sessionIsRoundTrip: sessionIsRoundTrip,
      formIsRoundTrip: formIsRoadTripReservation,
    })

    if (!isLocationsMatchingSession) {
      await refetchSubmitSession({ params: mappedForParams })
    } else {
      await refetchSubmitSession({ params: { passengers: Number(data.numberOfPassengers) } })
    }

    if (!isCustomDestination) {
      const vehiclesResponse = await vehicles.getVehicles({
        pickup_location: data.pickupLocation.location_id,
        destination: data.destinationLocation.location_id
      })

      if (vehiclesResponse?.length > 0) {
        return stepHistoryHelper.next(history, isCustomDestination || isCustomDestinationRedux)
      }

      setNoVehiclesError(true)
    } else {
      setNoVehiclesError(false)
      return stepHistoryHelper.next(history, isCustomDestination || isCustomDestinationRedux)
    }
  }

  const onError = (errors, e) => console.log('error submitting', errors, e)

  const nextHandle = () => {
    handleSubmit(onSubmit, onError)()
  }

  const backHandle = () => {
    // console.log('back clicked')
  }

  return (
    <>
      <SiteHeader />
      <StepperComponent />
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
              <T variant="secondaryText" sx={{ marginTop: '15px' }}>*Shared Shuttle is not allowed to go to any AirBNB, VRBO or Rental Property</T>
            </CheckBoxLabelBox>
            <GridWrapper columnNumber={2}>
              {isCustomDestination ? (
                <>
                  <InputBox disabled labelText="Pickup Location" />
                  <InputBox disabled labelText="Destination" />
                </>
              ) : (
                <>
                  <LocationInputSelect name={'pickupLocation'} autocompleteData={locationsResult} labelText="Pickup Location" r additionalOnChange={() => setNoVehiclesError(false)} />
                  <LocationInputSelect name={'destinationLocation'} autocompleteData={locationsResult} labelText="Destination" r additionalOnChange={() => setNoVehiclesError(false)} />
                </>
              )}
            </GridWrapper>
            <NoVehiclesErrorComponent noVehiclesError={noVehiclesError} />
            <InputNumberBox r labelText="How many people are you travelling with (including yourself)?" name={'numberOfPassengers'} labelErrorText={'The field cannot be empty'}></InputNumberBox>
            {locationIsAirport &&
              <CheckBoxLabelBox labelText={'Make this a Round-Trip Reservation'} name="roadTripReservation">
                <T variant="secondaryText">Save yourself a travel headache! we’ll pick you from the destination we dropped you off at, and take you to the airport 3 hours before flight’s departure!</T>
              </CheckBoxLabelBox>}
          </SectionBox>
          <FormControlButtons backHandle={backHandle} nextHandle={nextHandle} disableBackButton />
        </SectionWrapper>
        <OrderSummaryContainer plugForFirstStep>
          <OrderSummaryPlug />
        </OrderSummaryContainer>
      </PageContentWrapper>
      <SiteFooter />
    </>
  )
}

export default Step1
