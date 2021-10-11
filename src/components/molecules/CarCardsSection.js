import { Box } from "@material-ui/system"
import { CarCard } from "components/molecules/CarCard.js"
import { testCarData } from 'testData/testCarsData'

export const CarCardsSection = () => {

  const cardsData = testCarData
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // gap: 2,
        justifyContent: 'space-between'
      }}
    >
      {cardsData.map((data, i) => {
        return <CarCard key={i} cardData={data}/>
      })}
    </Box>
  )
}