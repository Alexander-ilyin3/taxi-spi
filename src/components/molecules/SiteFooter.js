import { Box, useTheme } from "@material-ui/system"


export const SiteFooter = () => {
  const theme = useTheme()

  return (
    <Box sx={{
      width: '100%',
      height: 80,
      backgroundColor: theme.palette.primary.darkBlue,
    }} />
  )
}
