

export const pickFirst = ([value1, value2]) => {
  if ( value1 !== undefined && value1 !== null ) {
    return value1
  }
  return value2
}
