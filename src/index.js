import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ThemeProvider } from '@mui/material/styles';
import { StylesProvider, jssPreset } from '@mui/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { create } from 'jss';
import { render } from 'react-dom';

import { theme } from './mui/theme'

(function (console) {
  if ( process.env.NODE_ENV !== 'development' ) {
    console.log = function() {}
    return
  }
  
})(window.console)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

class MyWebComponent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const emotionRoot = document.createElement('style');
    const jssRoot = document.createElement('style');
    emotionRoot.appendChild(jssRoot)
    const mountPoint = document.createElement('div');
    mountPoint.setAttribute('id', 'sjd-form-root')
    shadowRoot.appendChild(emotionRoot);
    shadowRoot.appendChild(mountPoint);

    const jss = create({
      ...jssPreset(),
      insertionPoint: jssRoot,
    });

    const cache = createCache({
      key: 'css',
      prepend: true,
      container: emotionRoot,
    });

    render(
      <StylesProvider jss={jss}>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </CacheProvider>
      </StylesProvider>,
      mountPoint
    );
  }
}
window.addEventListener('load', () => {
  if (!customElements.get('sjd-form')) {
    customElements.define('sjd-form', MyWebComponent);
  }
})
