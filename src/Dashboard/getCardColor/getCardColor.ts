import { ColorProperty } from 'csstype';

import { TravisStatus } from '../../interface/TravisStatus';

const COLOR_ERROR   = 'red';
const COLOR_NO_DATA = 'gray';
const COLOR_SUCCESS = 'green';
const COLOR_PENDING = 'orange';

const getCardColor = (status: TravisStatus): ColorProperty => {
  if (!status.body) {
    return COLOR_NO_DATA;
  }

  switch (status.body.build.state) {
    case 'passed':
      return COLOR_SUCCESS;
    case 'started':
      return COLOR_PENDING;
  }

  return COLOR_ERROR;
};

export { getCardColor };
