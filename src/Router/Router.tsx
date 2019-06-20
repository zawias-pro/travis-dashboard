import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Form } from '../Form';
import { Dashboard } from '../Dashboard';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Form}/>
      <Route path="/dashboard" component={Dashboard}/>
    </Switch>
  </BrowserRouter>
);

export { Router };
