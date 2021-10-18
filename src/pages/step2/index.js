import { Typography as T } from '@mui/material'
import { useFormContext } from 'react-hook-form'

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
import { CarCardsSection } from 'components/molecules/CarCardsSection'


const Step2 = () => {
  const steps = ['Service Selection', 'Vehicle Selection', 'Select Add-Ons', 'Contact Information', 'Billing Information']
  const { watch } = useFormContext()
  const selectedCar = watch('selectedCar')
  const oneSeatAllowed = selectedCar?.oneSeatAllowed

  return (
    <>
      <SiteHeader />
      <StepperComponent activeStep={1} steps={steps}/>

      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox addSx={{
            // paddingRight: '7%',
            // paddingLeft: '7%'
          }}>
            <T variant='h1'> Vehicle Selection </T>
            <InputNumberBox r labelText="Number of passengers" name={'numberOfPassengers'} labelErrorText={'The field cannot be empty'} selectedCar={selectedCar}></InputNumberBox>
            <CarCardsSection />
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

export default Step2
