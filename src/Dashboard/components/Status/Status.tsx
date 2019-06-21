import React from 'react';
import moment from 'moment';

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

  return (
    <div style={{ border: '1px solid #ccc' }}>
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
          JSON.stringify(status.error)
        )}
      </ul>
    </div>
  );
};

export { Status };
