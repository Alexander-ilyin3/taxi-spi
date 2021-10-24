import { Typography as T } from '@mui/material'
import { Box, useTheme } from '@mui/system'
import { Button } from 'components/atoms/Button'
import { Label } from 'components/atoms/InputLabel'
import { InputBox } from 'components/molecules/InputBox'

export const CouponSection = () => {
  const { palette: { primary: { blue, white } } } = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: '60%',
        alignItems: 'center',
        gap: 2,
        height: '54px',
      }}
    >
      <Label
        sx={{ margin: 0 }}
      >
        <T
          variant="h5md"
          sx={{
            display: 'block',
            width: 'max-content',

          }}
        >Coupon Code</T>
      </Label>
      <InputBox
        couponHeight
        name="couponCode"
      >
      </InputBox>
      <Button
        sx={{
          paddingLeft: 6,
          paddingRight: 6,
          height: '100%',
          backgroundColor: blue,
          color: white,
          fontWeight: 600,
          borderRadius: '10px',
        }}
      ><T variant="h5sb" sx={{ color: white }} >Apply</T> </Button>

    </Box>
  )
}