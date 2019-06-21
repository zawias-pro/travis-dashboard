import React from 'react';
import { Chip, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
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

  const { build, branch } = status.body;
  const backgroundColor = getCardColor(status);
  const commitTitle = build.commit.split(/\n/)[0];

  return (
    <Paper className={classes.paper} style={{ backgroundColor }}>
      <Typography variant="h5">
        {status.name} <Chip label={branch} />
      </Typography>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td colSpan={2} style={{ width: '100%' }}>
              <MessageIcon className={classes.icon} /> {commitTitle}
            </td>
          </tr>
          <tr>
            <td>{build.previousState} -> {build.state}</td>
            <td><PersonIcon className={classes.icon} /> {build.author}</td>
          </tr>
          {build.finishedAt && (
            <tr>
              <td><CalendarIcon className={classes.icon} /> {build.finishedAt.format()}</td>
              <td><TimeIcon className={classes.icon} /> {build.durationMinutes} min</td>
            </tr>
          )}
        </tbody>
      </table>
    </Paper>
  );
};

export { StatusCard };
