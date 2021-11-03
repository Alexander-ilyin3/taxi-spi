import axiosLib from 'axios'
import { clearRequestsQueue, popRequestsQueue, pushRequestsQueue, setAxiosError } from 'redux/actions'
const axios = axiosLib.default

console.log('process env', process.env)

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
  auth: {
    username: 'sjd-taxi',
    password: 'quughaedu6eex0Qu'
  }
})

let applied = false

export const apiMiddleware = ({ dispatch }) => (next) => (action) => {
  if (applied) return next(action) 
  applied = true
  
  instance.interceptors.request.use((config) => {
    dispatch(pushRequestsQueue())
    // dispatch(setAxiosError(null))
    return config
  })

  instance.interceptors.response.use((response) => {
    dispatch(popRequestsQueue())
    return response
  }, (error) => {
    console.log('error server ---- ', error.message)
    // Do something with request error
    dispatch(clearRequestsQueue())
    dispatch(setAxiosError(error.message))
    // throw new Error('aaaaaaaaaaa '+ error.message)
    return
  })
  
  next(action)
}
