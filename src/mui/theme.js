import { palette } from 'mui/themeColors'
import { typography } from 'mui/fonts'
import { createTheme } from '@mui/material'

const theme = createTheme({
  palette,
  typography,
  components: {
    CssBaseline: {
      "@global": {
        body: {
          backgroundColor: '#FBFBFD' // theme.palette.secondary.backgroundGrey //TODO change the color from theme
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
            border: `1px solid ${palette.primary.grey}`,
          '& fieldset': {
            border: 'none'
          },
          '&:hover' : {
            '& fieldset': {
              border: 'none'
            }
          },
          '&.Mui-focused': {
            border: `1px solid ${palette.primary.blue}`,
          },
          '&.Mui-disabled ': {
            backgroundColor: palette.secondary.lightGrey
          },
          '&.error-Border': {
            // border: `1px solid ${palette.secondary.red}`
          },
          height: 60,
          backgroundColor: palette.primary.white,
          display: 'flex',
          borderRadius: 10,
          paddingLeft: 22,
          fontFamily: 'Poppins',
          ...typography.fieldText,
        },
      }
    }
  },
})


export { theme }