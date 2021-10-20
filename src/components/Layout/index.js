import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import { CssBaseline, ThemeProvider, Typography as T } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Step1 from 'pages/step1'
import Step2 from 'pages/step2'
import Step3 from 'pages/step3'
import Step4 from 'pages/step4'
import Step5 from 'pages/step5'

import { theme } from 'mui/theme.js'
import { rootReducer } from 'redux/rootReducer'

/* TEST COMPONENT //TODO */
import { ConsoleFormStateButton } from 'testData/ConsoleFormStateButton'
/* TEST COMPONENT //TODO */

const Layout = () => {
  const store = createStore(rootReducer)
  const methods = useForm()

  return (
    <Provider store={store}>
      <FormProvider {...methods} >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div>
              <Switch>
                <Route exact path='/'>
                  <Redirect to='/step-3' />
                </Route>
                <Route path="/step-1">
                  <Step1 />
                </Route>
                <Route path="/step-2">
                  <Step2 />
                </Route>
                <Route path="/step-3">
                  <Step3 />
                </Route>
                <Route path="/step-4">
                  <Step4 />
                </Route>
                <Route path="/step-5">
                  <Step5 />
                </Route>
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
        {/* TEST COMPONENT //TODO */}
        <ConsoleFormStateButton />
        {/* TEST COMPONENT //TODO */}
      </FormProvider>
    </Provider>
  )
}

export default (Layout)
