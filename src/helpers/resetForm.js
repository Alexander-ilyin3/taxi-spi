import { useEffect, useMemo, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { isEqual } from 'underscore'

export const useResetForm = ({ state, defaults, keepDirty }) => {
  const { reset } = useFormContext()

  // // function deepCompareEquals(a, b) {
  // //   return isEqual(a, b)
  // // }

  // function useDeepCompareMemoize(value) {
  //   const ref = useRef()

  //   if (!isEqual(value, ref.current)) {
  //     ref.current = value
  //   }

  //   return ref.current
  // }

  // useEffect(() => {
  //   console.log('reseting with data', data)
  //   reset(data)
  // }, [data].map(useDeepCompareMemoize))

  // const { reset } = useFormContext()

  // useEffect(() => {
  //   if (data && JSON.stringify(data) !== '{}' && JSON.stringify(data) !== '[]') {
  //     console.log('--- redux form reseting ---', data)
  //     reset(data)
  //   }
  // }, [data])

  useEffect(() => {
    // if (state && JSON.stringify(state) !== '{}' && JSON.stringify(state) !== '[]') {
    //   console.log('--- redux form reseting ---', data)
    //   reset(data)
    // }
    console.log(' ------------ refreshing form --------', state)
    reset({ ...(defaults || {}), ...(state || {}) }, { keepDirty: keepDirty })
  }, [state, defaults])

  // useEffect(() => {
  //   reset({ ...state }, { keepDefaultValues: true })
  // }, [state])


  // if (data && JSON.stringify(data) !== '{}' && JSON.stringify(data) !== '[]') {
  //   console.log('--- redux form reseting ---', data)
  //   reset({data})
  // } else {
  //   reset({})
  // }
  // } else if (!formWasReseted) {
  //   console.log('--- initial form reset ---')
  //   setReseted(true)
  //   reset({})
  // }

}
