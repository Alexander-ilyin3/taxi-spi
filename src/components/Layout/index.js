import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import Step1 from 'pages/step1'
import Step2 from 'pages/step2'

const Layout = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/step-1">step-1</Link>
            </li>
            <li>
              <Link to="/step-2">step-2</Link>
            </li>
          </ul>
        </nav>

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
          {/* <Route path="/">
          
          </Route> */}
        </Switch>
      </div>
    </Router>
  )
}

export default Layout