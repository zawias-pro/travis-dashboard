import * as yup from 'yup';
import moment from 'moment';

import { TravisStatus } from '../../../interface/TravisStatus';

const getValidationError = (response: any): Error | null => {
  const schema = yup.object().shape({
    slug: yup.string(),
    description: yup.string().nullable(),
    language: yup.string().nullable(),
    default_branch: yup.object().shape({
      name: yup.string(),
      last_build: yup.object().shape({
        state: yup.string(),
        previous_state: yup.string(),
        message: yup.string(),
        started_at: yup.string(),
        finished_at: yup.string().nullable(),
        created_by: yup.object().shape({
          login: yup.string(),
        }),
      }),
    }),
  });

  try {
    schema.validateSync(response);

    return null;
  } catch (e) {
    return e;
  }
};

const createStatusFromResponse = (response: any): TravisStatus => {
  const validationError = getValidationError(response);

  if (validationError !== null) {
    throw validationError;
  }

  const startedAt = moment(response.default_branch.last_build.started_at);
  const finishedAt = response.default_branch.last_build.finishedAt
    ? moment(response.default_branch.last_build.finishedAt)
    : null;
  const durationMinutes = finishedAt
    ? finishedAt.diff(startedAt, 'minutes')
    : null;

  return ({
    error: null,
    name: response.slug,
    body: {
      description: response.description,
      language: response.github_language,
      branch: response.default_branch.name,
      build: {
        state: response.default_branch.last_build.state,
        previousState: response.default_branch.last_build.previous_state,
        commit: response.default_branch.last_build.commit.message,
        startedAt,
        finishedAt,
        author: response.default_branch.last_build.created_by.login,
        durationMinutes,
      },
    },
  });
};

export { createStatusFromResponse };
