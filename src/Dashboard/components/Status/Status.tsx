import React from 'react';
import moment from 'moment';
import { Paper, Typography } from '@material-ui/core';

import { TravisStatus } from '../../../interface/TravisStatus';

interface StatusProps {
  status: TravisStatus;
}

const Status: React.FunctionComponent<StatusProps> = ({
  status,
}) => {
  const startedAt = status.body ? moment(status.body.build.finishedAt) : null;
  const finishedAt = status.body ? moment(status.body.build.startedAt) : null;
  const diff = startedAt && finishedAt ? startedAt.diff(finishedAt, 'minutes') : null;

  const backgroundColor = status.body ? (
    status.body.build.state === 'passed' ? 'green' : 'red'
  ) : 'gray';

  return (
    <Paper style={{ padding: 10, backgroundColor }}>
      <Typography variant="h5">
        {status.name}
      </Typography>
      <ul>
        <li>{status.name}</li>
        {status.body && (
          <>
            <li>{status.body.branch}</li>
            <li>{status.body.language}</li>
            <li>{status.body.build.previousState} -> {status.body.build.state}</li>
            <li>{status.body.build.commit}</li>
            <li>{status.body.build.author}</li>
            <li>{status.body.build.finishedAt}</li>
            <li>{diff} min</li>
          </>
        )}
        {status.error && (
          JSON.stringify(status.error.message)
        )}
      </ul>
    </Paper>
  );
};

export { Status };
