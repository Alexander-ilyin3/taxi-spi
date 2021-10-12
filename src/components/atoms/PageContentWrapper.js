import { Box } from '@mui/material'

export const PageContentWrapper = ({ children }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      padding: [2, 4, 6, 8],
      justifyContent: 'space-between',
    }}>
      {children}
    </Box>
  )
}