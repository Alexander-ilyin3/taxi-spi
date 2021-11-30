import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useFormContext } from 'react-hook-form'
import { isEqual } from 'underscore'
import { Typography as T } from '@mui/material'

import { SectionBox } from 'components/atoms/SectionBox'
import { InputNumberBox } from 'components/molecules/InputNumberBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import StepperComponent from 'components/molecules/Stepper'
import { FormControlButtons } from 'components/molecules/FormContolButtons'
import { SectionWrapper } from 'components/atoms/SectionWrapper'
import { PageContentWrapper } from 'components/atoms/PageContentWrapper'
import { SiteFooter } from 'components/molecules/SiteFooter'
import { CarCardsSection } from 'components/molecules/CarCardsSection'
import { OrderSummaryContainer } from 'components/molecules/OrderSummaryContainer'
import { OrderSummaryPlug } from 'components/atoms/OrderSummaryPlug'

import { setGlobalStepsData, setSelectedVehicle, setVehicles } from 'redux/actions'
import { getIsCustomDestination, getStep1 } from 'redux/selectors'
import { getStep2 } from 'redux/selectors/step1.selectors'

import { vehicles } from 'api/vehiclesApi'
import { session } from 'api/sessionApi'

import { useApiCall } from 'helpers/customHooks'
import { mapSessionToVehiclesRequest } from 'helpers/mapSessionToVehiclesRequest'
import { useResetForm } from 'helpers/resetForm'
import { mapVehiclesToState } from 'helpers/mapVehiclesToState'
import { mapStateToParams } from 'helpers/mapStateForUpdateCart'
import { stepHistoryHelper } from 'helpers/stepsButtonHelper'

const Step2 = () => {
  const { watch } = useFormContext()
  const history = useHistory()
  const { handleSubmit, reset } = useFormContext()
  const dispatch = useDispatch()

  const step1Data = useSelector(getStep1, isEqual)
  const state = useSelector(getStep2, isEqual)
  const isCustomDestinationRedux = useSelector(getIsCustomDestination, isEqual )
  // const vehicles = useSelector(getVehicles, isEqual)
  const createVehiclesAction = (vehiclesResult) => {
    return setVehicles(mapVehiclesToState(vehiclesResult, step1Data.roadTripReservation))
  }

  const { reFetch: reFecthVehicles, result: vehiclesResult = [] } = useApiCall({ handler: vehicles.getVehicles, lazy: true, action: createVehiclesAction })
  useApiCall({ handler: session.getSession, action: [setGlobalStepsData, setSelectedVehicle] })
  useResetForm({ state })

  const selectedCar = watch('selectedCar')

  const onSubmit = async (data, e) => {
    const mappedForParams = mapStateToParams(data)
    await session.updateSession(mappedForParams)
    // reset({})
    stepHistoryHelper.next(history, isCustomDestinationRedux)
  }

  const onError = (errors, e) => console.log('error submitting', errors, e)

  const nextHandle = () => {
    handleSubmit(onSubmit, onError)()

    console.log('next clicked')
  }

  const backHandle = () => {
    console.log('back clicked')

    stepHistoryHelper.prev(history, isCustomDestinationRedux)
  }

  useEffect(() => {
    if (step1Data && JSON.stringify(step1Data) !== '{}') {
      reFecthVehicles({ params: mapSessionToVehiclesRequest(step1Data) })
    }
  }, [step1Data])

  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={1} />

      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox >
            <T variant='h1'> Vehicle Selection </T>
            <InputNumberBox r labelText="Number of passengers" name={'numberOfPassengers'} labelErrorText={'The field cannot be empty'} selectedCar={selectedCar}></InputNumberBox>
            <CarCardsSection />
          </SectionBox>
          <FormControlButtons backHandle={backHandle} nextHandle={nextHandle} />
        </SectionWrapper>
        <OrderSummaryContainer >
          <OrderSummaryPlug />
        </OrderSummaryContainer>
      </PageContentWrapper>
      <SiteFooter />
    </>
  )
}

export default Step2
