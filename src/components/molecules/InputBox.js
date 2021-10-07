import { Box } from "@material-ui/system"
import { Typography as T, useTheme } from '@material-ui/core'

import { Input } from "components/atoms/Input"
import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { LabelError } from "components/atoms/LabelError"

const InputBox = ({ labelText, labelErrorText, r, error, disabled }) => {
  const theme = useTheme()
  
  return (
    <Box sx={{width: '100%'}}>
      <Label sx={{marginBottom: 2}}>
        { r && <RequiredStar /> }
        <T variant='h5md' >
          {labelText}
        </T>
      </Label>
      <Input disabled={disabled}/>
      { error && <LabelError labelErrorText={labelErrorText}/>}
    </Box>
  )
}

export { InputBox }
