import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Button, Container, CssBaseline, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Form = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs" component="main">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Travis dashboard
        </Typography>
        <form className={classes.form}>
          <TextField label="Access token" fullWidth margin="normal" />
          <TextField label="Repositories" fullWidth margin="normal" multiline />
          <Button variant="contained" color="primary" fullWidth className={classes.submit}>Go to dashboard</Button>
        </form>
      </div>
    </Container>
  );
};

export { Form };
