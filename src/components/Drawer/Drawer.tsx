import React from 'react';
import { Drawer as DrawerComponent } from '@material-ui/core';

import { RouterButton } from '../RouterButton';

interface DrawerProps {
  isOpen: boolean;
  setDrawerOpen: (newValue: boolean) => void;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  setDrawerOpen,
}) => {
  return (
    <DrawerComponent
      open={isOpen}
      onClose={() => { setDrawerOpen(false); }}
    >
      <div style={{ width: 500 }}>
        <RouterButton
          to="/"
          color="primary"
          variant="contained"
          onClick={() => { setDrawerOpen(false); }}
        >
          Back
        </RouterButton>
      </div>
    </DrawerComponent>
  );
};

export { Drawer };
