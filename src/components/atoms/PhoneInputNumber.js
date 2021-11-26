import { InputAdornment, useTheme, Box, Typography as T } from "@mui/material"
import { Input } from 'components/atoms/Input'
import { useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import NumberFormat from 'react-number-format'
import { Label } from "./InputLabel"
import { LabelError } from "./LabelError"
import { RequiredStar } from "./RequiredStar"

export const PhoneInputNumberBox = ({ name, r, labelText }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        minLength: {
          value: 11,
          message: "The phone field must be at least 10 characters."
        },
        minCharLength: (v) => {

        },
        validate: (v) => r && !!v
      }}
      render={({
        field: { onChange, value, ref },
        fieldState: { invalid, error }
      }) => (
        <>
          <Box sx={{ width: '100%' }}>
            <Label sx={{ marginBottom: 2 }}>
              {r && <RequiredStar />}
              <T variant='h5md' >
                {labelText}
              </T>
            </Label>
            <Box sx={{
              width: '100%',
              position: 'relative'
            }}>
              <NumberFormat
                value={value}
                displayType={'text'}
                allowNegative={false}
                onValueChange={(v) => onChange(v.value)}
                // onInput={(e) => { return /^\+?\d*$|^$/.test(e.target.value) ? onChange(parseFloat(e.target.value)) : null }}
                onInput={(e) => !isNaN(parseFloat(e.target.value)) ? onChange(parseFloat(e.target.value) + '') : onChange('')}
                customInput={Input}
                prefix={'+'}
                renderText={(v, props) => (
                  <Input
                    {...props}
                    error={invalid}
                    value={v}
                    inputRef={ref}
                  ></Input>
                )}
              />
            </Box>
            {invalid &&
              <LabelError
                labelErrorText={error?.message}
              />
            }
          </Box>
        </>
      )}
    />
  )
}
