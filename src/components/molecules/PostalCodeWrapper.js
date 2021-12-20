import { TextField, Typography as T } from "@mui/material"
import { Box } from "@mui/system"
import { Controller, useFormContext } from "react-hook-form"

import { LabelError } from "components/atoms/LabelError"
import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"

export const PostalCodeWrapper = ({ name, r, labelErrorText, labelText, dateToWatch }) => {
  const { control, watch } = useFormContext()
  const countryObject = watch('country')
  const countryName = countryObject?.name

  
  const validateZipWithCountry = (value) => {
    const countryRegexes = {
      "United States": {
        regex: /^\d{5}$/,
        errorMsg: 'The postal code is not valid for United States'
      },
      "Australia": {
        regex: /^\d{4}$/,
        errorMsg: 'The postal code is not valid for Australia'
      },
      "Canada": {
        regex: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/,
        errorMsg: 'The postal code is not valid for Canada'
      },
      "Germany": {
        regex: /^\d{5}$/,
        errorMsg: 'The postal code is not valid for Germany'
      },
      "Mexico": {
        regex: /^\d{5}$/,
        errorMsg: 'The postal code is not valid for Mexico'
      },
      "United Kingdom": {
        regex: /^[A-Z0-9]{6,7}$/,
        errorMsg: 'The postal code is not valid for United Kingdom'
      }
    }

    const regex = countryRegexes?.[countryName]?.regex

    if (!value) return false
    if (!regex) return true

    return regex.test(value) || countryRegexes?.[countryName]?.errorMsg || false
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={''}
      shouldUnregister={true}
      rules={{
        validate: {
          tatata: (v) => validateZipWithCountry(v)
        },
        required: true
      }}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error }
      }) => (
        <>
          {/* <Box sx={{ width: '100%' }}> */}
          <Label sx={{ marginBottom: 2 }}>
            <T variant='h5md' >
              {r && <RequiredStar />}
              {labelText}
            </T>
          </Label>
          <TextField
            value={value}
            fullWidth
            variant="outlined"
            // helperText={}
            onChange={(e) => onChange((e.target.value || '').toUpperCase())}
            // value={getInputValueFromDate(value)}
            // {...{ ...params, ...{ inputProps: { ...params.inputProps, placeholder: 'hh:mm am|pm' } } }}
            // value={params.inputProps.value}
            error={invalid}
          />
          {(invalid || error?.message) && <LabelError labelErrorText={error?.message} />}
          {/* </Box>  */}
        </>
      )}
    />
  )
}
