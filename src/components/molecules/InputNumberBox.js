import { Box, Typography as T, useTheme } from '@mui/material'
import { Controller, useFormContext } from "react-hook-form"

import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { LabelError } from "components/atoms/LabelError"
import { InputNumber } from "components/atoms/InputNumber"


const InputNumberBox = ({ labelText, labelErrorText, r, error, name }) => {
  const theme = useTheme()
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      defaultValue="1"
      render={({
        field: { onChange, value }
      }) => (
        <>
          <Box >
            <Label sx={{ marginBottom: 2 }}>
              {r && <RequiredStar />}
              <T variant='h5md' >
                {labelText}
              </T>
            </Label>
            <InputNumber
              setValue={onChange}
              value={value}
            />
            {error && <LabelError labelErrorText={labelErrorText} />}
          </Box>
        </>
      )}
    />
  )
}

export { InputNumberBox }
