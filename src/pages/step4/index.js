import { Typography as T } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { SectionBox } from 'components/atoms/SectionBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import StepperComponent  from 'components/molecules/Stepper'
import { FormControlButtons } from 'components/molecules/FormContolButtons'
import { SectionWrapper } from 'components/atoms/SectionWrapper'
import { OrderSummaryContainer } from 'components/molecules/OrderSummaryContainer'
import { PageContentWrapper } from 'components/atoms/PageContentWrapper'
import { OrderSummaryPlug } from 'components/atoms/OrderSummaryPlug'
import { SiteFooter } from 'components/molecules/SiteFooter'
import { AddOnsSection } from 'components/molecules/AddOnsSection'
import { testAddons } from 'testData/testAddons' 
import { setStep4Data } from 'redux/actions'

const Step4 = () => {
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
    dispatch(setStep4Data(data))
    history.push('step-5')
  }

  const onError = (errors, e) => console.log('error submitting', errors, e)

  const nextHandle = () => {
    handleSubmit(onSubmit, onError)()
    console.log('next clicked')
  }

  const backHandle = () => {
    console.log('back clicked')
    history.push('step-3')
  }

  const cardsData = testAddons
  console.log(cardsData[0].src)
  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={3} steps={steps} />
      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox>
            <T variant='h1'> Select Add-ons </T>
            <T variant='h5md' >Have extra luggage or want to start your vacation the second you get off the plane? These add-ons are for you!</T>
            <AddOnsSection cardsData={cardsData}/>
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
