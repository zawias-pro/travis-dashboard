import * as yup from 'yup';
import { TravisResponse } from '../../../interface/TravisResponse';
import { ResponseSchemaError } from '../../../error/ResponseSchemaError';

const isValid = (response: any) => {
  const schema = yup.object().shape({
    name: yup.string(),
    slug: yup.string(),
    description: yup.string(),
    language: yup.string(),
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

  return schema.isValidSync(response);
};

const createStatusFromResponse = (response: any): TravisResponse => {
  if (!isValid(response)) {
    throw new ResponseSchemaError();
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
