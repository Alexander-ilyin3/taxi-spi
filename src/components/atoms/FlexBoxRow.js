import { Box, useTheme } from "@mui/material"

export const FlexBoxRow = ({ children, styleProps, notColumnOnMobile }) => {
  const { breakpoints: { down } } = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: notColumnOnMobile ? 'row' : ['column', 'row'],
        // ...(matches && !notColumnOnMobile && { flexDirection:  }),
        gap: [2, 4, 6, 8],
        ...styleProps
      }}
    >
      {children}
    </Box>
  )
}
