import { Moment } from 'moment';

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
      startedAt: Moment;
      finishedAt: Moment | null;
      author: string;
      durationMinutes: number | null;
    };
  };
}
