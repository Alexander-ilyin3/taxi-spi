import { Box } from "@material-ui/system"


export const FlexBoxRow = ({ children, styleProps }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: [2, 4, 6, 8],
        ...styleProps
      }}
    >
      {children}
    </Box>
  )
}
