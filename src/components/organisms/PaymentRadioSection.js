import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography as T,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { reduceIconPath } from "helpers/reduceIconPath";
import { Controller, useFormContext } from "react-hook-form";
import ae from './paymentCards/ae.png'
import cs from './paymentCards/cs.jpg'
import discover from './paymentCards/discover.jpeg'
import mc from './paymentCards/mastercard.png'
import visa from './paymentCards/visa.png'

const useStyles = makeStyles((theme) =>({
  paymentCardLogo: {
    width: 80,
    height: 67,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    margin: 5,
    [theme.breakpoints.down('md')]: {
      width: 50,
      height: 42,
    },
  },
  row: {
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
    flexWrap: 'no-wrap',
  }
}));

export const PaymentRadioSection = () => {
  const { control } = useFormContext();
  const classes = useStyles()
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" sx={{ marginBottom: "10px" }}>
        <T variant="h5md">Payment system</T>
      </FormLabel>
      <Controller
        rules={{ required: true }}
        control={control}
        defaultValue={null}
        name="paymentVariant"
        render={({ field }) => (
          <RadioGroup {...field} className={classes.row} row sx={{ gap: "16px" }}>
            <div>
              <FormControlLabel
                value="paypal"
                variant="paymentButtons"
                control={<Radio />}
                label={
                  <img src={reduceIconPath("images/PayPalLogo.svg")}></img>
                }
                className={field?.value === "paypal" ? "activeBorder" : null}
              />
            </div>
            <div>
              <FormControlLabel
                value="stripe"
                variant="paymentButtons"
                control={<Radio />}
                label={
                  <img src={reduceIconPath("images/StripeLogo.svg")}></img>
                }
                className={field?.value === "stripe" ? "activeBorder" : null}
              />
              <Box display="flex" flexWrap="wrap">
                <div className={classes.paymentCardLogo} style={{ backgroundImage: `url(${discover})` }} />
                <div className={classes.paymentCardLogo} style={{ backgroundImage: `url(${mc})` }} />
                <div className={classes.paymentCardLogo} style={{ backgroundImage: `url(${ae})` }} />
                <div className={classes.paymentCardLogo} style={{ backgroundImage: `url(${visa})` }} />
                <div className={classes.paymentCardLogo} style={{ backgroundImage: `url(${cs})` }} />
              </Box>
            </div>
            {/* <FormControlLabel
              value="google_pay"
              control={<Radio />}
              label="Google Pay"
            /> */}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
