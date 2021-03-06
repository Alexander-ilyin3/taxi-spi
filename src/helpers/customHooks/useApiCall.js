import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export const useApiCall = ({ handler, params, action, lazy }) => {

  const dispatch = useDispatch()
  const [result, setResult] = useState()

  const request = ({ params }) => {
    const response = handler(params)
    return response.then((data) => {
      if (!data) return

      setResult(data)

      if (action) {
        if ( Array.isArray(action) ) {
          action.forEach(act => {
            dispatch(act(data))
          })
        } else {
          dispatch(action(data))
        }
      }
    })
  }

  useEffect(() => {
    if (!lazy) {
      request({ params })
    }
  }, [])

  const reFetch = ({ params }) => {
    return request({ params })
  }

  return { reFetch, result }
}
