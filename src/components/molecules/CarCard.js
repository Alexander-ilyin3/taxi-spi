import { Box, Card, CardActionArea, Typography as T, useTheme } from "@mui/material"
import { makeStyles } from '@mui/styles'
import { reduceIconPath } from "helpers/reduceIconPath"
import { useSelector } from "react-redux"
import { getSelectedVehicle } from "redux/selectors/global.selectors"

const useStyles = makeStyles(({ palette: { primary: { grey, blue, white }, secondary: { lightBlue } }, breakpoints }) => {

  return ({
    carCard: {
      minWidth: '230px',

      border: `1px solid ${grey}`,
      borderRadius: '10px',
      margin: '20px 10px',
      flexBasis: '30%',
      flexGrow: 1,
      maxWidth: '330px',

      [breakpoints.down('sm')]: {
        flexBasis: '100%',
        maxWidth: '380px',
      }
    },
    carCardActive: {
      border: `1px solid ${blue}`
    }
  })
})

export const CarCard = ({ cardData, setSelectedCar, activeCar }) => {
  const theme = useTheme()
  const { palette: { primary: { grey, blue, white }, secondary: { lightBlue } } } = theme
  const { carName, price, numberOfSeats, picturePath, vehicleId } = cardData

  const isCarActive = String(vehicleId) === String(activeCar?.vehicleId)

  const cardClick = () => {
    setSelectedCar(cardData)
  }

  const classes = useStyles()

  return (
    <Card
      elevation={0}
      className={isCarActive ? [classes.carCard, classes.carCardActive].join(' ') : classes.carCard}
    >
      <CardActionArea onClick={cardClick}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',

        }}
      >
        <Box
          sx={{
            width: '100%',
            minHeight: '150px',
            display: 'flex',
            marginBottom: '30px',
            justifyContent: 'center',
            backgroundImage: `url(${picturePath})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          {/* <img src={picturePath}></img> */}
        </Box>
        <T variant="cardLabelText">{carName}</T>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            <img src={reduceIconPath('images/Person.svg')} style={{ marginRight: '10px', marginTop: '-3px' }}></img><span>{numberOfSeats}&nbsp;{numberOfSeats === 1 ? 'Seat' : 'Seats'}</span>
          </Box>
          <Box>
            <span style={{ fontWeight: 700, fontSize: '14px' }}>${price}</span>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '46px',
            backgroundColor: isCarActive ? blue : lightBlue,
            color: isCarActive ? white : blue,
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <T sx={{ alignSelf: 'center', fontWeight: 600 }}>{isCarActive ? 'Vehicle Selected' : 'Select Vehicle'}</T>
        </Box>
      </CardActionArea>
    </Card>
  )
}
