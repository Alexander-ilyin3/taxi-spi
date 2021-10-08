import { Box } from "@material-ui/system"


export const FlexBoxRow = ({ children, styleProps }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        ...styleProps
      }}
    >
      {children}
    </Box>
  )
}
