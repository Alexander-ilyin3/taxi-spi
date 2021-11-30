import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography as T } from "@mui/material"
import { reduceIconPath } from "helpers/reduceIconPath"
import { Controller, useFormContext } from "react-hook-form"

export const PaymentRadioSection = () => {

  const { control } = useFormContext()

  return (
    <FormControl component="fieldset" >
      <FormLabel component="legend" sx={{ marginBottom: '10px' }}><T variant="h5md">Payment system</T></FormLabel>
      <Controller
        rules={{ required: true }}
        control={control}
        defaultValue={null}
        name="paymentVariant"
        render={({ field }) => (
          <RadioGroup {...field} row sx={{  gap: '16px' }}>
            {console.log(44444444444444, field)}
            <FormControlLabel
              value="paypal"
              variant="paymentButtons"
              control={<Radio />}
              label={<img src={reduceIconPath('images/PayPalLogo.svg')}></img>}
              className={field?.value === "paypal" ? 'activeBorder' : null}
            />
            <FormControlLabel
              value="stripe"
              variant="paymentButtons"
              control={<Radio />}
              label={<img src={reduceIconPath('images/StripeLogo.svg')}></img>}
              className={field?.value === "stripe" ? 'activeBorder' : null}
            />
            {/* <FormControlLabel
              value="google_pay"
              control={<Radio />}
              label="Google Pay"
            /> */}
          </RadioGroup>
        )}
      />
    </FormControl>

  )
}