import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

(function (console) {
  // var old_log = console.log
  if ( process.env.NODE_ENV !== 'development' ) {
    console.log = function() {}
    return
  }
  
  // console.log = function() {
  //     var d = new Date()
  //     old_log.apply(console, [d].concat(arguments))
  //     return d.getMilliseconds()
  // }
})(window.console)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
