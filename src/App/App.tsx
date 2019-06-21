import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { Router } from '../Router';
import { TopBar } from '../components/TopBar';

const App: React.FC = () => (
  <>
    <CssBaseline />
    <TopBar />
    <Router />
  </>
);

export { App };
