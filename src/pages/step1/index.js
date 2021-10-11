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

const Step1 = () => {
  return (
    <>
      <SiteHeader />
      <StepperComponent />

      <PageContentWrapper>
        <SectionWrapper>
          <SectionBox>
            <T variant='h1'> Service Selection </T>
            <CheckBoxLabelBox labelText={'My Destination/Departure is a AirBNB/VRBO/Rental Property'}>
              <InputBox disabled />
              <T variant="secondaryText">*Shared Shuttle is not allowed to go to any AirBNB, VRBO or Rental Property</T>
            </CheckBoxLabelBox>
            <FlexBoxRow>
              <InputBox r labelText="Pickup Location"  labelErrorText="Field must be filled" error />
              <InputBox r labelText="Destination" labelErrorText="Field must be filled" error />
            </FlexBoxRow>
            <InputNumberBox r labelText="How many people are you travelling with (including yourself)?"></InputNumberBox>
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
