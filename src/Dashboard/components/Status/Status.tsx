import React from 'react';
import moment from 'moment';
import { Chip, Paper, Typography } from '@material-ui/core';

import { getCardColor } from '../../getCardColor';
import { TravisStatus } from '../../../interface/TravisStatus';

interface StatusProps {
  status: TravisStatus;
}

const Status: React.FunctionComponent<StatusProps> = ({
  status,
}) => {
  if (!status.body) {
    return null;
  }

  const { build, description, language, branch } = status.body;

  const startedAt = moment(status.body.build.startedAt);
  const finishedAt = build.finishedAt ? moment(build.finishedAt) : null;
  const diff = finishedAt ? startedAt.diff(finishedAt, 'minutes') : null;

  const backgroundColor = getCardColor(status);

  return (
    <Paper style={{ padding: 10, backgroundColor }}>
      <Typography variant="h5">
        {status.name} <Chip label={status.body.branch} />
      </Typography>
      <ul>
        {status.body && (
          <>
            <li>{status.body.language}</li>
            <li>{status.body.build.previousState} -> {status.body.build.state}</li>
            <li>{status.body.build.commit}</li>
            <li>{status.body.build.author}</li>
            <li>{status.body.build.finishedAt}</li>
            <li>{diff} min</li>
          </>
        )}
      </ul>
    </Paper>
  );
};

export { Status };
