import { isEqual } from 'underscore'
import { useRef } from 'react'

export const useDeepEqualMemo = (value) => {
  const ref = useRef(undefined)
  if (!isEqual(ref.current, value)) {
    ref.current = value
  }

  return ref.current
}