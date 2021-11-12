import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setDestinationIsAirport, setLocationIsAirport } from "redux/actions"
import { getGlobalStepsData } from "redux/selectors"
import { isEqual } from "underscore"

export const useDependenceReduxStateController = () => { //TODO make hook with invoke in layout
  const dispatch = useDispatch()
  const globalStepsState = useSelector(getGlobalStepsData, isEqual)

  const reduceToBoolean = (value) => {

    if (value === '0' || value === '1') {
      return Boolean(parseFloat(value))
    }

    return false
  }

  const updateIsAirportStates = (state) => {

    if (reduceToBoolean(state?.destination?.is_airport)) {
      dispatch(setLocationIsAirport(true))
    } else {
      dispatch(setLocationIsAirport(false))
    }

    if (reduceToBoolean(state?.location?.is_airport)) {
      dispatch(setDestinationIsAirport(true))
    } else {
      dispatch(setDestinationIsAirport(false))
    }

  }

  useEffect(() => {
    updateIsAirportStates(globalStepsState)
  }, [globalStepsState])

  // return null
}