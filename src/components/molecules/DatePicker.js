import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePicker as MuiDatePicker, LocalizationProvider } from "@mui/lab"
import { TextField, Typography as T } from "@mui/material"
import { Box } from "@mui/system"
import { Controller, useFormContext } from "react-hook-form"

import { LabelError } from "components/atoms/LabelError"
import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"

export const DatePicker = ({ name, r, labelErrorText, labelText }) => {
  const { control } = useFormContext()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        shouldUnregister={true}
        rules={{ validate: () => true }}
        render={({
          field: { onChange, value },
          fieldState: { invalid }
        }) => (
          <MuiDatePicker
            onChange={onChange}
            value={value}
            minDate={new Date()}
            renderInput={(params) => (
              <Box sx={{ width: '100%' }}>
                <Label sx={{ marginBottom: 2 }}>
                  <T variant='h5md' >
                    {r && <RequiredStar />}
                    {labelText}
                  </T>
                </Label>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={params.inputProps.value}
                  helperText={invalid && <LabelError labelErrorText={labelErrorText} />}
                  {...params}
                />
              </Box>
            )}
          />
        )}
      />
    </LocalizationProvider>
  )
}