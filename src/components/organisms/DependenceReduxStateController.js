import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setDestinationIsAirport, setLocationIsAirport } from "redux/actions"
import { setIsCustomDestination } from "redux/actions/global.actions"
import { getGlobalStepsData } from "redux/selectors"
import { isEqual } from "underscore"

export const useDependenceReduxStateController = (methods) => { //TODO make hook with invoke in layout
  const dispatch = useDispatch()
  const globalStepsState = useSelector(getGlobalStepsData, isEqual)
  const { watch } = methods
  const formIsCustomDestination = watch('isCustomDestination')


  const reduceToBoolean = (value) => {

    if (value === '0' || value === '1') {
      return Boolean(parseFloat(value))
    }

    return false
  }

  const updateIsAirportStates = (state) => {

    if (reduceToBoolean(state?.location?.is_airport)) {
      dispatch(setLocationIsAirport(true))
    } else {
      dispatch(setLocationIsAirport(false))
    }

    if (reduceToBoolean(state?.destination?.is_airport)) {
      dispatch(setDestinationIsAirport(true))
    } else {
      dispatch(setDestinationIsAirport(false))
    }

  }

  const setIsAirBnbStepsVariant = (state, formIsCustomDestination) => {
    if (typeof formIsCustomDestination === 'boolean') {
      if (formIsCustomDestination === true) {
        dispatch(setIsCustomDestination(true))
      } else {
        dispatch(setIsCustomDestination(false))
      }
      return
    }

    if (state?.custom_location) {
      dispatch(setIsCustomDestination(true))
      // dispatch(setCustomLocationStepsVariant())
    } else {
      dispatch(setIsCustomDestination(false))
    }
  }

  useEffect(() => {
    updateIsAirportStates(globalStepsState)
    setIsAirBnbStepsVariant(globalStepsState, formIsCustomDestination)
  }, [globalStepsState, formIsCustomDestination])

  // return null
}