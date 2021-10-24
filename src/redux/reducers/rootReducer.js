import { combineReducers } from 'redux'
import {
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
} from 'redux/reducers/allSteps.reducer'

export const rootReducer = combineReducers(
  {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    step7,
  }
)
