import axios from 'axios'

export const fee = {
  getFee: (data) => {
    return (
      axios
        .post('order-summary', data, { baseURL: process.env.REACT_APP_BASE_URL, })
        .then(res => res?.data)
    )
  },
}
