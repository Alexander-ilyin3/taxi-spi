import { Typography as T } from '@material-ui/core'
import { FlexBoxRow } from 'components/atoms/FlexBoxRow'
import { SectionBox } from 'components/atoms/SectionBox'
import { CheckBoxLabelBox } from 'components/molecules/CheckBoxLabelBox'
import { InputBox } from 'components/molecules/InputBox'
import { InputNumberBox } from 'components/molecules/InputNumberBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import { StepperComponent } from 'components/molecules/Stepper'
import { FormControlButtons } from 'components/molecules/FormContolButtons'
import { SectionWrapper } from 'components/atoms/SectionWrapper'
import { OrderSummaryContainer } from 'components/atoms/OrderSummaryContainer'
import { PageContentWrapper } from 'components/atoms/PageContentWrapper'
import { OrderSummaryPlug } from 'components/atoms/OrderSummaryPlug'
import { SiteFooter } from 'components/molecules/SiteFooter'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'

const Step1 = () => {

  const { register, watch, getValues, formState, unregister, reset } = useFormContext()
  const isCustomDestination = watch('isCustomDestination')

  useEffect(() => {
    reset({
      isCustomDestination: false,
      numberOfPassengers: 1
    })
  }, [])

  useEffect(() => {
    console.log(getValues())
  }, [formState, getValues])

  useEffect(() => {
    setTimeout(() => {
      console.log(22222222, getValues())
    }, 5000)
  }, [])

  return (
    <>
      <SiteHeader />
      <StepperComponent />

      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox>
            <T variant='h1'> Service Selection </T>
            <CheckBoxLabelBox labelText={'My Destination/Departure is a AirBNB/VRBO/Rental Property'} name={'isCustomDestination'}>
              {
                isCustomDestination ? (
                  <InputBox name={'customDestination'} />
                ) : (
                  <InputBox disabled />
                )
              }
              <T variant="secondaryText">*Shared Shuttle is not allowed to go to any AirBNB, VRBO or Rental Property</T>
            </CheckBoxLabelBox>
            <FlexBoxRow>
              {isCustomDestination ? (
                <>
                  <InputBox disabled labelText="Pickup Location" />
                  <InputBox disabled labelText="Destination" />
                </>
              ) : (
                <>
                  <InputBox r labelText="Pickup Location" labelErrorText="Field must be filled" />
                  <InputBox r labelText="Destination" labelErrorText="Field must be filled" />
                </>
              )}
            </FlexBoxRow>
            <InputNumberBox r labelText="How many people are you travelling with (including yourself)?" name={'numberOfPassengers'}></InputNumberBox>
          </SectionBox>
          <FormControlButtons />
        </SectionWrapper>
        <OrderSummaryContainer >
          <OrderSummaryPlug />
        </OrderSummaryContainer>
      </PageContentWrapper>
      <SiteFooter />
    </>
  )
}

export default Step1
