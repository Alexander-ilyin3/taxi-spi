import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { setFee, setTotalLoading } from 'redux/actions'
import { useApiCall, useThrottle } from '.'
import { fee } from 'api/feeApi'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedVehicleIdObject, getSelectedAddons } from 'redux/selectors/global.selectors'
import { getPassengers } from 'redux/selectors/step1.selectors'
import { useDeepEqualMemo } from './useDeepEqualMemo'


export const useFeeUpdate = () => {
  const { reFetch } = useApiCall({
    handler: fee.getFee,
    action: setFee,
    lazy: true
  })
  const dispatch = useDispatch()

  const calculateFee = useThrottle(
    (params) => reFetch({ params })
      ?.then(() => dispatch(setTotalLoading(false)))
      ?.catch(() => dispatch(setTotalLoading(false))),
    1000,
  )
  const { watch } = useFormContext()
  const formPassengers = watch('numberOfPassengers')
  const formVehicle = watch('selectedCar')
  const addon = watch('Addon')
  const passengersState = useSelector(getPassengers)
  const vehicleState = useSelector(getSelectedVehicleIdObject)
  const addonsState = useSelector(getSelectedAddons)

  const addons = useDeepEqualMemo(
    addon ? Object.values(addon).map(({ addon_id, count }) => ({ addon_id, count })).filter(({ count }) => count) : null
  )

  const vehicleToSend = useDeepEqualMemo(+formVehicle?.vehicleId || +vehicleState?.vehicle_id)
  const passengersToSend = useDeepEqualMemo(+formPassengers || +passengersState)
  const addonsToSend = useDeepEqualMemo(addons || addonsState)

  useEffect(() => {
    console.log({ passengersToSend, vehicleToSend, addonsToSend })
    dispatch(setTotalLoading(true))
    return calculateFee({
      ...(addonsToSend ? { addons: addonsToSend } : {}),
      ...(passengersToSend ? { passengers: passengersToSend } : {}),
      ...(vehicleToSend ? { vehicle_id: vehicleToSend } : {})
    })
  }, [passengersToSend, calculateFee, vehicleToSend, addonsToSend])
}