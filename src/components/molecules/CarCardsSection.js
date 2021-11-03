import { Box, Typography as T } from "@mui/material"
import { CarCard } from "components/molecules/CarCard.js"
import { Controller, useFormContext } from "react-hook-form"
import { testCarData } from 'testData/testCarsData'
import { LabelError } from 'components/atoms/LabelError.js'
import { useTheme } from "@mui/system"

export const CarCardsSection = ({ setSelectedCar }) => {

  const { control } = useFormContext()
  const { palette: { error: { main: error } } } = useTheme()

  const cardsData = testCarData
  return (
    <Controller
      control={control}
      name="selectedCar"
      defaultValue={null}
      rules={{ required: true }}
      render={({
        field: { onChange, value },
        fieldState: { invalid }
      }) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            // gap: 2,
            justifyContent: 'space-evenly'
          }}
        >
          {cardsData.map((data, i) => {
            return <CarCard key={i} cardData={{ ...data, index: i }} setSelectedCar={onChange} activeCar={value} />
          })}
          {invalid && <T variant="h3" color={error} >Please, select a car shown above</T>}
        </Box>
      )}
    />

  )
}