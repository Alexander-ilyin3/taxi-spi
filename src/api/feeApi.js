import axios from 'axios'
import { apiHost } from './apiHost'

export const fee = {
  getFee: (data) => {
    return (
      axios
        .post('order-summary', data, { baseURL: apiHost, })
        .then(res => res?.data)
    )
  },
}
