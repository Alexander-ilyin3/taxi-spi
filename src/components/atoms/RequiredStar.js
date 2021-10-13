import { Typography as T, useTheme } from '@mui/material'

const RequiredStar = ({styles}) => {
  const theme = useTheme()
  return (
    <T variant='h5md' sx={{ position: 'absolute', top: 0, left: '-11px', color: theme.palette.warning.main, ...styles }}>
      {'*'}
    </T>
  )
}

export { RequiredStar }
