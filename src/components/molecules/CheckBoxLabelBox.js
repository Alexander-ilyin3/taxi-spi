import { Box } from "@material-ui/system"
import { FormControlLabel } from "@mui/material"
import { CheckBoxComponent } from "components/atoms/CheckBoxComponent"
import { Label } from "components/atoms/InputLabel"
import { Typography as T } from '@material-ui/core'
import { Controller, useFormContext } from "react-hook-form"

export const CheckBoxLabelBox = ({ labelText, children, name }) => {
  const { control } = useFormContext()

  console.log('children in checkboxLabel', children)
  return (
    <Controller
      name={name}
      control={control}
        render={({ field: { onChange, value = true} }) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FormControlLabel control={<CheckBoxComponent onChange={onChange} checked={value} />}
            label={<T variant='h5md'>{labelText}</T>} />
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
      )}
    >



    </Controller>
  )
}
