import { Typography as T } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { SectionBox } from 'components/atoms/SectionBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import StepperComponent from 'components/molecules/Stepper'
import { FormControlButtons } from 'components/molecules/FormContolButtons'
import { SectionWrapper } from 'components/atoms/SectionWrapper'
import { OrderSummaryContainer } from 'components/molecules/OrderSummaryContainer'
import { PageContentWrapper } from 'components/atoms/PageContentWrapper'
import { OrderSummaryPlug } from 'components/atoms/OrderSummaryPlug'
import { SiteFooter } from 'components/molecules/SiteFooter'
import { SubSection } from 'components/molecules/SubSection'
import { NotesSection } from 'components/molecules/NotesSection'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { setGlobalStepsData, setStep3Data } from 'redux/actions'
import { getStep3 } from 'redux/selectors/step1.selectors'
import { isEqual } from 'underscore'
import { useResetForm } from 'helpers/resetForm'
import { useApiCall } from 'helpers/customHooks'
import { session } from 'api/sessionApi'
import { getDestinationIsAirport, getIsCustomDestination, getIsRoundTrip, getLocationIsAirport } from 'redux/selectors'
import { defaultValues } from 'formDefaultValues'
import { mapStateToParams } from 'helpers/mapStateForUpdateCart'
import { stepHistoryHelper } from 'helpers/stepsButtonHelper'

const getDefaultVariantName = ({ departureIsAirport, arrivalIsAirport }) => {
  if (departureIsAirport && arrivalIsAirport) {
    return 'bothIsAirport'
  } else if (departureIsAirport && !arrivalIsAirport) {
    return 'destinationIsAirport'
  } else if (!departureIsAirport && arrivalIsAirport) {
    return 'locationIsAirport'
  } else if (!departureIsAirport && !arrivalIsAirport) {
    return 'noneIsAirport'
  }
}

const Step3 = () => {
  const { watch, formState, setValue, reset, setError } = useFormContext()
  const [reseted, setReseted] = useState(false)
  const state = useSelector(getStep3, isEqual)
  const isCustomDestinationRedux = useSelector(getIsCustomDestination, isEqual)
  const departureIsAirport = useSelector(getDestinationIsAirport)
  const isRoundTrip = useSelector(getIsRoundTrip)
  const arrivalIsAirport = useSelector(getLocationIsAirport)

  const defaultVarianName = getDefaultVariantName({ departureIsAirport, arrivalIsAirport })
  const defaults = defaultValues[3][defaultVarianName]

  useApiCall({ handler: session.getSession, action: setGlobalStepsData })
  useResetForm({ state, defaults, keepDirty: true })

  const selectedCar = watch('selectedCar')
  const oneSeatAllowed = selectedCar?.oneSeatAllowed

  const dispatch = useDispatch()
  const history = useHistory()
  const { handleSubmit } = useFormContext()

  const onSubmit = async (data, e) => {
    const mappedForParams = mapStateToParams(data)
    const sessionResponse = await session.updateSession(mappedForParams)

    if (sessionResponse && sessionResponse.booking_date_error) {
      setError("bookinglTime", {
        type: "manual",
        message: sessionResponse.booking_date_error,
      })
      return
    }
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

  // if (!reseted) return null //TODO

  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={2} />
      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox>
            <T variant='h1'>
              {(departureIsAirport || arrivalIsAirport) ? (
                'Flight Details'
              ) : (
                'Booking Details'
              )}
            </T>
            <SubSection arrival={arrivalIsAirport} departure={departureIsAirport || isRoundTrip} />
            <NotesSection />
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

export default Step3
