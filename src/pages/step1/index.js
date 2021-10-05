import { Typography as Tg } from '@material-ui/core'
import { InputBox } from 'components/molecules/InputBox'
import { SiteHeader } from 'components/molecules/SiteHeader.js'

const Step1 = () => {
  return (
    <>
    <SiteHeader />
      <Tg variant='h111' component='span'> Page one eee</Tg>
      <InputBox labelText="Label text" labelErrorText="Field must be filled" error/>
      <InputBox r labelText="Label second text"/>
    </>
  )
}

export default Step1
