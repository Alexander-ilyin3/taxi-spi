import { instance } from 'api/instance'

export const countryAndState = {
  getStates: (data) => {
    return (
      instance
        .get('country-states', { params: { ...data } })
        .then(res => res?.data)
        // .catch(err => err )
    )
  },

  getCountry: () => {
    return (
      instance
        .get('countries')
        .then(res => res?.data)
        // .catch(err => err )
    )
  },
}
