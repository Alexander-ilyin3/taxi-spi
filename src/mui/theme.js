import { createMuiTheme } from '@material-ui/core/styles'

import { palette } from 'mui/themeColors'
import { typography } from 'mui/fonts'
import { createTheme } from '@mui/material'

 const theme = createTheme({
  palette,
  typography,
})

// theme.overrides = {
//   MuiTextField: {
//     root: {
//       color: "red",
//       border: "1px solid red",
//       margin: 10
//     }
//   }
// }

export { theme }