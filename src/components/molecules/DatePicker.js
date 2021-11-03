import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePicker as MuiDatePicker, LocalizationProvider } from "@mui/lab"
import { TextField, Typography as T } from "@mui/material"
import { Box } from "@mui/system"
import { Controller, useFormContext } from "react-hook-form"
import { useEffect, useState } from 'react'

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
        defaultValue={null}
        shouldUnregister={true}
        rules={{ required: true, validate: { minDate: (value) => value > new Date() } }}
        render={({
          field: { onChange, value },
          fieldState: { invalid },
        }) => {
          return <MuiDatePicker
            onChange={onChange}
            ignoreInvalidInputs
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
                  helperText={(invalid) && <LabelError labelErrorText={'Please, enter a valid date'} />}
                  {...params}
                  value={params.inputProps.value}
                  error={invalid}
                />
              </Box>
            )}
          />
        }}
      />
    </LocalizationProvider>
  )
}
