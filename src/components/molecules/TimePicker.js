import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TimePicker as MuiTimePicker, LocalizationProvider } from "@mui/lab"
import { TextField, Typography as T } from "@mui/material"
import { Box } from "@mui/system"
import { Controller, useFormContext } from "react-hook-form"
import { useState } from 'react'

import { LabelError } from "components/atoms/LabelError"
import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"

export const TimePicker = ({ name, r, labelErrorText, labelText }) => {
  const { control } = useFormContext()
  const [ validTime, setValidTime ] = useState(true)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        control={control}
        name={name}
        defaultValue={null}
        shouldUnregister={true}
        rules={{ validate: (value) => validTime, required: true }}
        render={({
          field: { onChange, value },
          fieldState: { invalid }
        }) => (
          <MuiTimePicker
            onChange={onChange}
            value={value || null}
            // ignoreInvalidInputs
            onError={(e) => setValidTime(!e)}
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
                  helperText={invalid && <LabelError labelErrorText={labelErrorText} />}
                  {...params}
                  value={params.inputProps.value}
                  error={invalid}
                />
              </Box>
            )}
          />
        )}
      />
    </LocalizationProvider>
  )
}
