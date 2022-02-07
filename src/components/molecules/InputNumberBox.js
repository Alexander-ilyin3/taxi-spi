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
        validate: {
          oneSeat: (v) => {
            console.log({ oneSeatRule: selectedCar?.oneSeatAllowed ? parseFloat(v) === 1 || 'Only one seat allowed for this type of vehicle' : true })
            return selectedCar?.oneSeatAllowed ? parseFloat(v) === 1 || 'Only one seat allowed for this type of vehicle' : true
          },
          reqularValidation: (v) => {
            return r && !!v
          },
          seatLimit: (v) => {
            return v > selectedCar?.noMoreThenAmountOfPeople ? 'The seat limit for the shuttle has been reached' : true
          }
        }
      }}
      render={({
        field: { onChange, value, ref },
        fieldState: { invalid, error }
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
              inputRef={ref}
              setValue={onChange}
              value={value}
              error={invalid}
            />
            {invalid &&
              <LabelError labelErrorText={error.message || labelErrorText} />
            }
          </Box>
        </>
      )}
    />
  )
}

export { InputNumberBox }
