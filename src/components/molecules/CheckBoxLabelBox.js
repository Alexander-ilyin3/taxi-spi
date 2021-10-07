import { Box } from "@material-ui/system"
import { FormControlLabel } from "@mui/material"
import { CheckBoxComponent } from "components/atoms/CheckBoxComponent"
import { Label } from "components/atoms/InputLabel"
import { Typography as T } from '@material-ui/core'

export const CheckBoxLabelBox = ({ labelText, children }) => {
  console.log('children in checkboxLabel', children)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FormControlLabel control={<CheckBoxComponent />} label={<T variant='h5md'>{labelText}</T>} />
      <Box
        sx={{
          marginLeft: 3,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
