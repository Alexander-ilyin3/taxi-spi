import { Typography as T } from '@material-ui/core'
import { InputBox } from 'components/molecules/InputBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'
import { StepperComponent } from 'components/molecules/Stepper'

const Step1 = () => {
  return (
    <>
      <SiteHeader />
      <StepperComponent />
      <T variant='h111' component='span'> Page one eee</T>
      <InputBox labelText="Label text" labelErrorText="Field must be filled" error />
      <InputBox r labelText="Label second text" />
      <InputBox r labelText="Label 333 text" />
    </>
  )
}

export default Step1
