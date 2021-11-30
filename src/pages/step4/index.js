import { Typography as T } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { SectionBox } from 'components/atoms/SectionBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import StepperComponent from 'components/molecules/Stepper'
import { FormControlButtons } from 'components/molecules/FormContolButtons'
import { SectionWrapper } from 'components/atoms/SectionWrapper'
import { OrderSummaryContainer } from 'components/molecules/OrderSummaryContainer'
import { PageContentWrapper } from 'components/atoms/PageContentWrapper'
import { OrderSummaryPlug } from 'components/atoms/OrderSummaryPlug'
import { SiteFooter } from 'components/molecules/SiteFooter'
import { AddOnsSection } from 'components/molecules/AddOnsSection'

import { setAddons, setGlobalStepsData, setStep4Data } from 'redux/actions'
import { getStep4 } from 'redux/selectors/step1.selectors'
import { isEqual } from 'underscore'
import { defaultValues } from 'formDefaultValues'
import { useApiCall } from 'helpers/customHooks'
import { session } from 'api/sessionApi'
import { addons } from 'api/addonsApi'
import { getIsCustomDestination, getSelectedVehicleIdObject } from 'redux/selectors'
import { mapAddonsToUpdateSession } from 'helpers/mapAddonsToUpdateSession'
import { useResetForm } from 'helpers/resetForm'
import { stepHistoryHelper } from 'helpers/stepsButtonHelper'

const Step4 = () => {
  const state = useSelector(getStep4)
  const isCustomDestinationRedux = useSelector(getIsCustomDestination, isEqual )
  /*//TODO display appropriate step name*/
  const { watch, formState, setValue } = useFormContext()
  const [reseted, setReseted] = useState(false)
  const defaults = defaultValues[4]
  const selectedVehicleIdObject = useSelector(getSelectedVehicleIdObject, isEqual)
  // const createAddonsAction = (addonsResult) => {
  //   return setAddons(mapAddonsToState(addonsResult, step1Data.roadTripReservation))
  // }
  const { reFetch: reFecthAddons } = useApiCall({ handler: addons.getAddons, lazy: true, action: setAddons })
  useApiCall({ handler: session.getSession, action: setGlobalStepsData })
  // useResetForm({ state, defaults })

  useEffect(() => {
    if ( !state?.Addon ) return

    for ( const key in state.Addon) {
      const value = state.Addon[key]
      setValue(`Addon.${key}`, value )
    }
  }, [state])

  const selectedCar = watch('selectedCar')
  const oneSeatAllowed = selectedCar?.oneSeatAllowed

  const dispatch = useDispatch()
  const history = useHistory()
  const { handleSubmit, reset } = useFormContext()

  const onSubmit = async (data, e) => {
    const mappedForParams = mapAddonsToUpdateSession(data)
    await session.updateSession({ addons: mappedForParams })

    stepHistoryHelper.next(history, isCustomDestinationRedux)
  }

  useEffect(() => {
    if (selectedVehicleIdObject && JSON.stringify(selectedVehicleIdObject) !== '{}') {
      reFecthAddons({ params: selectedVehicleIdObject })
    }
  }, [selectedVehicleIdObject])

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
    reset({})
    setReseted(true)
  }, [])
  
  if (!reseted) return null //TODO

  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={3} />
      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox>
            <T variant='h1'> Select Add-ons </T>
            <T variant='h5md' >Have extra luggage or want to start your vacation the second you get off the plane? These add-ons are for you!</T>
            <AddOnsSection />
          </SectionBox>
          <FormControlButtons backHandle={backHandle} nextHandle={nextHandle} />
        </SectionWrapper>
        <OrderSummaryContainer selectedCar={selectedCar} oneSeatAllowed={oneSeatAllowed}>
          <OrderSummaryPlug />
        </OrderSummaryContainer>
      </PageContentWrapper>
      <SiteFooter />
    </>
  )
}

export default Step4
