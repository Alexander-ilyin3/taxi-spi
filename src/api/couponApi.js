import { instance } from 'api/instance'

export const coupon = {
  checkCoupon: (data) => {
    return (
      instance
        .post('validate-coupon', { ...data })
        .then(res => res?.data)
      // .catch(err => err)
    )
  },
}
