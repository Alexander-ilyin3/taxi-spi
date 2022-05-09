import { Box, Autocomplete, TextField, Typography as T } from '@mui/material'
import { Controller, useFormContext } from "react-hook-form"
import { useEffect, useRef } from 'react'

import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { LabelError } from "components/atoms/LabelError"
import ShadowPopper from 'components/atoms/ShadowPopper'

export const CountryStateInputSelect = ({ labelText, labelErrorText, r, disabled, name, autocompleteData }) => {

  const { control } = useFormContext()
  return (
    // <Box width="100%">
    <Controller
      control={control}
      name={name}
      shouldUnregister={true}
      rules={{ validate: (v) => r && !!v }}
      render={({
        field: { onChange, value, ref },
        fieldState: { invalid }
      }) => (
        <
          // sx={{
          //   width: '100%',
          //   display: 'flex',
          //   flexDirection: 'column',
          //   justifyContent: 'space-between'
          // }}
          >
          <Label sx={{ marginBottom: 2 }}>
            <T variant='h5md' >
              {r && <RequiredStar />}
              {labelText}
            </T>
          </Label>
          <Autocomplete
            // inputRef=
            options={autocompleteData}
            groupBy={(option) => option.type}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => onChange(value)}
            isOptionEqualToValue={() => true}
            value={value || null}
            PopperComponent={ShadowPopper}
            renderInput={(params) => {
              return (
                <>
                  <TextField
                    fullWidth
                    variant="outlined"
                    disabled={disabled}
                    value={params.inputProps.value}
                    error={invalid}
                    // helperText={}
                    {...params}
                    inputRef={ref}
                  />
                </>
              )
            }}
          />
          <Box> {invalid && <LabelError labelErrorText={labelErrorText} />}</Box>
        </>
      )}
    />
    // </Box>
  )
}
