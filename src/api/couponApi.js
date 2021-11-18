import { instance } from 'api/instance'

export const coupon = {
  checkCoupon: (data) => {
    console.log('data from request API', data)
    // const userAgent = window.navigator.userAgent || "userAgent - undefined";
    return (
      instance
        .post('validate-coupon', { ...data })
        .then(res => res?.data)
      // .catch(err => err)
    )
  },
}
