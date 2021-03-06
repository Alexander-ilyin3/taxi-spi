import { Typography as T } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
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
import { testAddons } from 'testData/testAddons'
import { CouponSection } from 'components/molecules/CouponSection'
import { FlexBoxRow } from 'components/atoms/FlexBoxRow'
import { InputBox } from 'components/molecules/InputBox'
import { CheckBoxLabelBox } from 'components/molecules/CheckBoxLabelBox'
import { setStep6Data } from 'redux/actions'
import { PaymentRadioSection } from 'components/organisms/PaymentRadioSection'
import { booking } from 'api/bookingApi'
import { setBookingId, setGlobalStepsData } from 'redux/actions/global.actions'
import { useResetForm } from 'helpers/resetForm'
import { defaultValues } from 'formDefaultValues'
import { useApiCall } from 'helpers/customHooks'
import { session } from 'api/sessionApi'
import { payments } from 'api/paymentApi'
import { getIsCustomDestination } from 'redux/selectors'
import { isEqual } from 'underscore'
import { stepHistoryHelper } from 'helpers/stepsButtonHelper'

const Step6 = () => {
  /*//TODO display appropriate step name*/
  const { watch, formState, setValue } = useFormContext()

  const selectedCar = watch('selectedCar')
  const oneSeatAllowed = selectedCar?.oneSeatAllowed

  const defaults = defaultValues[6]

  const { arrivalIsAirport, departureIsAirport } = { arrivalIsAirport: true, departureIsAirport: true } //TODO test data

  const dispatch = useDispatch()
  const history = useHistory()
  const isCustomDestinationRedux = useSelector(getIsCustomDestination, isEqual)
  const { handleSubmit } = useFormContext()

  useApiCall({ handler: session.getSession, action: setGlobalStepsData })
  useResetForm({ defaults })

  const onSubmit = async (data, e) => {

    const bookingResponse = await booking.submit()

    if (bookingResponse?.booking_id) {
      dispatch(setBookingId(bookingResponse.booking_id))
    }

    const paymentsResponse = await payments.submitPaymentMethod({ method: data.paymentVariant })

    if (paymentsResponse !== false) {
      window.location.assign(paymentsResponse)
    }
  }

  const onError = (errors, e) => console.log('error submitting', errors, e)

  const nextHandle = () => {
    handleSubmit(onSubmit, onError)()
  }

  const backHandle = () => {
    stepHistoryHelper.prev(history, isCustomDestinationRedux)
  }

  const cardsData = testAddons
  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={5} />
      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox>
            <T variant='h1'> Billing Information </T>
            <T variant='h5md' >For billing address, please enter in the address that will match the credit card you are using</T>
            <OrderSummaryContainer selectedCar={selectedCar} oneSeatAllowed={oneSeatAllowed} page6Variant>
              <OrderSummaryPlug />
            </OrderSummaryContainer>
            <CouponSection />
            <PaymentRadioSection />
            {/* <FlexBoxRow>
              <InputBox name={'nameOnCard'} labelText="Name (as it appears on card)" r />
              <InputBox name={'cardNumber'} labelText="Card Number" r />
            </FlexBoxRow>
            <FlexBoxRow>
              <InputBox name={'cardExpMonth'} labelText="Exp. Month" r />
              <InputBox name={'cardExpYear'} labelText="Exp. Year" r />
              <InputBox name={'cvcCode'} labelText="CVC" r />
            </FlexBoxRow> */}
            <CheckBoxLabelBox labelText={'I Agree to the SJD Taxi Terms & Conditions'} name="termsAndCondition" r>
              <a target="_blank" href={window.sjd_inline_script?.terms_and_conditions || ''}><T variant="secondaryText">View Our Terms &amp; Conditions</T></a>
            </CheckBoxLabelBox>
          </SectionBox>
          <FormControlButtons backHandle={backHandle} nextHandle={nextHandle} nextButtonText={'Complete Reservation'} />
        </SectionWrapper>
        <OrderSummaryContainer selectedCar={selectedCar} oneSeatAllowed={oneSeatAllowed} notshowOnMobile>
          <OrderSummaryPlug />
        </OrderSummaryContainer>
      </PageContentWrapper>
      <SiteFooter />
    </>
  )
}

export default Step6
