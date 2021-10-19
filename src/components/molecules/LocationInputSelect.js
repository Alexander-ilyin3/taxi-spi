import { Box, Autocomplete, TextField, Typography as T } from '@mui/material'
import { Controller, useFormContext } from "react-hook-form"

import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { LabelError } from "components/atoms/LabelError"

export const LocationInputSelect = ({ labelText, labelErrorText, r, disabled, name, autocompleteData }) => {

  const { control } = useFormContext()

  return (
    <Box width="100%">
      <Controller
        control={control}
        name={name}
        shouldUnregister={true}
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
            options={autocompleteData}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => { console.log(5555555, value); onChange(value) }}
            value={value || null}
            renderInput={(params) => {
              return <TextField
                fullWidth
                variant="outlined"
                disabled={disabled}
                value={params.inputProps.value}
                helperText={invalid && <LabelError labelErrorText={labelErrorText} />}
                {...params}
              />
            }}
          />
        </>
        )}
      />
    </Box>
  )
}