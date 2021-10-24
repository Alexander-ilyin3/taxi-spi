import { InputBase } from '@mui/material'
import { styled } from "@mui/material/styles";
import { useTheme } from '@mui/private-theming';

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

const Failed_Input = ({couponHeight}) => {
  const theme = useTheme()
  
  const { palette: { primary: { grey, white, blue }, secondary: { lightGrey, red } } } = theme
  const { typography: { fieldText } } = theme

  return (
    <InputBase
      sx={{
        width: '100%',
        height: couponHeight ? '54px' : '60px',
        backgroundColor: white,
        border: `1px solid ${grey}`,
        borderRadius: '10px',
        paddingLeft: '22px',
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
      }}
    >

    </InputBase>
  )
}

export { Input }
