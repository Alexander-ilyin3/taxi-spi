import { Box } from "@material-ui/system"


export const FlexBoxRow = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
      }}
    >
      {children}
    </Box>
  )
}
