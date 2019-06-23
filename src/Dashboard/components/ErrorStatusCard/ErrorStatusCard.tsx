import React from 'react';
import { Paper, Typography } from '@material-ui/core';

import { StatusCardProps } from '../../StatusCardProps';

const ErrorStatusCard: React.FunctionComponent<StatusCardProps> = ({
  status,
  styles,
}) => (
  <Paper style={styles}>
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

export { ErrorStatusCard };
