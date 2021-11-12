import { Box } from "@mui/system"
import { Controller, useFormContext } from "react-hook-form"
import { useSelector } from "react-redux"
import { getAddons } from "redux/selectors/global.selectors"
import { isEqual } from "underscore"
import { AddOnsItemWrapper } from "./AddOnsItemWrapper"
import { testAddons } from 'testData/testAddons'
import { mapStateToAddonCards } from "helpers/mapStateToAddonCards"

export const AddOnsSection = () => {
  // const cardsData = []
  const { control } = useFormContext()
  const addons = useSelector(getAddons, isEqual)
  console.log('addins ', addons, testAddons)

  const cardsData = mapStateToAddonCards(addons)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: 4
      }}
    >
      {cardsData.map((cardData, i) => (
        <Controller
          key={i}
          control={control}
          name={`Addon.id_${String(cardData.addon_id)}`}
          defaultValue={{ addon_id: cardData.addon_id, count: 0 }}
          shouldUngerister={true}
          rules={{ validate: () => true }}
          render={({
            field: { onChange, value },
            fieldState: { invalid }
          }) => (
            <AddOnsItemWrapper key={i} addonObject={cardData} onChange={(count) => {console.log(count); onChange({ addon_id: cardData.addon_id, count })}} value={value.count} />
          )}
        />
      ))
      }

    </Box>
  )
}
