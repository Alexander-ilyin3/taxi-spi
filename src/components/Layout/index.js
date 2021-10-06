import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import { CssBaseline, ThemeProvider, Typography as T } from '@material-ui/core'

import Step1 from 'pages/step1'
import Step2 from 'pages/step2'
import { theme } from 'mui/theme.js'

const Layout = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/step-1"><Tg variant='h1'>step-1</Tg>-add txt</Link>
              </li>
              <li>
                <Link to="/step-2" className="root">step-2</Link>
              </li>
            </ul>
          </nav> */}

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
  )
}

export default (Layout)
