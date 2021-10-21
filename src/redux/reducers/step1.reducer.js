import { SET_STEP1_DATA } from "redux/constants/"

export const step1 = (state, { type, payload }) => {
  switch (type) {
    case SET_STEP1_DATA:
      return { ...state, ...payload }

    default:
      return { ...state }
  }
}
