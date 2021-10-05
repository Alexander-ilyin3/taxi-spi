import { Box } from "@material-ui/system"
import { Typography as Tg, useTheme } from '@material-ui/core'

import { Input } from "components/atoms/Input"
import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { LabelError } from "components/atoms/LabelError"

const InputBox = ({ labelText, labelErrorText, r, error }) => {
  const theme = useTheme()
  
  return (
    <Box >
      <Label>
        { r && <RequiredStar /> }
        <Tg variant='h5md'>
          {labelText}
        </Tg>
      </Label>
      <Input />
      { error && <LabelError labelErrorText={labelErrorText}/>}
    </Box>
  )
}

export { InputBox }
