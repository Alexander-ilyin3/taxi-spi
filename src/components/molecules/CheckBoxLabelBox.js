import { Box, FormControlLabel, Typography as T } from "@mui/material"
import { CheckBoxComponent } from "components/atoms/CheckBoxComponent"
import { LabelError } from "components/atoms/LabelError"
import { RequiredStar } from "components/atoms/RequiredStar"
import { Controller, useFormContext } from "react-hook-form"

export const CheckBoxLabelBox = ({ labelText, children, name, r }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      shouldUnregister={true}
      rules={{ required: r }}
      render={({
        field: { onChange, value },
        fieldState: { invalid }
      }) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FormControlLabel control={<CheckBoxComponent onChange={onChange} checked={value} />}
            label={
              <Box sx={{ position: 'relative' }}>
                {r && <RequiredStar styles={{ left: '-3px' }} />}
                <T
                  sx={r ? { paddingLeft: 1 } : {}}
                  variant='h5md'>
                  {labelText}
                </T>
              </Box>
            }
          />
          <Box
            sx={{
              marginLeft: 4,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {children}
            {invalid && <LabelError labelErrorText={'Agreement to Terms and Conditions required to proceed to payment'} />}
          </Box>
        </Box>
      )}
    >



    </Controller>
  )
}
