import { palette } from 'mui/themeColors'
import poppinsRegularFont from 'mui/fonts/Poppins/Poppins-Regular.ttf'

class Font {
  constructor(fname, fstyle, fweight, furl) {
    this.fname = fname
    this.fstyle = fstyle
    this.fweight = fweight
    this.furl = furl

    return {
      fontFamily: this.fname,
      fontStyle: this.fstyle,
      fontDisplay: 'swap',
      fontWeight: this.fweight,
      src: `
            local(${this.fname}),
            url(${this.furl}) format('ttf')
          `,
    }
  }
}

const poppinsRegular = new Font('Poppins', 'normal', 400, poppinsRegularFont)

export const typography = {
  fontFamily: 'Poppins',
  h1: {
    fontSize: 36,
    fontWeight: 500,
    color: palette.primary.black
  },
  h2: {
    fontSize: 30,
    fontWeight: 500,
    color: palette.primary.black
  },
  h3: {
    fontSize: 20,
    fontWeight: 800,
    color: palette.primary.black
  },
  h4: {
    fontSize: 18,
    fontWeight: 700,
    color: palette.primary.black
  },
  h5sb: {
    fontSize: 18,
    fontWeight: 600,
    color: palette.primary.black
  },
  h5md: {
    fontSize: 18,
    fontWeight: 500,
    color: palette.primary.black
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
    color: palette.primary.black
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
    fontFamily: 'Poppins'
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
  }
  // overrides: {
  //   MuiCssBaseline: {
  //     '@global': {
  //       // '@font-face': [poppinsRegular],  //TODO make the font connects from here insted of css file in "public"
  //     },
  //   },
  // },
}

