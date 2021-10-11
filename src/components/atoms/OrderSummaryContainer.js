import { Paper, Typography as T } from "@material-ui/core"

export const OrderSummaryContainer = ({ children }) => {
  console.log({ children })

  return (
    <Paper elevation={10} sx={{
      // margin: [10, 10],
      padding: 10,
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