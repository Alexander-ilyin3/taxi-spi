import { useTheme } from "@material-ui/core"
import { Box } from "@material-ui/system"
import { Stepper, Step, StepLabel } from "@mui/material"
import { StepIconComponent } from "components/atoms/StepIconComponent"
import { StepperConnector } from "components/atoms/StepperConnector"
import { Typography as T } from "@material-ui/core"
import { useState } from 'react'

const StepperComponent = () => {
  const steps = ['Service Selection', 'Vehicle Selection', 'Flight Details', 'Select Add-Ons', 'Contact Information', 'Billing Information']
  const [activeStep, setActiveStep] = useState(1)
  const theme = useTheme()

  return (
    <Box sx={{
      paddingTop: 5,
      paddingBottom: 3,
      borderTop: `1px solid ${theme.palette.primary.grey}`,
      borderBottom: `1px solid ${theme.palette.primary.grey}`
    }}>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<StepperConnector />}
      >
        {steps.map((label,i) => (
          <Step key={label} >
            <StepLabel StepIconComponent={StepIconComponent}
              optional={
                activeStep >= i ? (
                  <T variant ="h5sb" style={{color: theme.palette.primary.blue, display: 'flex', justifyContent: 'center', paddingTop: '10px'}}>{label}</T>
                ) : (
                  <T variant ="h5rg" style={{color: theme.palette.secondary.grey, display: 'flex', justifyContent: 'center', paddingTop: '10px'}}>{label}</T>
                )
              }
            >
            </StepLabel>
          </Step>
        ))}
    </Stepper>
    </Box >
  )
}

export { StepperComponent }
