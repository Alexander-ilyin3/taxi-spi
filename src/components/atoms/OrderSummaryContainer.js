import { Paper, Typography as T } from "@mui/material"

export const OrderSummaryContainer = ({ children }) => {
  console.log({ children })

  return (
    <Paper elevation={10} sx={{
      // margin: [10, 10],
      padding: [2, 4, 6, 8],
      paddingTop: 7,
      width: '40%',
      height: 'fit-content',
      display: 'flex',
      flexDirection: "column",
      gap: [0, 4],
      borderRadius: 4,
    }}>
      <T variant='h1'>Order Summary</T>
      {children}
    </Paper>
  )
}
