import {
  SET_STEPS,
  SET_AXIOS_ERROR,
  CLEAR_REQUESTS_QUEUE,
  POP_REQUESTS_QUEUE,
  PUSH_REQUESTS_QUEUE,
} from "redux/constants"

export const pageSteps = (state, { type, payload }) => {
  switch (type) {
    case SET_STEPS:
      return { ...state, steps: payload }

    default:
      return { ...state }
  }
}

export const axiosError = (state, { type, payload }) => {
  switch (type) {
    case SET_AXIOS_ERROR:
      console.log('SET AXIOS ERROR ', 7777777777777777)
      return { ...state, text: payload }

    default:
      return { ...state }
  }
}

export const isLoading = (state = [], { type }) => {
  switch (type) {
    case CLEAR_REQUESTS_QUEUE:
      return []
    case POP_REQUESTS_QUEUE:
      const newState = [...state]
      newState.pop()
      return newState
    case PUSH_REQUESTS_QUEUE:
      return [...state, true]

    default:
      return []
  }
}
