import { 
  SET_STEP1_DATA,
  SET_STEP2_DATA,
  SET_STEP3_DATA,
  SET_STEP4_DATA,
  SET_STEP5_DATA,
  SET_STEP6_DATA,
  SET_STEP7_DATA,
} from "redux/constants/"

export const step1 = (state, { type, payload }) => {
  switch (type) {
    case SET_STEP1_DATA:
      return { ...state, ...payload }

    default:
      return { ...state }
  }
}

export const step2 = (state, { type, payload }) => {
  switch (type) {
    case SET_STEP2_DATA:
      return { ...state, ...payload }

    default:
      return { ...state }
  }
}

export const step3 = (state, { type, payload }) => {
  switch (type) {
    case SET_STEP3_DATA:
      return { ...state, ...payload }

    default:
      return { ...state }
  }
}

export const step4 = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_STEP4_DATA:
      return { ...state, ...payload }

    default:
      return state
  }
}

export const step5 = (state, { type, payload }) => {
  switch (type) {
    case SET_STEP5_DATA:
      return { ...state, ...payload }

    default:
      return { ...state }
  }
}

export const step6 = (state, { type, payload }) => {
  switch (type) {
    case SET_STEP6_DATA:
      return { ...state, ...payload }

    default:
      return { ...state }
  }
}

export const step7 = (state, { type, payload }) => {
  switch (type) {
    case SET_STEP7_DATA:
      return { ...state, ...payload }

    default:
      return { ...state }
  }
}
