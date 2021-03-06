import { Card, Typography as T } from "@mui/material"
import { Box, useTheme } from "@mui/system"
import { Button } from "components/atoms/Button"
import { useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import useMediaQuery from '@mui/material/useMediaQuery'

const AddonsControlButtons = ({ value = 0, onChange }) => {
  // const { palette: { primary: { blue } } } = useTheme()
  // const [ count, setCount ] = useState(null)

  // useEffect(() => {
  //   setCount(addonObject.addonCount || 0)
  // }, [addonObject])

  const increment = () => {
    onChange(value + 1)
  }

  const decrement = () => {
    onChange(value - 1)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'space-between',
      }}
    >
      <Button
        variant="addonButtons"
        style={{ fontWeight: 500 }}
        onClick={decrement}
        disabled={!value}
      > - </Button>
      <T variant='cardPrice'
        sx={{
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        {value}
      </T>
      <Button
        variant="addonButtons"
        style={{ fontWeight: 500 }}
        onClick={increment}
      > + </Button>
    </Box>
  )
}

export const AddOnsItemWrapper = ({ addonObject, onChange, value }) => {

  const { name, src, price, description, onlyForPrivatTransfers } = addonObject
  const { palette: { primary: { blue, grey } }, breakpoints: { down } } = useTheme()
  const { control } = useFormContext()

  const medium = useMediaQuery(down('md'))
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '175px',
        ...(!medium && { flexBasis: '45%' })
      }}
    >
      <Card
        elevation={4}
        sx={{
          borderRadius: '10px',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          border: `${value ? '2px solid ' + blue : '2px solid #ffffff00'}`,
          backgroundColor: `${value ? blue + '09' : 'none'}`,
          boxSizing: 'border-box',
        }}
      >
        <Box // picture wrapper
          sx={{
            height: '100%',
            width: '35%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1,
          }}
        >
          <img src={src} style={{ height: 'fit-content', maxWidth: '100%' }}></img>
        </Box>
        <Box // name and description
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '65%',
            paddingTop: 1,
            paddingRight: 1,
            paddingBottom: 1,
          }}
        >
          <T variant="cardLabelText">{name}</T>
          <T variant="cardDescription">{description}</T>
          <Box // price and buttons wrapper
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <T variant='cardPrice' >${price}</T>
            <AddonsControlButtons value={value} onChange={onChange} />
          </Box>
        </Box>
      </Card>
    </Box>
  )
}
