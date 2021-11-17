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
import { getDestinationIsAirport, getIsRoundTrip, getLocationIsAirport } from 'redux/selectors'
import { defaultValues } from 'formDefaultValues'
import { mapStateToParams } from 'helpers/mapStateForUpdateCart'

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
  const { watch, formState, setValue, reset } = useFormContext()
  const [reseted, setReseted] = useState(false)
  const state = useSelector(getStep3, isEqual)
  const departureIsAirport = useSelector(getLocationIsAirport)
  const isRoundTrip = useSelector(getIsRoundTrip)
  const arrivalIsAirport = useSelector(getDestinationIsAirport)

  const defaultVarianName = getDefaultVariantName({ departureIsAirport, arrivalIsAirport })
  const defaults = defaultValues[3][defaultVarianName]

  console.log('state for step 3', state, defaults)

  useApiCall({ handler: session.getSession, action: setGlobalStepsData })
  useResetForm({ state, defaults })

  const selectedCar = watch('selectedCar')
  const oneSeatAllowed = selectedCar?.oneSeatAllowed

  const dispatch = useDispatch()
  const history = useHistory()
  const { handleSubmit } = useFormContext()

  const onSubmit = async (data, e) => {
    const mappedForParams = mapStateToParams(data)
    await session.updateSession(mappedForParams)

    history.push('step-4')
  }

  const onError = (errors, e) => console.log('error submitting', errors, e)

  const nextHandle = () => {
    handleSubmit(onSubmit, onError)()
    console.log('next clicked')
  }

  const backHandle = () => {
    console.log('back clicked')
    history.push('step-2')
  }

  // if (!reseted) return null //TODO

  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={2} />
      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox>
            <T variant='h1'> Flight Details </T>
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
