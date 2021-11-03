export const getSteps = state => state.pageSteps.steps || []
export const getAxiosError = state => state.axiosError.text || null
export const getIsLoading = state => (state.isLoading || []).length > 0
