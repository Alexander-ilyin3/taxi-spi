import { Typography as T } from '@material-ui/core'
import { FlexBoxRow } from 'components/atoms/FlexBoxRow'
import { SectionBox } from 'components/atoms/SectionBox'
import { CheckBoxLabelBox } from 'components/molecules/CheckBoxLabelBox'
import { InputBox } from 'components/molecules/InputBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import { StepperComponent } from 'components/molecules/Stepper'

const Step1 = () => {
  return (
    <>
      <SiteHeader />
      <StepperComponent />
      <SectionBox>
        <T variant='h1'> Service Selection </T>
        <CheckBoxLabelBox labelText={'My Destination/Departure is a AirBNB/VRBO/Rental Property'}>
          <InputBox disabled/>
          <T variant="secondaryText">*Shared Shuttle is not allowed to go to any AirBNB, VRBO or Rental Property</T>
        </CheckBoxLabelBox>
        <InputBox labelText="Label text" labelErrorText="Field must be filled" error />
        <FlexBoxRow>
          <InputBox r labelText="Label second text" />
          <InputBox r labelText="Label 333 text" />
        </FlexBoxRow>
      </SectionBox>
    </>
  )
}

export default Step1
