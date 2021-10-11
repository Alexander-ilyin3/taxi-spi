const { Checkbox } = require("@material-ui/core")
const { useTheme } = require("@material-ui/system")


export const CheckBoxComponent = ({onChange, checked}) => {
  const theme = useTheme()
  const { palette: { primary: { grey, white, blue } } } = theme
  return (
    <Checkbox
      sx={{
        color: grey,
        '&.Mui-checked': {
          color: blue,
        },
      }}
      onChange={(e) => onChange(e.target.checked)}
      checked={checked || false}
    />
  )
}
