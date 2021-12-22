import Layout from 'components/Layout/index'
import { Provider } from 'react-redux'
import { store } from 'redux/reducers/rootReducer'
import { FormProvider, useForm } from 'react-hook-form'

function App() {
  const methods = useForm({ shouldFocusError: true })
  return (
    <Provider store={store}>
      <FormProvider {...methods} >
        <Layout />
      </FormProvider>
    </Provider>
  )
}

export default App
