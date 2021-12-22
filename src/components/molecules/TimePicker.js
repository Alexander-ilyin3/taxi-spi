import { createTheme, TextField, ThemeProvider, Typography as T } from "@mui/material"
import { Box } from "@mui/system"
import { Controller, useFormContext } from "react-hook-form"
import { useState } from 'react'
import { makeStyles } from '@mui/styles'

import { LabelError } from "components/atoms/LabelError"
import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"

const useStyles = makeStyles(() => ({
  timeInput: {
    '&::-webkit-calendar-picker-indicator': {
      position: 'absolute',
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 'calc(100% - 60px)',
    }
  }
}))

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

  const getInputValueFromDate = (dateObject) => {
    if (!(dateObject instanceof Date) || isNaN(dateObject)) return null

    const minutes = dateObject.getMinutes()
    const hours = dateObject.getHours()
    return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}`
  }

  const getDateFromInputValue = (inputTime) => {
    const hh = inputTime.match(/(\d{2}):/) ? inputTime.match(/(\d{2}):/)[1] : undefined
    const mm = inputTime.match(/\d{2}:(\d{2})/) ? inputTime.match(/\d{2}:(\d{2})/)[1] : undefined

    if (!hh || !mm) return null
    const dateObject = new Date()

    dateObject.setHours(hh)
    dateObject.setMinutes(mm)

    return dateObject
  }
  const classes = useStyles()

  return (
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
        <Box sx={{ width: '100%' }}>
          <Label sx={{ marginBottom: 2 }}>
            <T variant='h5md' >
              {r && <RequiredStar />}
              {labelText}
            </T>
          </Label>
          <TextField
            inputProps={{
              className: classes.timeInput
            }}
            value={getInputValueFromDate(value) || ''}
            fullWidth
            variant="outlined"
            type="time"
            helperText={(invalid || error?.message) && <LabelError labelErrorText={error?.message} />}
            onChange={(e) => onChange(getDateFromInputValue(e.target.value))}
            error={invalid}
          />
        </Box>
      )}
    />
  )
}
