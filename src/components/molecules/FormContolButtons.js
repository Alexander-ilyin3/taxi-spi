import { BackButton, NextButton } from 'components/atoms/NextAndBackButtons'
import { FlexBoxRow } from 'components/atoms/FlexBoxRow'

export const FormControlButtons = ({ backHandle, nextHandle, disableBackButton }) => {
  return (
    <FlexBoxRow styleProps={{
      justifyContent: 'space-between',
    }}>
      <BackButton onClick={backHandle} disableBackButton={disableBackButton}/>
      <NextButton onClick={nextHandle} />
    </FlexBoxRow>
  )
}
