
export const validateEmail = (emailValue) => {
  if (!(typeof emailValue === "string")) return false
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailValue)
}

export const confirmEmailValidate = (confirmEmail, primaryEmail) => {
  console.log(44444444, 'emails --', primaryEmail, confirmEmail)
  return confirmEmail === primaryEmail
}

export const validateSeveral = (v, functionsArray) => {
  return functionsArray.reduce((value, func) => {
    if (value === false) return false
    return func(v)
  }, true)
}

export const phoneValidate = (phoneValue) => {
  //YAGNI
}

export const replaceForPhoneNumber = (value) => {
  return value.replace(/(?!^\+)[^0-9]/g, '')
}

export const getErrorTextWithMultipleValidateFunc = (v, { func, errText }) => {

  if ( func && func(v) === false ) {
    return errText
  }

  return ''

}
