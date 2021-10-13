import { Typography as T } from '@mui/material'

const LabelError = ({labelErrorText}) => {

  return (
    <T variant='labelErrorText'>{labelErrorText || 'The field is required'}</T>
  )
}

export { LabelError }