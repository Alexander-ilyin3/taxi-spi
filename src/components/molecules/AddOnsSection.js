import { Box } from "@mui/system"
import { Controller, useFormContext } from "react-hook-form"
import { AddOnsItemWrapper } from "./AddOnsItemWrapper"


export const AddOnsSection = ({ cardsData }) => {
  const { control } = useFormContext()

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
          name={`Addon-id-${i}`}
          defaultValue={cardData}
          shouldUngerister={true}
          rules={{ validate: () => true }}
          render={({
            field: { onChange, value },
            fieldState: { invalid }
          }) => (
            <AddOnsItemWrapper key={i} addonObject={value} onChange={onChange} />
          )}
        />
      ))
      }

    </Box>
  )
}
