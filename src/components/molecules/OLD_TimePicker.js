import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TimePicker as MuiTimePicker, LocalizationProvider } from "@mui/lab"
import { createTheme, TextField, ThemeProvider, Typography as T } from "@mui/material"
import { Box } from "@mui/system"
import { Controller, useFormContext } from "react-hook-form"
import { useState } from 'react'

import { LabelError } from "components/atoms/LabelError"
import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { makeStyles } from '@mui/styles'
import { defaultMuiTheme, theme } from 'mui/theme'

export const TimePicker = ({ name, r, labelErrorText, labelText, dateToWatch }) => {
  const { control, watch } = useFormContext()
  const [validTime, setValidTime] = useState(true)

  const isNotToday = (providedDate) => {
    if (!providedDate) return false
    const today = new Date()
    const isToday = (
      providedDate.getFullYear() === today.getFullYear() &&
      providedDate.getMonth() === today.getMonth() &&
      providedDate.getDate() === today.getDate()
    )
    return !isToday
  }

  const choosedDate = watch(dateToWatch)
  const choosedDateIsNotToday = isNotToday(choosedDate)

  return (

    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        control={control}
        name={name}
        defaultValue={null}
        shouldUnregister={true}
        rules={{
          validate: {
            timeValidation: (value) => validTime || 'Time is not valid',
            timeHasPassed: (value) => choosedDateIsNotToday || value > new Date() || 'This time has already passed'
          },
          required: true
        }}
        render={({
          field: { onChange, value },
          fieldState: { invalid, error }
        }) => (
          <ThemeProvider theme={defaultMuiTheme}>
            <MuiTimePicker
              onChange={onChange}
              value={value || null}
              onError={(e) => setValidTime(!e)}
              renderInput={(params) => (
                <ThemeProvider theme={theme}>
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
                      helperText={(invalid || error?.message) && <LabelError labelErrorText={error?.message} />}
                      {...{ ...params, ...{ inputProps: { ...params.inputProps, placeholder: 'hh:mm am|pm' } } }}
                      value={params.inputProps.value}
                      error={invalid}
                    />
                  </Box>
                </ThemeProvider>
              )}
            />
          </ThemeProvider>
        )}
      />
    </LocalizationProvider>

  )
}
