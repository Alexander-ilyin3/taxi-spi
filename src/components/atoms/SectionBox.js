import { Paper } from '@mui/material'

export const SectionBox = ({ children, addSx }) => {

  return (
    <Paper elevation={10} sx={{
      padding: [2, 4, 6, 8],
      paddingTop: 7,
      display: 'flex',
      flexDirection: "column",
      gap: [0, 4],
      borderRadius: 4,
      ...addSx,
    }}>
      {children}
    </Paper>
  )
}
