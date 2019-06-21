import { ColorProperty } from 'csstype';

import { TravisStatus } from '../../interface/TravisStatus';

const COLOR_ERROR   = 'rgba(255, 0,   0,   0.5)';
const COLOR_NO_DATA = 'rgba(206, 206, 206, 0.5)';
const COLOR_SUCCESS = 'rgba(0,   204, 35,  0.5)';
const COLOR_PENDING = 'rgba(170, 133, 18,  0.5)';

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
