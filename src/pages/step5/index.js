import { Typography as T } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { SectionBox } from 'components/atoms/SectionBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import { StepperComponent } from 'components/molecules/Stepper'
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
import { setStep5Data } from 'redux/actions'

const Step5 = () => {
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

  const dispatch = useDispatch()
  const history = useHistory()
  const { handleSubmit } = useFormContext()

  const onSubmit = (data, e) => {
    console.log('Form Submitted', data, e)
    dispatch(setStep5Data(data))
    history.push('step-6')
  }

  const onError = (errors, e) => console.log('error submitting', errors, e)

  const nextHandle = () => {
    handleSubmit(onSubmit, onError)()
    console.log('next clicked')
  }

  const backHandle = () => {
    console.log('back clicked')
    history.push('step-4')
  }

  const cardsData = testAddons
  console.log(cardsData[0].src)
  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={4} steps={steps} />
      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox>
            <T variant='h1'> Contact Information </T>
            <T variant='h5md' >Please enter in address that will match the billing card you are using</T>
            <FlexBoxRow>
              <InputBox name={'firstName'} labelText="First Name" r />
              <InputBox name={'lastName'} labelText="Last Name" r />
            </FlexBoxRow>
            <FlexBoxRow>
              <InputBox name={'emailAddress'} labelText="Email Address" r />
              <InputBox name={'confirmEmailAddress'} labelText="Confirm Email Address" r />
            </FlexBoxRow>
            <FlexBoxRow>
              <InputBox name={'mobilePhone'} labelText="Mobile Phone" r />
              <InputBox name={'additionalPhone'} labelText="Additional Phone" />
            </FlexBoxRow>
            <FlexBoxRow>
              <InputBox name={'country'} labelText="Country" r />
              <InputBox name={'address'} labelText="Address" r />
              <InputBox name={'address2'} labelText="Address 2" />
            </FlexBoxRow>
            <FlexBoxRow>
              <InputBox name={'city'} labelText="City" r />
              <InputBox name={'state'} labelText="State/Province" r />
              <InputBox name={'postalCode'} labelText="ZIP/Postal Code" r />
            </FlexBoxRow>
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

export default Step5
