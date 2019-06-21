import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { Router } from '../Router';
import { TopBar } from '../components/TopBar';
import { Drawer } from '../components/Drawer';

const App: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState();

  return (
    <Router>
      <CssBaseline/>
      <TopBar
        setDrawerOpen={setDrawerOpen}
      />
      <Drawer
        isOpen={isDrawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </Router>
  );
};

export { App };
