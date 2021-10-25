import axiosLib from 'axios'
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
