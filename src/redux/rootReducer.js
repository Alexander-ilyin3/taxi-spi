import { combineReducers } from 'redux'

export const testReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_STORE':
      return { ...state, ...payload }

    default:
      return { ...state }
  }
}

export const rootReducer = combineReducers(
  {
    testReducer
  }
)
