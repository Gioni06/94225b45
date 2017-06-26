import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from './components/home.component';

export default (
  <Route path="/">
    <IndexRoute component={Main} />
  </Route>
);
