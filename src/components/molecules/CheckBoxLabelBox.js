import { Box, FormControlLabel, Typography as T } from "@mui/material"
import { CheckBoxComponent } from "components/atoms/CheckBoxComponent"
import { Label } from "components/atoms/InputLabel"
import { Controller, useFormContext } from "react-hook-form"

export const CheckBoxLabelBox = ({ labelText, children, name }) => {
  const { control } = useFormContext()

  console.log('children in checkboxLabel', children)
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
        render={({ field: { onChange, value} }) => (
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
