import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePicker as MuiDatePicker, LocalizationProvider } from "@mui/lab"
import { TextField, Typography as T } from "@mui/material"
import { Box } from "@mui/system"
import { Controller, useFormContext } from "react-hook-form"
import { useEffect, useState } from 'react'

import { LabelError } from "components/atoms/LabelError"
import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { getMountPoint } from 'helpers/shadowRoot'

export const DatePicker = ({ name, r, labelErrorText, labelText }) => {
  const { control } = useFormContext()
  const [isOpen, setOpen] = useState(false)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        control={control}
        name={name}
        defaultValue={null}
        shouldUnregister={true}
        rules={{ required: true, validate: { minDate: (value) => value > new Date().setHours(0, 0, 0, 0) } }}
        render={({
          field: { onChange, value },
          fieldState: { invalid },
        }) => {
          return (
            <MuiDatePicker
              onChange={onChange}
              ignoreInvalidInputs
              value={value || null}
              minDate={new Date()}
              open={isOpen}
              DialogProps={{ disablePortal: true }}
              onClose={() => setOpen(false)}
              PopperProps={{
                container: getMountPoint()
              }}
              PopoverProps={{
                disableRestoreFocus: true,
                onClose: () => {
                  setOpen(false)
                },
              }}
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
                    onClick={() => setOpen(true)}
                  />
                </Box>
              )}
            />
          )
        }}
      />
    </LocalizationProvider>
  )
}
