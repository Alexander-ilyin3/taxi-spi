import { Typography as T } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'

import { SectionBox } from 'components/atoms/SectionBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import { StepperComponent } from 'components/molecules/Stepper'
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

const Step6 = () => {
  const steps = ['Service Selection', 'Vehicle Selection', 'Flight Details', 'Select Add-Ons', 'Contact Information', 'Billing Information']
  /*//TODO display appropriate step name*/
  const { watch, formState, setValue } = useFormContext()

  useEffect(() => {
    setValue('numberOfPassengers', "5")
    setValue('selectedCar', { "carName": "Nissan Pathfinder", "price": 25, "numberOfSeats": 1, "picturePath": "images/cars/Nissan Pathfinder.png", "index": 1 }) //TODO test data
    setValue('arrivalDate', new Date())
    setValue('arrivalTime', new Date())
    setValue('departureDate', new Date())
    setValue('departureTime', new Date())
  }, [])

  const selectedCar = watch('selectedCar')
  const oneSeatAllowed = selectedCar?.oneSeatAllowed

  const { arrivalIsAirport, departureIsAirport } = { arrivalIsAirport: true, departureIsAirport: true } //TODO test data

  const cardsData = testAddons
  console.log(cardsData[0].src)
  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={5} steps={steps} />
      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox>
            <T variant='h1'> Billing Information </T>
            <T variant='h5md' >Please enter in address that will match the billing card you are using</T>
            <OrderSummaryContainer selectedCar={selectedCar} oneSeatAllowed={oneSeatAllowed} page6Variant>
              <OrderSummaryPlug />
            </OrderSummaryContainer>
            <CouponSection />
            <FlexBoxRow>
              <InputBox name={'nameOnCard'} labelText="Name (as it appears on card)" r />
              <InputBox name={'cardNumber'} labelText="Card Number" r />
            </FlexBoxRow>
            <FlexBoxRow>
              <InputBox name={'cardExpMonth'} labelText="Exp. Month" r />
              <InputBox name={'cardExpYear'} labelText="Exp. Year" r />
              <InputBox name={'cvcCode'} labelText="CVC" r />
            </FlexBoxRow>
            <CheckBoxLabelBox labelText={'I Agree to the SJD Taxi Terms & Conditions'} name="termsAndCondition" r>
              <T variant="secondaryText">View Our Terms &amp; Conditions</T>
            </CheckBoxLabelBox>
          </SectionBox>
          <FormControlButtons />
        </SectionWrapper>
        <OrderSummaryContainer selectedCar={selectedCar} oneSeatAllowed={oneSeatAllowed}>
          <OrderSummaryPlug />
        </OrderSummaryContainer>
      </PageContentWrapper>
      <SiteFooter />
    </>
  )
}

export default Step6
