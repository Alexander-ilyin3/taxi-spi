import { Paper } from '@mui/material'

export const SectionBox = ({ children }) => {
  console.log({ children })

  return (
    <Paper elevation={10} sx={{
      margin: [10, 10],
      padding: 10,
      paddingTop: 7,
      width: '55%',
      display: 'flex',
      flexDirection: "column",
      gap: [0, 4],
      borderRadius: 4
    }}>
      {children}
    </Paper>
  )
}
