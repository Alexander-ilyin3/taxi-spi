import { InputLabel } from '@mui/material'
import { styled } from "@mui/material/styles";

const Label = styled(InputLabel)(({ theme }) => {
  const { palette: { primary: { grey, white, blue }, secondary: { lightGrey, red } } } = theme
  const { typography: { h4 } } = theme

  return {
    ...h4,
    marginLeft: 18,
    overflow: 'visible',
    whiteSpace: 'pre-wrap',
    '&.Mui-disabled ': {
      backgroundColor: lightGrey
    },
    '&.error-Border': {
      border: `1px solid ${red}`
    }
  }
})

export { Label }
