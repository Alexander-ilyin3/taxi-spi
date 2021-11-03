import Layout from 'components/Layout/index'
import { Provider } from 'react-redux'
import { store } from 'redux/reducers/rootReducer'

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  )
}

export default App
