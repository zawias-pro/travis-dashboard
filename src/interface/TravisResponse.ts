export interface TravisResponse {
  name: string;
  error: Error | null;
  body?: {
    description: string;
    language: string;
    branch: string;
    build: {
      state: string;
      previousState: string;
      commit: string;
      startedAt: string;
      finishedAt: string;
      author: string;
    };
  };
}
