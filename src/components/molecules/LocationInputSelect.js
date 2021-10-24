import { Box, Autocomplete, TextField, Typography as T } from '@mui/material'
import { Controller, useFormContext } from "react-hook-form"
import { useEffect, useRef } from 'react'

import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { LabelError } from "components/atoms/LabelError"

export const LocationInputSelect = ({ labelText, labelErrorText, r, disabled, name, autocompleteData }) => {

  const { control } = useFormContext()
  const inputRef1 = useRef()

  useEffect(() => {
    setTimeout(() => {
      console.log('useEffect focus 1')
      inputRef1?.current?.focus()
    }, 5000);
  }, [])

  return (
    <Box width="100%">
      <Controller
        control={control}
        name={name}
        shouldUnregister={true}
        onFocus={() => { console.log('focused'); inputRef1.current.focus() }}
        rules={{ validate: (v) => r && !!v }}
        render={({
          field: { onChange, value },
          fieldState: { invalid }
        }) => (<>
          <Label sx={{ marginBottom: 2 }}>
            <T variant='h5md' >
              {r && <RequiredStar />}
              {labelText}
            </T>
          </Label>
          <Autocomplete
            // inputRef=
            options={autocompleteData}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => { console.log(5555555, value); onChange(value) }}
            value={value || null}
            renderInput={({ inputProps: { ref }, inputProps, ...params}) => {
              // console.log(22222222222, params)
              // console.log( 333, inputProps)
              return <TextField
                // inputRef={inputRef}
                fullWidth
                variant="outlined"
                disabled={disabled}
                value={inputProps.value}
                error={invalid}
                helperText={invalid && <LabelError labelErrorText={labelErrorText} />}
                {...{...params, inputProps : { ref: inputRef1, ...inputProps} }}
              />
            }}
          />
        </>
        )}
      />
    </Box>
  )
}
