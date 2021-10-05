import { Typography as Tg, useTheme } from '@material-ui/core'

const RequiredStar = () => {
  const theme = useTheme()
  return (
    <Tg variant='h5md' sx={{ position: 'absolute', top: 0, left: '-11px', color: theme.palette.warning.main }}>
      {'*'}
    </Tg>
  )
}

export { RequiredStar }