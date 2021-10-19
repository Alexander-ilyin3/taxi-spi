import { TextField, Typography as T } from "@mui/material"
import { Box, useTheme } from "@mui/system"
import { Controller, useFormContext } from "react-hook-form"

export const NotesSection = () => {
  const { palette: { primary: { blue } } } = useTheme()
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name="bookingDetailsNotes"
      defaultValue=""
      shouldUngerister={true}
      rules={{ validate: () => true }}
      render={({
        field: { onChange, value },
        fieldState: { invalid }
      }) => (
        <Box>
          <T variant='h4' sx={{ color: blue, marginBottom: 1 }}>NOTES</T>
          <T sx={{ marginBottom: 1 }}>If you have any notes for our driver, such as handicapped needs or requests, enter them here:</T>
          <TextField
            multiline
            fullWidth
            minRows={4}
            onChange={onChange}
            value={value}
          ></TextField>
        </Box>
      )}
    />
  )
}
