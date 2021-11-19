import { instance } from 'api/instance'

export const payments = {
  submitPaymentMethod: (data) => {
    return (
      instance
        .post('payments', { ...data })
        .then(res => res?.data)
    )
  },
}
