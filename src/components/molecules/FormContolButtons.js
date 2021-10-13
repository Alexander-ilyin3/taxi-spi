import { BackButton, NextButton } from 'components/atoms/NextAndBackButtons'
import { FlexBoxRow } from 'components/atoms/FlexBoxRow'

export const FormControlButtons = ({ backHandle, nextHandle }) => {
  return (
    <FlexBoxRow styleProps={{
      justifyContent: 'space-between',
    }}>
      <BackButton onClick={backHandle} />
      <NextButton onClick={nextHandle} />
    </FlexBoxRow>
  )
}
