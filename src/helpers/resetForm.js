import { useEffect, useMemo, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { isEqual } from 'underscore'

export const useResetForm = ({ state, defaults, keepErrors }) => {
  const { reset } = useFormContext()


  useEffect(() => {
    reset({ ...(defaults || {}), ...(state || {}) }, { keepErrors: keepErrors })
  }, [state, defaults])

}
