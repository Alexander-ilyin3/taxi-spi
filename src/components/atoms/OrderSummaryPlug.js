import { Typography as T, useTheme } from "@material-ui/core"
import { Box } from "@material-ui/system"

export const OrderSummaryPlug = () => {
  const theme = useTheme()
  const { palette: { secondary: { lightGrayBlue } } } = theme
  
  return (
    <Box sx={{
      borderRadius: '20px',
      width: '100%',
      padding: '26px',
      backgroundColor: lightGrayBlue,

    }}

    >
      <T variant='h5md'>Your order summary will display here after you finish selecting a service & vehicle</T>
    </Box>
  )
}
