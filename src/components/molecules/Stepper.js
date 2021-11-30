import { Typography as T, useTheme, Box, Stepper, Step, StepLabel } from "@mui/material"
import { isEqual } from "underscore"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { StepIconComponent } from "components/atoms/StepIconComponent"
import { StepperConnector } from "components/atoms/StepperConnector"
import { setInitlalSteps, setStepsWithBooking, setStepsWithFlight } from "redux/actions"
import { getIsAirportStates, getIsCustomDestination, getSteps } from "redux/selectors"
import useMediaQuery from '@mui/material/useMediaQuery'
import { setCustomLocationStepsVariant } from "redux/actions"
import { useHistory } from "react-router"
import { useFormContext } from "react-hook-form"

const StepperComponent = () => {
  const theme = useTheme()
  const { watch } = useFormContext()
  const { breakpoints: { down } } = theme
  const unMemosteps = useSelector(getSteps)
  const isAirportStates = useSelector(getIsAirportStates, isEqual)

  // const reduxIsCustomDestination = useSelector(getIsCustomDestination)
  // const formIsCustomDestination = watch('isCustomDestination')

  // const isCustomDestination = formIsCustomDestination || reduxIsCustomDestination
  const isCustomDestination = useSelector(getIsCustomDestination)
  
  const steps = useMemo(() => unMemosteps)
  const dispatch = useDispatch()
  const stepperRef = useRef(null)
  const matches = useMediaQuery(down('sm'))

  const history = useHistory()
  const currentLocation = history.location.pathname

  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const regularStepsHistory = ['/step-1', '/step-2', '/step-3', '/step-4', '/step-5', '/step-6', '/step-7']
    const airBnbStepsHistory = ['/step-1', '/step-3', '/step-5']

    const usedArray = isCustomDestination ? airBnbStepsHistory : regularStepsHistory

    setActiveStep(usedArray.indexOf(currentLocation))

  }, [isCustomDestination, currentLocation])

  useEffect(() => {
    if (!steps.length) {
      dispatch(setInitlalSteps())
    }
    stepperRef.current.scrollIntoView()
  }, [])

  useEffect(() => {

    if (isCustomDestination) return dispatch(setCustomLocationStepsVariant())

    if (isAirportStates?.destinationIsAirport || isAirportStates?.locationIsAirport) {
      dispatch(setStepsWithFlight())
    } else {
      dispatch(setStepsWithBooking())
    }
  }, [isAirportStates, isCustomDestination])

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
