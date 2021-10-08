import { useTheme } from '@material-ui/core'
import { ButtonBase } from '@mui/material'
import { Typography as T } from '@material-ui/core'

export const NextButton = () => {
  const theme = useTheme()
  const { palette: { primary: { blue, white } } } = theme

  return (
    <ButtonBase sx={{
      background: blue,
      width: '260px',
      height: 60,
      fontFamily: 'Poppins',
      borderRadius: '10px',
      // width: '100%',
    }}>
      <T variant='h5sb' sx={{color: white, marginRight: 1}}>Next</T>
      <img src="images/next-button-icon.svg"></img>
    </ButtonBase>
  )
}

export const BackButton = () => {
  const theme = useTheme()
  const { palette: { primary: { blue, white } } } = theme

  return (
    <ButtonBase sx={{
      background: 'none',
      width: '260px',
      height: 60,
      fontFamily: 'Poppins',
      borderRadius: '10px',
      border: `2px solid ${blue}`,
      // width: '100%',
    }}>
      <img src="images/back-button-icon.svg"></img>
      <T variant='h5sb' sx={{color: blue, marginLeft: 1}}>Back</T>
    </ButtonBase>
  )
}
