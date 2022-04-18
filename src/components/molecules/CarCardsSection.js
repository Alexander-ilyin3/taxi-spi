import { Box, Typography as T } from "@mui/material"
import { CarCard } from "components/molecules/CarCard.js"
import { Controller, useFormContext } from "react-hook-form"
import { testCarData } from 'testData/testCarsData'
import { LabelError } from 'components/atoms/LabelError.js'
import { useTheme } from "@mui/system"
import { useEffect } from "react"
import { mapStateToParams } from "helpers/mapStateForUpdateCart"
import { session } from "api/sessionApi"
import { useSelector } from "react-redux"
import { getVehicles } from "redux/selectors"
import { getSelectedVehicle } from "redux/selectors/global.selectors"

export const CarCardsSection = () => {

  const { control } = useFormContext()
  const { palette: { error: { main: error } } } = useTheme()
  const { watch, setValue } = useFormContext()
  const cardsData = useSelector(getVehicles)

  const activeVehicleId = useSelector(getSelectedVehicle)

  useEffect(() => {
    if ( activeVehicleId !== null && cardsData.length ) {
      
      const carToSetAsActive = cardsData.find((card, i) => {
        return parseFloat(card.vehicleId) === activeVehicleId
      })
      
      if ( carToSetAsActive ) { 

        setValue('selectedCar', {...carToSetAsActive, price: parseFloat(carToSetAsActive.price)/*, index: i*/}) //TODO hell
      }
    }
  }, [activeVehicleId, cardsData])


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
            return <CarCard key={i} cardData={{ ...data/*, index: i*/ }} setSelectedCar={onChange} activeCar={value} />
          })}
          {invalid && <T variant="h3" color={error} >Please, select a car shown above</T>}
        </Box>
      )}
    />

  )
}