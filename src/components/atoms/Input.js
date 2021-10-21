import { InputBase } from '@mui/material'
import { styled } from "@mui/material/styles";

const Input = styled(InputBase)(({ theme }) => {
  const { palette: { primary: { grey, white, blue }, secondary: { lightGrey, red } } } = theme
  const { typography: { fieldText } } = theme

  return {
    width: '100%',
    height: 60,
    backgroundColor: white,
    border: `1px solid ${grey}`,
    borderRadius: 10,
    paddingLeft: 22,
    // borderColor: grey,
    fontFamily: 'Poppins',
    ...fieldText,
    '&.Mui-focused': {
      border: `1px solid ${blue}`,
    },
    '&.Mui-disabled ': {
      backgroundColor: lightGrey
    },
    '&.Mui-error': {
      border: `1px solid ${red}`
    }
  }
})

export { Input }
