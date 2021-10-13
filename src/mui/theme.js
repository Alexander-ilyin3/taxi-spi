import { palette } from 'mui/themeColors'
import { typography } from 'mui/fonts'
import { createTheme } from '@mui/material'

 const theme = createTheme({
  palette,
  typography,
  overrides: {
    CssBaseline: {
      "@global": {
        body: { 
          backgroundColor: '##FBFBFD' // theme.palette.secondary.backgroundGrey //TODO change the color from theme
        }
      }
    }
  }
})


export { theme }