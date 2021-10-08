import { useTheme } from "@material-ui/core"
import { styled } from "@mui/material/styles"
import { Typography as T } from "@material-ui/core"

const StepIconComponentRoot = styled('div')(({ theme, ownerState }) => ({ //TODO check if this styles needed
  color: theme.palette.primary.blue,
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}))

const StepCheckMark = () => {
  return (
    <img src="/images/StepCheckmark.svg" alt="checkmark" />
  )
}

const IconVariant = ({ active, completed, icon }) => {
  const theme = useTheme()
  const { palette: { primary: { blue, grey } } } = theme

  const commonStyles = {
    backgroundColor: blue,
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  }

  if (active) {
    return (
      <div style={commonStyles} >
        {console.log(1)}
        <span style={{ color: theme.palette.primary.white, fontSize: '18px' }}>{icon}</span>
      </div>
    )
  }

  if (completed) {
    return (
      <div style={commonStyles}>
        {console.log(2)}
        <img src="/images/StepCheckmark.svg" alt="checkmark" />
      </div>
    )
  }

  return (
    <div style={{ ...commonStyles, backgroundColor: grey }} >
      {console.log(3)}
      <span style={{ color: theme.palette.secondary.darkGrey, fontSize: '18px' }}>{icon}</span>
    </div>
  )
}

export const StepIconComponent = (props) => {
  const { active, completed, className, icon } = props;


  console.log('step icon props', props)


  return (
    <StepIconComponentRoot ownerState={{ active }} className={className}>
      <IconVariant active={active} completed={completed} icon={icon}/>
    </StepIconComponentRoot>
  )
}