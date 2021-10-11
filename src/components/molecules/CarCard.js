import { Card, CardActionArea, Typography as T, useTheme } from "@material-ui/core"
import { Box } from "@material-ui/system"

export const CarCard = ({ cardData }) => {
  const theme = useTheme()
  const { palette: { primary: { grey, blue }, secondary: { lightBlue }} } = theme
  const { carName, price, numberOfSeats, picturePath } = cardData

  const cardClick = () => {
    console.log('card clicked')
  }

  return (
    <Card
      elevation={0}
      sx={{
        width: '240px',
        // height: '260px',
        border: `1px solid ${grey}`,
        borderRadius: '10px',
        margin: '20px 10px',
      }}
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
            height: '50%',
            display: 'flex',
            marginBottom: '30px',
            justifyContent: 'center'
          }}
        >
          <img src={picturePath}></img>
        </Box>
        <T variant="cardLabelText">{carName}</T>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: '20px', 
          }}
        >
          <Box
            sx={{display: 'flex', flexDirection: 'row'}}
          >
            <img src={'images/Person.svg'} style={{marginRight: '10px', marginTop: '-3px'}}></img><span>{numberOfSeats}&nbsp;{numberOfSeats === 1 ? 'Seat' : 'Seats'}</span>
          </Box>
          <Box>
            <span style={{fontWeight: 700, fontSize: '14px'}}>${price}</span>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '46px',
            backgroundColor: lightBlue,
            color: blue,
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <T sx={{alignSelf: 'center', fontWeight: 600}}>Select Vehicle</T>
        </Box>
      </CardActionArea>
    </Card>
  )
}