import { Box, Typography as T, useTheme } from '@mui/material'
import { Controller, useFormContext } from "react-hook-form"

import { Input } from "components/atoms/Input"
import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { LabelError } from "components/atoms/LabelError"

const InputBox = ({ labelText, labelErrorText, r, error, disabled, name, couponHeight }) => {
  const { control } = useFormContext()

  return (
    name ? (
      <Controller
        control={control}
        name={name}
        shouldUnregister={true}
        defaultValue=''
        rules={{ validate: (v) => r && !!v } }
        render={({
          field: { onChange, value, ref },
          fieldState: { invalid },
        }) => (
          <Box sx={{ width: '100%',/* ...(couponHeight ? { height: '2px'} : {} )*/ }}>
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
            <Input inputRef={ref} disabled={disabled} onChange={onChange} value={value} error={invalid} />
            {invalid && <LabelError labelErrorText={labelErrorText} />}
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
