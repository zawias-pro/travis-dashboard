import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Drawer as DrawerComponent } from '@material-ui/core';

import { RouterButton } from '../RouterButton';
import { ArrowBack } from "@material-ui/icons";

interface DrawerProps extends RouteComponentProps<any> {
  isOpen: boolean;
  setDrawerOpen: (newValue: boolean) => void;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  setDrawerOpen,
  location,
}) => {
  return (
    <DrawerComponent
      open={isOpen}
      onClose={() => {
        setDrawerOpen(false);
      }}
    >
      <div style={{width: '30vw', padding: 10}}>
        <RouterButton
          to="/"
          color="primary"
          variant="contained"
          onClick={() => {
            setDrawerOpen(false);
          }}
          disabled={location.pathname === '/'}
        >
          <ArrowBack/>
          Back
        </RouterButton>
      </div>
    </DrawerComponent>
  );
};

export { Drawer };
