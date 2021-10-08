import { Box } from "@material-ui/system"
import { Typography as T, useTheme } from '@material-ui/core'

import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { LabelError } from "components/atoms/LabelError"
import { InputNumber } from "components/atoms/InputNumber"

const InputNumberBox = ({ labelText, labelErrorText, r, error, disabled }) => {
  const theme = useTheme()
  
  return (
    <Box >
      <Label sx={{marginBottom: 2}}>
        { r && <RequiredStar /> }
        <T variant='h5md' >
          {labelText}
        </T>
      </Label>
      <InputNumber />
      { error && <LabelError labelErrorText={labelErrorText}/>}
    </Box>
  )
}

export { InputNumberBox }
