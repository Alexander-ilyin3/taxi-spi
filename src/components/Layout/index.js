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

import Step1 from 'pages/step1'
import Step2 from 'pages/step2'
import { theme } from 'mui/theme.js'

/* TEST COMPONENT //TODO */
import { ConsoleFormStateButton } from 'testData/ConsoleFormStateButton'
/* TEST COMPONENT //TODO */

const Layout = () => {

  const methods = useForm()
  return (
    <FormProvider {...methods} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div>
            <Switch>
              <Route exact path='/'>
                <Redirect to='/step-1' />
              </Route>
              <Route path="/step-1">
                <Step1 />
              </Route>
              <Route path="/step-2">
                <Step2 />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
      {/* TEST COMPONENT //TODO */}
      <ConsoleFormStateButton />
      {/* TEST COMPONENT //TODO */}
    </FormProvider>
  )
}

export default (Layout)
