import React from 'react';
import { Chip, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import {
  Message as MessageIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Timer as TimeIcon,
} from '@material-ui/icons';

import { getCardColor } from '../../getCardColor';
import { TravisStatus } from '../../../interface/TravisStatus';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    table: {
      width: '100%',
      '& td': {
        padding: theme.spacing(1),
        paddingLeft: 0,
        width: '50%',
      },
    },
    icon: {
      fontSize: 16,
      marginBottom: -2,
    },
  }),
);

interface StatusProps {
  status: TravisStatus;
}

const StatusCard: React.FunctionComponent<StatusProps> = ({
  status,
}) => {
  const classes = useStyles();

  if (!status.body) {
    return null;
  }

  const {build, branch} = status.body;
  const backgroundColor = getCardColor(status);
  const commitTitle = build.commit.split(/\n/)[0];

  return (
    <Paper className={classes.paper} style={{backgroundColor}}>
      <div style={{display: 'flex', flexDirection: 'column', alignContent: 'spaceBetween', height: 150 }}>
        <Typography variant="h5">
          {status.name} <Chip label={branch}/>
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <MessageIcon className={classes.icon}/> {commitTitle}
          </Grid>
          <Grid item xs={12} sm={6}>
            {build.previousState} -> {build.state}
          </Grid>
          <Grid item xs={12} sm={6}>
            <PersonIcon className={classes.icon}/> {build.author}
          </Grid>
          {build.finishedAt && (
            <>
              <Grid item xs={12} sm={6}>
                <CalendarIcon className={classes.icon}/> {build.finishedAt.format()}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimeIcon className={classes.icon}/> {build.durationMinutes} min
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </Paper>
  );
};

export { StatusCard };
