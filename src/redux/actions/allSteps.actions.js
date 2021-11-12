import {
  SET_STEP1_DATA,
  SET_STEP2_DATA,
  SET_STEP3_DATA,
  SET_STEP4_DATA,
  SET_STEP5_DATA,
  SET_STEP6_DATA,
  SET_STEP7_DATA,
} from "redux/constants/";

export const setStep1Data = (step1Data) => ({
  type: SET_STEP1_DATA,
  payload: step1Data
})

export const setStep2Data = (step2Data) => ({
  type: SET_STEP2_DATA,
  payload: step2Data
})

export const setStep3Data = (step3Data) => ({
  type: SET_STEP3_DATA,
  payload: step3Data
})

export const setStep4Data = (step4Data) => ({
  type: SET_STEP4_DATA,
  payload: step4Data
})

export const setStep5Data = (step5Data) => ({
  type: SET_STEP5_DATA,
  payload: step5Data
})

export const setStep6Data = (step6Data) => ({
  type: SET_STEP6_DATA,
  payload: step6Data
})

export const setStep7Data = (step7Data) => ({
  type: SET_STEP7_DATA,
  payload: step7Data
})
