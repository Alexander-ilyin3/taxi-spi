import { Box } from "@mui/material"

export const SectionWrapper = ({children}) => {
  return (
    <Box sx={{
      // width: 'auto',
      // padding: 10,
      // paddingLeft: '80px',
      // paddingTop: 7,
      // width: '55%',
      display: 'flex',
      flexDirection: "column",
      gap: 8,
      borderRadius: 4,
      width: '55%',
    }}>
      {children}
    </Box>
  )
}
