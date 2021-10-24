import { Box, Typography as T, useTheme } from '@mui/material'
import { Controller, useFormContext } from "react-hook-form"

import { Label } from "components/atoms/InputLabel"
import { RequiredStar } from "components/atoms/RequiredStar"
import { LabelError } from "components/atoms/LabelError"
import { InputNumber } from "components/atoms/InputNumber"


const InputNumberBox = ({ labelText, labelErrorText, r, name, selectedCar }) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      defaultValue="1"
      rules={{
        validate: (v) => {
          if (selectedCar?.oneSeatAllowed) {
            return parseFloat(v) === 1
          } else {
            return r && !!v
          }
        }
      }}
      render={({
        field: { onChange, value },
        fieldState: { invalid }
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
              error={invalid}
            />
            {invalid &&
              <LabelError
                labelErrorText={
                  selectedCar?.oneSeatAllowed ? (
                    'Only one seat allowed for this type of vehicle'
                  ) : (
                    labelErrorText
                  )
                }
              />
            }
          </Box>
        </>
      )}
    />
  )
}

export { InputNumberBox }
