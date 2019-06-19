import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Form = () => <h2>Home</h2>;

const Dashboard = () => <h2>Dashboard</h2>;

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Form}/>
      <Route path="/dashboard" component={Dashboard}/>
    </Switch>
  </BrowserRouter>
);

export { Router };
