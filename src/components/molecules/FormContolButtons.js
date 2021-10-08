import { BackButton, NextButton } from 'components/atoms/NextAndBackButtons'
import { FlexBoxRow } from 'components/atoms/FlexBoxRow'

export const FormControlButtons = () => {
  return (
    <FlexBoxRow styleProps={{
      justifyContent: 'space-between',
    }}>
      <BackButton />
      <NextButton />
    </FlexBoxRow>
  )
}