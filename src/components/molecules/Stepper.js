import { Typography as T, useTheme, Box, Stepper, Step, StepLabel } from "@mui/material"
import { isEqual } from "underscore"
import React, { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { StepIconComponent } from "components/atoms/StepIconComponent"
import { StepperConnector } from "components/atoms/StepperConnector"
import { setInitlalSteps, setStepsWithBooking, setStepsWithFlight } from "redux/actions"
import { getIsAirportStates, getSteps } from "redux/selectors"
import useMediaQuery from '@mui/material/useMediaQuery'

const StepperComponent = ({ activeStep }) => {
  const theme = useTheme()
  const { breakpoints: { down } } = theme
  const unMemosteps = useSelector(getSteps)
  const isAirportStates = useSelector(getIsAirportStates, isEqual)
  const steps = useMemo(() => unMemosteps)
  const dispatch = useDispatch()
  const stepperRef = useRef(null)
  const matches = useMediaQuery(down('sm'))

  useEffect(() => {
    if (!steps.length) {
      dispatch(setInitlalSteps())
    }
    stepperRef.current.scrollIntoView()
  }, [])

  useEffect(() => {
    if (isAirportStates?.destinationIsAirport || isAirportStates?.locationIsAirport) {
      dispatch(setStepsWithFlight())
    } else {
      dispatch(setStepsWithBooking())
    }
  }, [isAirportStates])

  return (
    <Box sx={{
      paddingTop: 5,
      paddingBottom: 3,
      borderTop: `1px solid ${theme.palette.primary.grey}`,
      borderBottom: `1px solid ${theme.palette.primary.grey}`
    }}
      ref={stepperRef}
    >

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<StepperConnector />}
      >
        {steps.map((label, i) => (
          <Step key={label} >
            <StepLabel StepIconComponent={StepIconComponent}
              optional={
                activeStep >= i ? (
                  <T
                    variant="h5sb"
                    sx={{
                      color: theme.palette.primary.blue,
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'center',
                      paddingTop: ['10px','26px'],
                      ...(matches && { fontSize: '11px' })
                    }}
                  >
                    {activeStep === i || !matches ? label : ''}
                  </T>
                ) : (
                  <T
                    variant="h5rg"
                    sx={{
                      color: theme.palette.secondary.grey,
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'center',
                      paddingTop: ['10px','26px'],
                      // ...(!matches && {fontSize: '11px'})
                    }}
                  >
                    {!matches ? label : ''}
                  </T>
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

export default React.memo(StepperComponent)
