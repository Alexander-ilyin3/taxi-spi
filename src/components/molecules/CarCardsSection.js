import { Box } from "@mui/material"
import { CarCard } from "components/molecules/CarCard.js"
import { Controller, useFormContext } from "react-hook-form"
import { testCarData } from 'testData/testCarsData'

export const CarCardsSection = ({ setSelectedCar }) => {

  const { control } = useFormContext()

  const cardsData = testCarData
  return (
    <Controller
      control={control}
      name="selectedCar"
      defaultValue={null}
      render={({
        field: { onChange, value }
      }) => (
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
            return <CarCard key={i} cardData={{...data, index: i}} setSelectedCar={onChange} activeCar={value} />
          })}
        </Box>
      )}
    />

  )
}