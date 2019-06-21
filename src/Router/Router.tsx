import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Form } from '../Form';
import { Dashboard } from '../Dashboard';

interface RouterProps {
  children: React.ReactNode;
}

const Router: React.FC<RouterProps> = ({
  children,
}) => (
  <BrowserRouter>
    {children}
    <div style={{ marginTop: 30 }}>
      <Switch>
        <Route path="/" exact component={Form}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export { Router };
