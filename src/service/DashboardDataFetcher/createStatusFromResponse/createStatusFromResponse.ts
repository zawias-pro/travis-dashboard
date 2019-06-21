const createStatusFromResponse = (response: any) => ({
  name: response.name,
  fullName: response.slug,
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
});

export { createStatusFromResponse };
