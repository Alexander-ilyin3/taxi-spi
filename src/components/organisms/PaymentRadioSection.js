import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

export const PaymentRadioSection = () => {

  const { control } = useFormContext()

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Payment system</FormLabel>
      <Controller
        rules={{ required: true }}
        control={control}
        defaultValue={null}
        name="paymentVariant"
        render={({ field }) => (
          <RadioGroup {...field}>
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label="PayPal"
            />
            <FormControlLabel
              value="apple_pay"
              control={<Radio />}
              label="Apple Pay"
            />
            <FormControlLabel
              value="google_pay"
              control={<Radio />}
              label="Google Pay"
            />
          </RadioGroup>
        )}
      />
    </FormControl>

  )
}