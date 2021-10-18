import { InputAdornment, useTheme, Box } from "@mui/material"
import { Input } from 'components/atoms/Input'
import { useEffect, useState } from "react"
import NumberFormat from 'react-number-format'


const Arrow = ({ direction, disabled }) => {
  const theme = useTheme()
  const { palette: { primary: { grey } } } = theme

  return (
    direction === 'top' ? (
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.75593 0.872872C5.35716 0.41241 4.64284 0.41241 4.24407 0.872872L1.23682 4.34535C0.675943 4.99299 1.136 6 1.99275 6L8.00725 6C8.864 6 9.32406 4.99299 8.76318 4.34535L5.75593 0.872872Z"
          fill={disabled ? grey + 'A0' : grey}
        />
      </svg>
    ) : (
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.75593 5.12713C5.35716 5.58759 4.64284 5.58759 4.24407 5.12713L1.23682 1.65465C0.675943 1.00701 1.136 9.13357e-08 1.99275 1.66235e-07L8.00725 6.9204e-07C8.864 7.6694e-07 9.32406 1.00701 8.76318 1.65465L5.75593 5.12713Z"
          fill={disabled ? grey + 'A0' : grey}
        />
      </svg>
    )
  )
}

const ArrowButtons = ({ decrement, increment, disabled }) => {
  return (
    <Box sx={{
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      right: 5,
      top: 8,
    }}>
      <button
        onClick={increment}
        style={{
          backgroundColor: '#fff0',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <Arrow direction={'top'} disabled={false} />

      </button>
      <button
        onClick={decrement}
        style={{
          backgroundColor: '#fff0',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <Arrow direction={'bot'} disabled={disabled} />
      </button>
    </Box>
  )
}

export const InputNumber = ({ value, setValue }) => {
  const [disabledBotArrow, setDisabledBotArrow] = useState(false)

  useEffect(() => {
    if (value < 1 && value !== '') setValue(1)
    if (parseFloat(value) === 1) {
      setDisabledBotArrow(true)
    } else {
      setDisabledBotArrow(false)
    }

  }, [value])

  const increment = () => {
    const num = parseFloat(value)
    if (isNaN(num)) return setValue(1)
    setValue(num + 1)
  }

  const decrement = () => {
    const num = parseFloat(value)
    if (isNaN(num)) return setValue(1)
    setValue(num - 1)
  }

  return (
    <Box sx={{
      maxWidth: '164px',
      position: 'relative'
    }}>
      <NumberFormat
        value={value}
        displayType={'text'}
        allowNegative={false}
        onValueChange={(v) => setValue(v.value) }
        onInput={(e) => { return /^\d+$|^$/.test(e.target.value) ? setValue(e.target.value) : null }}
        customInput={Input}
        renderText={(v, props) => <Input {...props} value={v} endAdornment={(
          <InputAdornment position="end">
            <ArrowButtons decrement={decrement} increment={increment} disabled={disabledBotArrow} />
          </InputAdornment>
        )}></Input>}
      />
    </Box>
  )
}
