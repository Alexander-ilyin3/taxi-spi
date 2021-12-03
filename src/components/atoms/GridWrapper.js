import { Box, useTheme } from "@mui/material"

export const GridWrapper = ({ children, columnNumber, styleProps, notColumnOnMobile }) => {
  const { breakpoints: { down } } = useTheme()
  const columnsStyle = columnNumber ? '1fr '.repeat(columnNumber).trim() : '1fr 1fr'
  const match = down('sm')
  
  return (
    <Box
      sx={{
        display: ['flex', 'grid'],//match ?  : 'grid',
        flexDirection: 'column',
        gridTemplateRows: 'auto auto auto',
        gridAutoFlow: 'column',
        gridTemplateColumns: columnsStyle,
        columnGap: [2, 4, 6, 8],
        gap: 1,
      }}
    >
      {children}
    </Box>
  )
}
