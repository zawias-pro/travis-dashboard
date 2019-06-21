import React from 'react';
import { Paper, Typography } from '@material-ui/core';

import { getCardColor } from '../../getCardColor';
import { TravisStatus } from '../../../interface/TravisStatus';

interface ErrorStatusProps {
  status: TravisStatus;
}

const ErrorStatus: React.FunctionComponent<ErrorStatusProps> = ({
  status,
}) => {
  const backgroundColor = getCardColor(status);

  return (
    <Paper style={{ padding: 10, backgroundColor }}>
      <Typography variant="h5">
        {status.name}
      </Typography>
      <div>
        <p>Error:</p>
        <pre>
          {status.error!.message}
        </pre>
      </div>
    </Paper>
  );
};

export { ErrorStatus };
