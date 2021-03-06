import { Box } from "@mui/material"

export const SectionWrapper = ({ children, fullWidth }) => {

  return (
    <Box
      sx={{
        // width: 'auto',
        // padding: 10,
        // paddingLeft: '80px',
        // paddingTop: 7,
        // width: '55%',
        display: 'flex',
        flexDirection: "column",
        gap: 8,
        borderRadius: 4,
        flexBasis: ['100%', '70%'],
        // width: fullWidth ? 'none' : '55%',
        // minWidth: fullWidth ? '80%' : 'none',
        margin: fullWidth ? '0 auto' : 0
      }}
      // width={'100%'}
      // width={['100%', fullWidth ? 'none' : '55%']}
      // width={['100%', '100%', 'auto']}
    >
      {children}
    </Box >
  )
}
