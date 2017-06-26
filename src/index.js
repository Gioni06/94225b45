import './polyfills';
import React from 'react';
import { render } from 'react-dom';
import App from './components/home.component';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store/store';
import { Provider } from 'react-redux';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


(() => {
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
    render(
      <Provider store={store}>
        <App />
      </Provider>  
    , document.getElementById('app'));
  } else {
    render(
    <Provider store={store}>
        <App />
      </Provider>
    , document.getElementById('app'));
  }
})()

