import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface TopBarProps {
  setDrawerOpen: (newValue: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({
  setDrawerOpen,
}) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={() => { setDrawerOpen(true); }}
        >
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Travieso
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export { TopBar };
