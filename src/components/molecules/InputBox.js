import { Box, Typography as T, useTheme } from '@mui/material'
import { Controller, useFormContext } from "react-hook-form"

import { Input } from "components/atoms/Input"
import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { LabelError } from "components/atoms/LabelError"

const InputBox = ({ labelText, labelErrorText, r, error, disabled, name }) => {
  const theme = useTheme()
  const { control } = useFormContext()

  return (
    name ? (
      <Controller
        control={control}
        name={name}
        shouldUnregister={true}
        render={({
          field: { onChange, value }
        }) => (
          <Box sx={{ width: '100%' }}>
            <Label sx={{ marginBottom: 2 }}>
              {r && <RequiredStar />}
              <T variant='h5md' >
                {labelText}
              </T>
            </Label>
            <Input disabled={disabled} onChange={onChange} value={value} />
            {error && <LabelError labelErrorText={labelErrorText} />}
          </Box>
        )}
      />
    ) : (
      <Box sx={{ width: '100%' }}>
        <Label sx={{ marginBottom: 2 }}>
          {r && <RequiredStar />}
          <T variant='h5md' >
            {labelText}
          </T>
        </Label>
        <Input disabled={disabled} />
        {error && <LabelError labelErrorText={labelErrorText} />}
      </Box>
    )
  )
}

export { InputBox }
