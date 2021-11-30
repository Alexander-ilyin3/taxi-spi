import { Box, Typography as T, useTheme } from '@mui/material'
import { Controller, useFormContext } from "react-hook-form"

import { Input } from "components/atoms/Input"
import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { LabelError } from "components/atoms/LabelError"
import { getErrorTextWithMultipleValidateFunc, validateSeveral } from 'helpers/validateFunctions'

const InputBox = ({ labelText, labelErrorText, r, error, disabled, name, additionalOnChange, validateFunctionObject }) => {
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
    name ? (
      <Controller
        control={control}
        name={name}
        shouldUnregister={true}
        defaultValue=''
        rules={rulesObject}
        render={({
          field: { onChange, value, ref },
          fieldState: { invalid, error },
        }) => (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {console.log(3333333333, 'ERRORS --- ,', error)}
            {labelText ? (
              <Label sx={{ marginBottom: 2 }}>
                {r && <RequiredStar />}
                <T variant='h5md' >
                  {labelText}
                </T>
              </Label>
            ) : (
              null
            )}
            <Input
              inputRef={ref}
              disabled={disabled}
              onChange={(v) => { onChange(v); additionalOnChange && additionalOnChange() }}
              value={value}
              error={invalid}
            />
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
        )}
      />
    ) : (
      <Box sx={{ width: '100%' }}>
        {labelText ? (
          <Label sx={{ marginBottom: 2 }}>
            {r && <RequiredStar />}
            <T variant='h5md' >
              {labelText}
            </T>
          </Label>
        ) : (
          null
        )}
        <Input disabled={disabled} />
        {error && <LabelError labelErrorText={labelErrorText} />}
      </Box>
    )
  )
}

export { InputBox }
