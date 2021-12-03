import { InputAdornment, useTheme, Box, Typography as T } from "@mui/material"
import { Input } from 'components/atoms/Input'
import { getErrorTextWithMultipleValidateFunc, replaceForPhoneNumber, validateSeveral } from "helpers/validateFunctions"
import { useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import NumberFormat from 'react-number-format'
import { Label } from "./InputLabel"
import { LabelError } from "./LabelError"
import { RequiredStar } from "./RequiredStar"

export const PhoneInputNumberBox = ({ name, r, labelText, labelErrorText, validateFunctionObject }) => {
  const { control } = useFormContext()

  const validateFuncErrorText = validateFunctionObject?.errText

  const validateFunctions = [
    v => r && !!v,
  ]

  if (validateFunctionObject?.func) validateFunctions.push(validateFunctionObject.func)

  const rulesObject = {
    validate: outV => validateSeveral(outV, validateFunctions),
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={rulesObject}
      render={({
        field: { onChange, value, ref },
        fieldState: { invalid, error }
      }) => (
        <>
          <>
            {/* sx={{ width: '100%' }} */}

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
              <Input
                onChange={(e) => onChange(replaceForPhoneNumber(e.target.value))}
                error={invalid}
                value={value}
                inputRef={ref}
              ></Input>
            </Box>
            <Box>
              {invalid && (
                <LabelError
                  labelErrorText={
                    labelErrorText
                    ||
                    getErrorTextWithMultipleValidateFunc(value, {
                      func: validateFunctionObject?.func,
                      errText: validateFuncErrorText
                    })
                  }
                />
              )}
            </Box>
          </>
        </>
      )}
    />
  )
}
