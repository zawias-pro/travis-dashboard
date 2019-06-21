export interface TravisStatus {
  name: string;
  error: Error | null;
  body?: {
    description: string | null;
    language: string | null;
    branch: string;
    build: {
      state: string;
      previousState: string;
      commit: string;
      startedAt: string;
      finishedAt: string | null;
      author: string;
    };
  };
}
