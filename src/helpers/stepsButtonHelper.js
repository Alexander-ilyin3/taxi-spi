

export const stepHistoryHelper = {
  regularStepsHistory: ['/step-1', '/step-2', '/step-3', '/step-4', '/step-5', '/step-6', '/step-7'],
  airBnbStepsHistory: ['/step-1', '/step-3', '/step-5'],

  next: function (history, isCustomDestination) {
    const stepArray = isCustomDestination ? this.airBnbStepsHistory : this.regularStepsHistory
    const location = history.location.pathname
    const nextStepIndex = stepArray.indexOf(location) + 1
    
    if ( stepArray[nextStepIndex] ) {
      history.push(stepArray[nextStepIndex])
    }
  },
  prev: function (history, isCustomDestination) {
    const stepArray = isCustomDestination ? this.airBnbStepsHistory : this.regularStepsHistory
    const location = history.location.pathname
    const nextStepIndex = stepArray.indexOf(location) - 1
    
    if ( stepArray[nextStepIndex] ) {
      history.push(stepArray[nextStepIndex])
    }
  }
}
