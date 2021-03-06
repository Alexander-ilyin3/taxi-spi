import { Typography as T } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
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
import { testAddons } from 'testData/testAddons'
import { FlexBoxRow } from 'components/atoms/FlexBoxRow'
import { InputBox } from 'components/molecules/InputBox'
import { CountryStateInputSelect } from 'components/molecules/CountryStateInputSelect'
import { setCountries, setGlobalStepsData, setStates, setStep5Data } from 'redux/actions'
import { defaultValues } from 'formDefaultValues'
import { getStep5 } from 'redux/selectors/step1.selectors'
import { isEqual } from 'underscore'
import { useApiCall } from 'helpers/customHooks'
import { useResetForm } from 'helpers/resetForm'
import { session } from 'api/sessionApi'
import { countryAndState } from 'api/countryAndStateApi'
import { getCountries, getStates, getSelectedCountryAndState } from 'redux/selectors/global.selectors'
import { mapStateToParams } from 'helpers/mapStateForUpdateCart'
import { setSelectedCountryAndState, clearSelectedCountryAndState } from 'redux/actions/global.actions'
import { PhoneInputNumberBox } from 'components/atoms/PhoneInputNumber'
import { confirmEmailValidate, validateEmail } from 'helpers/validateFunctions'
import { stepHistoryHelper } from 'helpers/stepsButtonHelper'
import { getIsCustomDestination } from 'redux/selectors'
import { booking } from 'api/bookingApi'
import { setBookingId } from 'redux/actions'
import { GridWrapper } from 'components/atoms/GridWrapper'
import { PostalCodeWrapper } from 'components/molecules/PostalCodeWrapper'

const Step5 = () => {
  const { watch, setValue } = useFormContext()
  const state = useSelector(getStep5, isEqual)
  const isCustomDestinationRedux = useSelector(getIsCustomDestination, isEqual)
  const defaults = defaultValues[5]
  const dispatch = useDispatch()
  const states = useSelector(getStates)
  const countries = useSelector(getCountries, isEqual)
  const dynamicCoutnry = watch('country')
  const primaryEmail = watch('emailAddress')
  const { state_id, country_id } = useSelector(getSelectedCountryAndState, isEqual)
  // debugger
  useResetForm({ state, defaults })

  useEffect(() => {
    return () =>  dispatch(clearSelectedCountryAndState())
  }, [])

  const countryToSetActive = useMemo(() => {
    if (countries.length && country_id) {
      return countries.find((countryItem, i) => {
        return Number(countryItem.country_id) === Number(country_id)
      })
    }

    return null
  }, [country_id, countries])

  useEffect(() => {
    if (countryToSetActive) {
      setValue('country', { ...countryToSetActive })
    }

  }, [countryToSetActive])

  const stateToSetActive = useMemo(() => {
    if (states.length && state_id) {
      return states.find((stateItem, i) => {
        return Number(stateItem.state_id) === Number(state_id)
      })
    }

    return null
  }, [state_id, states, country_id])

  useEffect(() => {
    if (stateToSetActive) {
      setValue('state', { ...stateToSetActive })
    }

  }, [stateToSetActive])

  useApiCall({ handler: session.getSession, action: [setGlobalStepsData, setSelectedCountryAndState] })
  useApiCall({ handler: countryAndState.getCountry, action: setCountries })
  const { reFetch: reFetchStates } = useApiCall({ handler: countryAndState.getStates, action: setStates, lazy: true })

  const history = useHistory()
  const { handleSubmit } = useFormContext()

  const onSubmit = async (data, e) => {
    const mappedForParams = mapStateToParams(data)
    await session.updateSession(mappedForParams)

    if (isCustomDestinationRedux) {
      const bookingResponse = await booking.submit()

      if (bookingResponse?.booking_id) {
        dispatch(setBookingId(bookingResponse.booking_id))
        history.push('step-7')
      }
      return
    }

    stepHistoryHelper.next(history, isCustomDestinationRedux)
  }

  const onError = (errors, e) => console.log('error submitting', errors, e)

  const nextHandle = () => {
    handleSubmit(onSubmit, onError)()
  }

  const backHandle = () => {
    stepHistoryHelper.prev(history, isCustomDestinationRedux)
  }

  useEffect(() => {
    if (dynamicCoutnry?.country_id) {
      setValue('state', null)
      reFetchStates({ params: { country_id: dynamicCoutnry.country_id } })
    }
  }, [dynamicCoutnry])

  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={4} />
      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox>
            <T variant='h1'> Contact Information </T>
            <T variant='h5md' >Please enter in address that will match the billing card you are using</T>
            <GridWrapper columnNumber={2}>
              <InputBox name={'firstName'} labelText="First Name" r />
              <InputBox name={'lastName'} labelText="Last Name" r />
            </GridWrapper>
            <GridWrapper columnNumber={2}>
              <InputBox
                name={'emailAddress'}
                labelText="Email Address"
                r
                // validateFunctionObject={{ func: validateEmail, errText: 'Email is not valid' }}
                validateFunctionObject={{ notValidEmail: (v) => validateEmail(v) || 'Email is not valid' }}
              />
              <InputBox
                name={'confirmEmailAddress'}
                labelText="Confirm Email Address"
                r
                validateFunctionObject={{ confirmEmailValidate: (v) => confirmEmailValidate(v, primaryEmail) || 'The confirm email confirmation does not match' }}
              // validateFunctionObject={{ func: (v) => confirmEmailValidate(v, primaryEmail), errText: 'The confirm email confirmation does not match' }}
              />
            </GridWrapper>
            <GridWrapper columnNumber={2}>
              <PhoneInputNumberBox name={'mobilePhone'} labelText="Mobile Phone" r />
              <PhoneInputNumberBox name={'additionalPhone'} labelText="Additional Phone" />
              {/* <InputBox name={'mobilePhone'} labelText="Mobile Phone" r />
              <InputBox name={'additionalPhone'} labelText="Additional Phone" /> */}
            </GridWrapper>
            <GridWrapper columnNumber={3}>
              <CountryStateInputSelect labelText="Country" name="country" autocompleteData={countries} r />
              <InputBox name={'address'} labelText="Address" r />
              <InputBox name={'address2'} labelText="Address 2" />
            </GridWrapper>
            <GridWrapper columnNumber={3}>
              <InputBox name={'city'} labelText="City" r />
              <CountryStateInputSelect labelText="State" name="state" autocompleteData={states} r />
              <PostalCodeWrapper name={'postalCode'} labelText="ZIP/Postal Code" r />
            </GridWrapper>
          </SectionBox>
          <FormControlButtons backHandle={backHandle} nextHandle={nextHandle} />
        </SectionWrapper>
        <OrderSummaryContainer /*selectedCar={selectedCar} oneSeatAllowed={oneSeatAllowed}*/>
          <OrderSummaryPlug />
        </OrderSummaryContainer>
      </PageContentWrapper>
      <SiteFooter />
    </>
  )
}

export default Step5
