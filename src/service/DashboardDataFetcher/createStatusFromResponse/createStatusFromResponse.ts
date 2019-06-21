import * as yup from 'yup';

import { TravisStatus } from '../../../interface/TravisStatus';

const getValidationError = (response: any): Error | null => {
  const schema = yup.object().shape({
    name: yup.string(),
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
        finished_at: yup.string(),
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
        startedAt: response.default_branch.last_build.started_at,
        finishedAt: response.default_branch.last_build.finished_at,
        author: response.default_branch.last_build.created_by.login,
      },
    },
  });
};

export { createStatusFromResponse };
