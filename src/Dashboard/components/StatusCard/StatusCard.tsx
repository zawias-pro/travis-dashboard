import React from 'react';
import { Chip, Paper, Typography } from '@material-ui/core';

import { getCardColor } from '../../getCardColor';
import { TravisStatus } from '../../../interface/TravisStatus';

interface StatusProps {
  status: TravisStatus;
}

const StatusCard: React.FunctionComponent<StatusProps> = ({
  status,
}) => {
  if (!status.body) {
    return null;
  }

  const { build, language, branch } = status.body;

  const backgroundColor = getCardColor(status);

  return (
    <Paper style={{ padding: 10, backgroundColor }}>
      <Typography variant="h5">
        {status.name} <Chip label={branch} />
      </Typography>
      <ul>
        <li>{language}</li>
        <li>{build.previousState} -> {build.state}</li>
        <li>{build.commit}</li>
        <li>{build.author}</li>
        <li>{build.finishedAt}</li>
        <li>{build.durationMinutes} min</li>
      </ul>
    </Paper>
  );
};

export { StatusCard };
