import { Box } from "@mui/system"

export const CongratsWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {children}
    </Box>
  )
}