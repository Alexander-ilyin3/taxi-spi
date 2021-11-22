import { palette } from 'mui/themeColors'
import { typography } from 'mui/fonts'
import { createTheme } from '@mui/material'

const theme = createTheme({
  palette,
  // typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 769,
      md: 1200,
      lg: 1350,
      xl: 1536,
    },
  },
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
          '&:hover': {
            '& fieldset': {
              // border: 'none'
            }
          },
          '&.Mui-focused': {
            border: `1px solid ${palette.primary.blue}`,
          },
          '&.Mui-disabled ': {
            backgroundColor: palette.secondary.lightGrey
          },
          '&.error-Border': {
            border: `1px solid ${palette.secondary.red}`
          },
          '&.Mui-error': {
            border: `1px solid ${palette.secondary.red}`
          },
          minHeight: 60,
          backgroundColor: palette.primary.white,
          display: 'flex',
          borderRadius: 10,
          paddingLeft: 8,
          fontFamily: 'Poppins',
          ...typography.fieldText,
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: '25px',
          height: '25px',
          borderRadius: '5px',
          border: `1px solid ${palette.primary.blue}`,
          color: palette.primary.blue,
          textTransform: 'none',
          '&:disabled': {
            border: `1px solid ${palette.primary.grey}`,
            color: palette.primary.grey,
          },
          '&:hover': {
            backgroundColor: palette.primary.blue,
          }
        },
      }
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: palette.primary.blue
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          '.MuiDrawer-paper': {
            // borderRadius: '10px 0 0 10px',
            // padding: '10px'
            // display: 'none'
            backgroundColor: '#ffffff00',
            boxShadow: 'none',
          }
        }
      }
    }
  },
})

const { breakpoints: { down } } = theme
// const themeReliedOnProps = {
// ...themeWithoudTypography,
// overrides: {
theme.typography = {
  ...theme.typography,
  fontFamily: 'Poppins',
  h1: {
    fontSize: 36,
    fontWeight: 500,
    color: palette.primary.black,
    [down('sm')]: {
      fontSize: 26
    }
  },
  h2: {
    fontSize: 30,
    fontWeight: 500,
    color: palette.primary.black,

  },
  h3: {
    fontSize: 20,
    fontWeight: 700,
    color: palette.primary.black,
    [down('sm')]: {
      fontSize: 14
    }
  },
  h4: {
    fontSize: 18,
    fontWeight: 700,
    color: palette.primary.black,
    [down('sm')]: {
      fontSize: 12
    }
  },
  h5sb: {
    fontSize: 18,
    fontWeight: 600,
    color: palette.primary.black,
    [down('sm')]: {
      fontSize: 12
    }
  },
  h5md: {
    fontSize: 18,
    fontWeight: 500,
    color: palette.primary.black,
    [down('sm')]: {
      fontSize: 16
    }
  },
  h5rg: {
    fontSize: 18,
    fontWeight: 400,
    color: palette.primary.black
  },
  fieldText: {
    fontSize: 16,
    fontWeight: 400,
    color: palette.primary.black
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: 400,
    color: palette.primary.black,
    [down('sm')]: {
      fontSize: 12
    }
  },
  labelErrorText: {
    color: palette.error.main,
    fontSize: 12,
    fontWeight: 400,
  },
  cardLabelText: {
    color: palette.primary.black,
    fontSize: 14,
    fontWeight: 600,
  },
  dateTimeSummaryText: {
    color: palette.primary.black,
    fontSize: 14,
    fontWeight: 600,
    [down('sm')]: {
      fontSize: 12
    }
  },
  cardDescription: {
    color: palette.primary.black,
    fontSize: 12,
    fontWeight: 400,
  },
  cardPrice: {
    color: palette.primary.black,
    fontSize: 14,
    fontWeight: 700,
  },
  apply: {
    fontSize: 18,
    fontWeight: 600,
    color: palette.primary.black,
    [down('sm')]: {
      fontSize: 16
    }
  },
}
// }
// }
// console.log('theme', themeReliedOnProps)

export { theme }