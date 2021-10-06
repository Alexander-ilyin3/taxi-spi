import { Typography as T, useTheme } from '@material-ui/core'

const RequiredStar = () => {
  const theme = useTheme()
  console.log({theme})
  return (
    <T variant='h5md' sx={{ position: 'absolute', top: 0, left: '-11px', color: theme.palette.warning.main }}>
      {'*'}
    </T>
  )
}

export { RequiredStar }