import { useTheme } from '@mui/material'
import { ButtonBase } from '@mui/material'
import { Typography as T } from '@mui/material'
import { reduceIconPath } from 'helpers/reduceIconPath'

export const NextButton = ({ onClick }) => {
  const theme = useTheme()
  const { palette: { primary: { blue, white } } } = theme

  return (
    <ButtonBase sx={{
      background: blue,
      width: [130, 180, 260],
      height: [48, 54, 60],
      fontFamily: 'Poppins',
      borderRadius: '10px',
    }}
      onClick={onClick}>
      <T variant='h5sb' sx={{ color: white, marginRight: 1, fontSize: [16, 18] }}>Next</T>
      <img src={reduceIconPath("images/next-button-icon.svg")}></img>
    </ButtonBase>
  )
}

export const BackButton = ({ onClick, disableBackButton }) => {
  const theme = useTheme()
  const { palette: { primary: { blue, white } } } = theme

  return (
    <ButtonBase sx={{
      background: 'none',
      width: [130, 180, 260],
      height: [48, 54, 60],
      fontFamily: 'Poppins',
      borderRadius: '10px',
      border: `2px solid ${blue}`,
      opacity: `${disableBackButton ? '0' : '1'}`,
      cursor: `${disableBackButton ? 'default' : 'pointer'}`,
    }}
      onClick={onClick}
      disabled={disableBackButton}
    >

      <img src={reduceIconPath("images/back-button-icon.svg")}></img>
      <T variant='h5sb' sx={{ color: blue, marginLeft: 1, fontSize: [16, 18] }}>Back</T>
    </ButtonBase>
  )
}
