import { Typography as T, useMediaQuery } from '@mui/material'
import { Box, useTheme } from '@mui/system'
import { coupon } from 'api/couponApi'
import { session } from 'api/sessionApi'
import { Button } from 'components/atoms/Button'
import { Label } from 'components/atoms/InputLabel'
import { LabelError } from 'components/atoms/LabelError'
import { InputBox } from 'components/molecules/InputBox'
import { reduceIconPath } from 'helpers/reduceIconPath'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalStepsData } from 'redux/actions'
import { getSessionCoupon } from 'redux/selectors'
import { InputBoxCoupon } from './InputBoxCoupon'

export const CouponSection = () => {
  const { palette: { primary: { blue, white } }, breakpoints: { down } } = useTheme()
  const { watch } = useFormContext()
  const couponValue = watch('couponCode')
  const [errorMessage, setErrorMessage] = useState(null)
  const sessionCoupon = useSelector(getSessionCoupon)
  const dispatch = useDispatch()
  // const mobile = useMediaQuery(down('sm'))

  console.log({ sessionCoupon })

  const checkCoupon = async () => {
    // console.log('couponResponse', couponResponse)
    const couponResponse = await coupon.checkCoupon({ code: couponValue })

    console.log('couponResponse', couponResponse)

    if (couponResponse && couponResponse.status === 1 && couponResponse.coupon_id) {
      // const mappedForParams = mapStateToParams(data)
      const response = await session.updateSession({ coupon_id: couponResponse.coupon_id })
      dispatch(setGlobalStepsData(response))
    }

    if (couponResponse && couponResponse.status === 0) {
      setErrorMessage(couponResponse.message || 'Something went wrong with coupon applying')
    }
  }

  const resetError = () => {
    if (!errorMessage) return
    setErrorMessage(null)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          // maxWidth: '60%',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          // height: '54px',
          // ...(mobile && {
          //   flexDirection: 'column',
          //   alignItems: 'flex-start',
          // })
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2
          }}
        >
          <InputBoxCoupon
            couponHeight
            name="couponCode"
            additionalOnChange={resetError}
          >
          </InputBoxCoupon>
          {sessionCoupon ? (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <img src={reduceIconPath("images/CouponCheckmark.svg")}></img>
              <T
                variant="apply"
                sx={{
                  color: blue,
                }}
              >Applied</T>
            </Box>
          ) : (
            <Button
              sx={{
                paddingLeft: 6,
                paddingRight: 6,
                height: '60px',
                backgroundColor: blue,
                color: white,
                fontWeight: 600,
                borderRadius: '10px',
              }}
              onClick={checkCoupon}
            >
              <T variant="apply" sx={{ color: white }} >Apply</T>
            </Button>
          )}
        </Box>
      </Box>
      {errorMessage && <LabelError labelErrorText={errorMessage} />}
    </>
  )
}